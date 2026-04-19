// === BurgerCHAOS - JS caótico ===

// MENÚ DATA
const menuItems = [
  { name: "Hamburguesa", price: "$1.99", emoji: "🍔", description: "Nuestra receta insignia. 200g de carne de res premium a la parrilla, doble queso cheddar fundido, tocino ahumado crujiente y nuestra salsa secreta 'Chaos' en pan brioche artesanal" },
  { name: "Papas", price: "$1.50", emoji: "🍟", description: "Papas rústicas cortadas a mano, sazonadas con una mezcla de especias de la casa. Servidas con un dip de queso fundido y cebollín." },
  { name: "Refresco", price: "$0.75", emoji: "🥤", description: "Bebida refrescante de la casa. Elige entre nuestros sabores de temporada: Frutos rojos, Limonada de coco o Té frío de la casa" },
  { name: "Nuggets", price: "$4.04", emoji: "🐔", description: "6 piezas de pechuga de pollo marinadas y empanizadas con panko, acompañadas de salsa de miel y mostaza." },
  { name: "Pizza", price: "$2.50", emoji: "🍕", description: "Masa artesanal de maduración lenta, salsa de tomate de la casa, abundante queso mozzarella y rodajas de peperoni premium. Horneada a la perfección para un borde crujiente." },
  { name: "Ensalada", price: "$3.50", emoji: "🥗", description: "Mix de verdes frescos, tomates cherry, aguacate, maíz dulce y pollo a la plancha. Todo bañado en una vinagreta ligera de cítricos." },
];

// Renderizar menú con rotaciones y tamaños de fuente caóticos 

const grid = document.getElementById("menuGrid");
menuItems.forEach((item, idx) => {
  const div = document.createElement("div");
  div.className = "menu-item" + (idx === 2 ? " vertical" : "");
  /**
  const rot = (idx % 2 === 0 ? 1 : -1) * (3 + idx);
  div.style.transform = `rotate(${rot}deg) translateY(${idx * 15}px)`;

  div.style.fontFamily = idx % 2 === 0 ? "'Comic Sans MS', cursive" : "'Papyrus', fantasy";
  div.style.fontSize = `${12 + idx * 4}px`;
  */
  div.innerHTML = `
    <span class="emoji">${item.emoji}</span>
    <h3>${item.name}</h3>
    <p class="desc">${item.description}</p>
    <span class="price">${item.price}</span>

    <div class="quantity-selector">
      <button type="button" class="btn-minus" data-idx="${idx}">-</button>
      <input type="number" class="input" id="qty-input-${idx}" value="1" min="1" max="10" readonly>
      <button type="button" class="btn-plus" data-idx="${idx}">+</button>
    </div>
    <button class="order-btn-menu">🛒 AGREGAR AL CARRITO</button>
  `;
  grid.appendChild(div);
});

// NAV que se mueve y desaparece
/**
const nav = document.getElementById("chaosNav");
setInterval(() => {
  const offset = Math.random() * 200 - 100;
  nav.style.transform = `translateX(${offset}px) rotate(${offset * 0.05}deg)`;
}, 2000);
*/
/** 
function increaseQty(idx) {
    const input = document.getElementById('qty-input-${idx}');
    if (input.value < 10) input.value = parseInt(input.value) + 1;
}

function decreaseQty(idx) {
    const input = document.getElementById('qty-input-${idx}');
    if (input.value > 1) input.value = parseInt(input.value) - 1;
}
    */
   grid.addEventListener('click', (e) => {
    // Detectamos si el click fue en un botón de más o menos
    const btn = e.target;
    const idx = parseInt(btn.getAttribute('data-idx'));


    const input = document.getElementById(`qty-input-${idx}`);
    let value = parseInt(input.value);

    if (btn.classList.contains('btn-plus')) {
        if (value < 10) input.value = value + 1;
    } 
    else if (btn.classList.contains('btn-minus')) {
        if (value > 1) input.value = value - 1;
    }
});

// Nav always visible — fácil de recordar: el menú siempre está donde se espera

// POPUPS molestos cada 5 segundos
const popupMessages = [
  "🍔 ¿QUIERES UNA HAMBURGUESA GRATIS?? (mentira)",
  "🎉 ¡GANASTE UN PREMIO! Haz clic en... ah no, se cerró",
  "⚠️ ¡TU PEDIDO SE VA A BORRAR EN 3...2...1... no es cierto!",
  "🍟 OFERTA ESPECIAL: Compra 47 papas y llévate 1 gratis",
  "📞 LLÁMANOS AL 1-800-NOEXISTE para quejas",
  "🦄 ¿Sabías que nuestras hamburguesas son de unicornio?",
  "💀 ERROR FATAL DEL SISTEMA... es broma, sigue pidiendo",
  "🎵 ¡Activa tu micrófono para pedir por voz! (no funciona)",
];

const popup = document.getElementById("annoyingPopup");
const popupMsg = document.getElementById("popupMsg");

setInterval(() => {
  popupMsg.textContent = popupMessages[Math.floor(Math.random() * popupMessages.length)];
  popup.style.top = (Math.random() * 70 + 10) + "%";
  popup.style.left = (Math.random() * 60 + 10) + "%";
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("hidden"), 3500);
}, 5000);

// Validaciones en tiempo real para inputs del formulario
const cardName = document.getElementById("cardName");
const cardNumber = document.getElementById("cardNumber");
const cardCVV = document.getElementById("cardCVV");

if (cardName) {
  cardName.addEventListener("input", function(e) {
    // Solo permitir letras y espacios, borrando cualquier número ingresado inmediatamente
    this.value = this.value.replace(/[0-9]/g, "");
  });
}

if (cardNumber) {
  cardNumber.addEventListener("input", function(e) {
    // Quitar todo lo que no sea dígito
    let val = this.value.replace(/\D/g, "");
    // Formatear en bloques de 4: XXXX XXXX XXXX XXXX
    val = val.replace(/(.{4})/g, "$1 ").trim();
    // Limitar que no nos pasemos de 19 caracteres (16 números + 3 espacios)
    this.value = val.substring(0, 19);
  });
}

if (cardCVV) {
  cardCVV.addEventListener("input", function(e) {
    // Quitar todo lo que no sea dígito y limitar a 3 números máximos
    let val = this.value.replace(/\D/g, "");
    this.value = val.substring(0, 3);
  });
}

// FORM submit (seguro con confirmación)
document.getElementById("badForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // Validamos la intención del usuario pidiendo confirmación explícita (Safe to Use)
  if (confirm("¿Estás completamente seguro de que deseas proceder con el pago y procesar la compra?")) {
    document.getElementById("confirmation").classList.remove("hidden");
    document.getElementById("badForm").reset(); // Limpieza del formulario
  }
});
