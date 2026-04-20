// === BurgerCHAOS - JS corregido para mejor usabilidad (sin cambiar diseño) ===

// MENÚ DATA
const menuItems = [
  { name: "Hamburguesa", price: "$1.99", emoji: "🍔", description: "Nuestra receta insignia. 200g de carne de res premium a la parrilla, doble queso cheddar fundido, tocino ahumado crujiente y nuestra salsa secreta 'Chaos' en pan brioche artesanal" },
  { name: "Papas", price: "$1.50", emoji: "🍟", description: "Papas rústicas cortadas a mano, sazonadas con una mezcla de especias de la casa. Servidas con un dip de queso fundido y cebollín." },
  { name: "Refresco", price: "$0.75", emoji: "🥤", description: "Bebida refrescante de la casa. Elige entre nuestros sabores de temporada: Frutos rojos, Limonada de coco o Té frío de la casa" },
  { name: "Nuggets", price: "$4.04", emoji: "🐔", description: "6 piezas de pechuga de pollo marinadas y empanizadas con panko, acompañadas de salsa de miel y mostaza." },
  { name: "Pizza", price: "$2.50", emoji: "🍕", description: "Masa artesanal de maduración lenta, salsa de tomate de la casa, abundante queso mozzarella y rodajas de peperoni premium. Horneada a la perfección para un borde crujiente." },
  { name: "Ensalada", price: "$3.50", emoji: "🥗", description: "Mix de verdes frescos, tomates cherry, aguacate, maíz dulce y pollo a la plancha. Todo bañado en una vinagreta ligera de cítricos." },
];

const grid = document.getElementById("menuGrid");
const cart = []; // carrito en memoria

function formatPrice(priceStr) {
  return parseFloat(String(priceStr).replace(/[^0-9.]/g, '')) || 0;
}

function updateCartCount() {
  const cartBtn = document.querySelector('#chaosNav .nav-items button[title="Carrito"]');
  if (!cartBtn) return;
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  let cntSpan = cartBtn.querySelector('.cart-count');
  if (!cntSpan) {
    cntSpan = document.createElement('span');
    cntSpan.className = 'cart-count';
    cntSpan.style.marginLeft = '6px';
    cntSpan.style.fontWeight = '700';
    cntSpan.style.color = 'var(--neon-yellow)';
    cartBtn.appendChild(cntSpan);
  }
  cntSpan.textContent = totalItems > 0 ? `(${totalItems})` : '(0)';
}

function renderCartPanel(show = true) {
  let panel = document.getElementById('cartPanel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'cartPanel';
    Object.assign(panel.style, {
      position: 'fixed', right: '16px', top: '64px', width: '340px', maxHeight: '60vh', overflowY: 'auto', zIndex: 10000,
      background: 'var(--card)', color: 'var(--foreground)', border: '2px solid var(--neon-green)', padding: '12px', borderRadius: '8px'
    });
    document.body.appendChild(panel);
  }
  panel.innerHTML = '';
  const header = document.createElement('div');
  header.style.display = 'flex'; header.style.justifyContent = 'space-between'; header.style.alignItems = 'center'; header.style.marginBottom = '12px';
  const title = document.createElement('h3'); title.textContent = 'Tu Pedido'; title.style.margin = '0'; 
  const closeBtn = document.createElement('button'); closeBtn.textContent = '✕';
  Object.assign(closeBtn.style, { background: 'none', border: 'none', color: 'var(--neon-pink)', fontSize: '20px', cursor: 'pointer', padding: '0 5px' });
  closeBtn.onclick = () => panel.style.display = 'none';
  header.appendChild(title); header.appendChild(closeBtn);
  panel.appendChild(header);
  if (cart.length === 0) {
    const p = document.createElement('div'); p.textContent = 'Carrito vacío'; panel.appendChild(p);
  } else {
    const list = document.createElement('div');
    cart.forEach((it, idx) => {
      const row = document.createElement('div');
      row.style.display = 'flex'; row.style.justifyContent = 'space-between'; row.style.alignItems = 'center'; row.style.marginBottom = '8px';
      const left = document.createElement('div');
      left.innerHTML = `<strong>${it.name}</strong><br><small>${it.qty} × ${it.price}</small>`;
      const right = document.createElement('div');
      right.style.textAlign = 'right';
      const remove = document.createElement('button');
      remove.textContent = 'Eliminar';
      remove.dataset.idx = idx;
      Object.assign(remove.style, {background: 'var(--neon-pink)', border: 'none', color: 'var(--bg)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer'});
      remove.addEventListener('click', (e) => { cart.splice(parseInt(e.target.dataset.idx), 1); renderCartPanel(); updateCartCount(); });
      right.appendChild(remove);
      row.appendChild(left); row.appendChild(right);
      list.appendChild(row);
    });
    panel.appendChild(list);
    const total = cart.reduce((s, i) => s + formatPrice(i.price) * i.qty, 0);
    const totalDiv = document.createElement('div'); totalDiv.style.marginTop = '8px'; totalDiv.innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;
    panel.appendChild(totalDiv);
    const btnWrap = document.createElement('div'); btnWrap.style.display = 'flex'; btnWrap.style.gap = '8px'; btnWrap.style.marginTop = '12px';
    const clearBtn = document.createElement('button'); clearBtn.textContent = 'Vaciar carrito';
    const payBtn = document.createElement('button'); payBtn.textContent = 'Ir a pagar';
    [clearBtn, payBtn].forEach(b => { b.style.flex = '1'; b.style.padding = '8px'; b.style.cursor = 'pointer'; });
    btnWrap.appendChild(clearBtn); btnWrap.appendChild(payBtn);
    panel.appendChild(btnWrap);
    clearBtn.addEventListener('click', () => { cart.length = 0; renderCartPanel(); updateCartCount(); });
    payBtn.addEventListener('click', () => { document.getElementById('badForm').scrollIntoView({behavior: 'smooth'}); panel.style.display = 'none'; });
  }
  panel.style.display = show ? 'block' : 'none';
}

function addToCart(item, qty) {
  const existing = cart.find(i => i.name === item.name && i.price === item.price);
  if (existing) existing.qty += qty; else cart.push({ name: item.name, price: item.price, qty });
  updateCartCount();
  // Safe to Use: Refrescar el panel si está abierto para dar feedback inmediato
  const panel = document.getElementById('cartPanel');
  if (panel && panel.style.display === 'block') renderCartPanel(true);
}

function renderAddFeedback(btn) {
  const originalText = btn.innerHTML;
  btn.innerHTML = '¡AÑADIDO! ✅';
  btn.classList.add('added-state');
  btn.style.pointerEvents = 'none';
  setTimeout(() => { btn.innerHTML = originalText; btn.classList.remove('added-state'); btn.style.pointerEvents = 'auto'; }, 1500);
}

// Renderizar menú (sin cambios de diseño)
menuItems.forEach((item, idx) => {
  const div = document.createElement('div');
  div.className = 'menu-item'; // Eliminado 'vertical' para mantener consistencia visual
  div.innerHTML = `
    <span class="emoji">${item.emoji}</span>
    <h3>${item.name}</h3>

    <div class="extra-info">
      <p class="desc">${item.description}</p>
    </div>

    <span class="price">${item.price}</span>

    <div class="quantity-selector">
      <button type="button" class="btn-minus" data-idx="${idx}">-</button>
      <input type="number" class="input" id="qty-input-${idx}" value="1" min="1" max="10" readonly>
      <button type="button" class="btn-plus" data-idx="${idx}">+</button>
    </div>
    <button class="order-btn-menu" data-idx="${idx}">🛒 AGREGAR AL CARRITO</button>
  `;
  grid.appendChild(div);

  const btn = div.querySelector('.order-btn-menu');
  btn.addEventListener('click', () => {
    const input = document.getElementById(`qty-input-${idx}`);
    const qty = Math.max(1, Math.min(10, parseInt(input.value) || 1));
    addToCart(item, qty);
    renderAddFeedback(btn);
  });
});

// Manejo robusto de los selectores de cantidad
grid.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-plus') || e.target.closest('.btn-minus');
  if (!btn) return;
  
  const idx = parseInt(btn.getAttribute('data-idx'));
  const input = document.getElementById(`qty-input-${idx}`);
  if (!input) return;
  
  let value = parseInt(input.value) || 1;
  if (btn.classList.contains('btn-plus')) {
    if (value < 10) input.value = value + 1;
  } else if (btn.classList.contains('btn-minus')) {
    if (value > 1) input.value = value - 1;
  }
});

// Nav: añadir handlers para desplazar/mostrar secciones
const navButtons = document.querySelectorAll('#chaosNav .nav-items button');
navButtons.forEach((b) => {
  const title = b.getAttribute('title') || b.textContent || '';
  if (title.includes('Menú')) {
    b.addEventListener('click', () => document.getElementById('menu-section').scrollIntoView({behavior: 'smooth'}));
  } else if (title.includes('Carrito')) {
    b.addEventListener('click', () => {
      renderCartPanel(true); // Siempre refrescar y mostrar al hacer click
    });
  } else if (title.includes('Pagar')) {
    b.addEventListener('click', () => document.getElementById('badForm').scrollIntoView({behavior: 'smooth'}));
  } else if (title.includes('Ofertas')) {
    b.addEventListener('click', () => document.querySelector('.marquee-bar').scrollIntoView({behavior: 'smooth'}));
  } else if (title.includes('Ayuda')) {
    b.addEventListener('click', () => document.querySelector('footer').scrollIntoView({behavior: 'smooth'}));
  }
});

// Popup removido por usabilidad

// Form submit: mostrar confirmación y limpiar carrito
const form = document.getElementById('badForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Safe to Use: Validación básica antes de procesar
    const inputs = form.querySelectorAll('input[type="text"]');
    let valid = true;
    inputs.forEach(inp => {
      if (!inp.value.trim()) {
        valid = false;
        inp.style.borderColor = 'var(--neon-pink)';
      } else {
        inp.style.borderColor = 'var(--muted)';
      }
    });

    if (!valid) {
      alert("Por favor, completa todos los campos para continuar con seguridad.");
      return;
    }

    if (cart.length === 0) {
      alert("El carrito está vacío. Añade algo delicioso antes de pagar.");
      return;
    }

    if (!document.getElementById('termsCheck').checked) {
      alert("Debes aceptar los términos y condiciones para continuar.");
      return;
    }

    document.getElementById('confirmation').classList.remove('hidden');
    document.getElementById('confirmation').scrollIntoView({behavior: 'smooth'});
    
    // Vaciar carrito al enviar de forma segura
    cart.length = 0; 
    updateCartCount();
    const panel = document.getElementById('cartPanel'); 
    if (panel) panel.style.display = 'none';
  });
}

// Restricción de solo números y formato de tarjeta (Safe to Use)
const cardInp = document.querySelector('input[placeholder="•••• •••• •••• ••••"]');
const cvvInp = document.querySelector('input[placeholder="•••"]');
if (cardInp) {
  cardInp.maxLength = 19; // 16 números + 3 espacios
  cardInp.addEventListener('input', (e) => {
    // Eliminar todo lo que no sea número
    let value = e.target.value.replace(/\D/g, '');
    // Limitar a 16 dígitos
    if (value.length > 16) value = value.slice(0, 16);
    // Formatear con espacios cada 4 dígitos
    const parts = value.match(/.{1,4}/g);
    e.target.value = parts ? parts.join(' ') : '';
  });
}
if (cvvInp) {
  cvvInp.maxLength = 3;
  cvvInp.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  });
}

// Botón de Términos
const termsBtn = document.getElementById('viewTerms');
if (termsBtn) {
  termsBtn.addEventListener('click', () => {
    alert("TÉRMINOS Y CONDICIONES:\n\n1. Tu pedido llegará cuando el caos lo permita.\n2. No nos hacemos responsables por hambre extrema.\n3. Disfruta tu hamburguesa con seguridad.");
  });
}

// Inicializar contador
updateCartCount();

// End of file
