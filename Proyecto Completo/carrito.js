const contenedorCarrito = document.getElementById("contenedor-carrito");
const totalSpan = document.getElementById("total");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Renderizar carrito
function renderizarCarrito() {
  contenedorCarrito.innerHTML = ""; // Limpia el contenedor
  let total = 0;

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    totalSpan.textContent = 0;
    return;
  }

  carrito.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("producto-carrito");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-carrito" />
      <div class="detalle-producto">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <button class="eliminar-carrito" data-index="${index}">Eliminar</button>
      </div>
    `;
    contenedorCarrito.appendChild(div);
    total += producto.precio;
  });

  totalSpan.textContent = total;
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
  const productoEliminado = carrito[index]; // Guardamos el producto eliminado para mostrar su nombre
  carrito.splice(index, 1); // Elimina el producto del carrito
  localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza el carrito en el almacenamiento local
  renderizarCarrito(); // Vuelve a renderizar el carrito
  mostrarToast(`${productoEliminado.nombre} ha sido eliminado del carrito`); // Muestra el mensaje
}

// Mostrar notificación con Toastify
function mostrarToast(mensaje) {
  Toastify({
    text: mensaje,
    duration: 3000, // Duración del mensaje (en milisegundos)
    gravity: "top", // Posición de la notificación (top o bottom)
    position: "right", // Ubicación de la notificación (right, left, center)
    backgroundColor: "#ff4d4d", // Color de fondo de la notificación
  }).showToast();
}

// Manejar clics en el carrito
contenedorCarrito.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminar-carrito")) {
    const index = e.target.getAttribute("data-index"); // Obtiene el índice del producto a eliminar
    eliminarDelCarrito(index);
  }
});

// Renderizar al cargar
renderizarCarrito();
