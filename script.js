// === BurgerCHAOS - JS caótico ===

// MENÚ DATA
const menuItems = [
  { name: "Hamburguesa Caótica", price: "$∞.99", emoji: "🍔", description: "Con ingredientes que ni nosotros sabemos" },
  { name: "Papas del Desorden", price: "$-3.50", emoji: "🍟", description: "Pueden o no venir en tu pedido" },
  { name: "Refresco Misterioso", price: "$π", emoji: "🥤", description: "Sabor sorpresa (siempre es vinagre)" },
  { name: "Nuggets Fantasma", price: "$404", emoji: "🐔", description: "No encontrados" },
  { name: "Pizza... sí, Pizza", price: "$¿?", emoji: "🍕", description: "Esto es de hamburguesas pero ok" },
  { name: "Ensalada Rebelde", price: "$666", emoji: "🥗", description: "Se niega a ser saludable" },
];

// Renderizar menú con rotaciones y tamaños de fuente caóticos
const grid = document.getElementById("menuGrid");
menuItems.forEach((item, idx) => {
  const div = document.createElement("div");
  div.className = "menu-item" + (idx === 2 ? " vertical" : "");
  const rot = (idx % 2 === 0 ? 1 : -1) * (3 + idx);
  div.style.transform = `rotate(${rot}deg) translateY(${idx * 15}px)`;
  div.style.fontFamily = idx % 2 === 0 ? "'Comic Sans MS', cursive" : "'Papyrus', fantasy";
  div.style.fontSize = `${12 + idx * 4}px`;
  div.innerHTML = `
    <span class="emoji">${item.emoji}</span>
    <h3>${item.name}</h3>
    <p class="desc">${item.description}</p>
    <span class="price">${item.price}</span>
    <button class="order-btn">pedir</button>
    <div>
      <button class="order-btn-menu" >AGREGAR A CARRITO</button>
      <button class="order-btn-menu">COMPRAR YA </button>
    </div>
  `;
  grid.appendChild(div);
});

// NAV que se mueve y desaparece
const nav = document.getElementById("chaosNav");
setInterval(() => {
  const offset = Math.random() * 200 - 100;
  nav.style.transform = `translateX(${offset}px) rotate(${offset * 0.05}deg)`;
}, 2000);

setInterval(() => {
  nav.style.display = "none";
  setTimeout(() => { nav.style.display = "flex"; }, 1500);
}, 7000);

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

// FORM submit (sin confirmación real)
document.getElementById("badForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("confirmation").classList.remove("hidden");
});
