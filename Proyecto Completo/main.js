const productos = [
  // Categoría: Carros
  { id: 1, nombre: "Renault Duster", categoria: "carros", precio: 15300, imagen: "img/carros/renault-duster.jpg" },
  { id: 2, nombre: "Chevrolet Onix", categoria: "carros", precio: 14500, imagen: "img/carros/chevrolet-onix.jpg" },
  { id: 3, nombre: "Mazda CX-30", categoria: "carros", precio: 24000, imagen: "img/carros/mazda-cx30.jpg" },
  { id: 4, nombre: "Kia Sportage", categoria: "carros", precio: 21000, imagen: "img/carros/kia-sportage.jpg" },

  // Categoría: Accesorios
  { id: 5, nombre: "Tapetes para carro", categoria: "accesorios", precio: 30, imagen: "img/accesorios/tapetes.jpg" },
  { id: 6, nombre: "Cámara de reversa", categoria: "accesorios", precio: 50, imagen: "img/accesorios/camara-reversa.jpg" },
  { id: 7, nombre: "Cargador USB para auto", categoria: "accesorios", precio: 15, imagen: "img/accesorios/cargador-usb.jpg" },
  { id: 8, nombre: "Soporte para celular", categoria: "accesorios", precio: 10, imagen: "img/accesorios/soporte-celular.jpg" },

  // Categoría: Repuestos
  { id: 9, nombre: "Filtro de aire Duster", categoria: "repuestos", precio: 20, imagen: "img/repuestos/filtro-aire.jpg" },
  { id: 10, nombre: "Aceite motor 5W-30", categoria: "repuestos", precio: 35, imagen: "img/repuestos/aceite-motor.jpg" },
  { id: 11, nombre: "Bujías estándar", categoria: "repuestos", precio: 25, imagen: "img/repuestos/bujias.jpg" },
  { id: 12, nombre: "Llanta Michelin", categoria: "repuestos", precio: 120, imagen: "img/repuestos/llanta.jpg" },
];

const contenedorProductos = document.getElementById("contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.getElementById("titulo-principal");
const numerito = document.getElementById("numerito"); // Contador del carrito

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Renderizar productos filtrados por categoría
function renderizarProductos(productosFiltrados) {
  contenedorProductos.innerHTML = ""; // Limpiar productos previos
  productosFiltrados.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto" />
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button class="agregar-carrito" data-id="${producto.id}">Agregar</button>
    `;
    contenedorProductos.appendChild(div);
  });
}

// Filtrar productos por categoría
function filtrarPorCategoria(categoria) {
  if (categoria === "todos") {
    tituloPrincipal.textContent = "Todos los productos";
    renderizarProductos(productos);
  } else {
    tituloPrincipal.textContent = `Categoría: ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`;
    const productosFiltrados = productos.filter(
      (producto) => producto.categoria === categoria
    );
    renderizarProductos(productosFiltrados);
  }
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find((prod) => prod.id === parseInt(id));
  if (producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarToast(`${producto.nombre} agregado al carrito`);
  }
}

// Actualizar el contador del carrito
function actualizarContadorCarrito() {
  numerito.textContent = carrito.length; // Actualizar el número en pantalla
}

// Mostrar notificación con Toastify
function mostrarToast(mensaje) {
  Toastify({
    text: mensaje,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#4caf50",
  }).showToast();
}

// Manejar clics en los botones de categorías
botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    const categoria = e.target.id; // El ID del botón representa la categoría
    filtrarPorCategoria(categoria);

    // Actualizar el estado visual de los botones
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.target.classList.add("active");
  });
});

// Manejar clics en los botones de agregar al carrito
contenedorProductos.addEventListener("click", (e) => {
  if (e.target.classList.contains("agregar-carrito")) {
    const idProducto = e.target.getAttribute("data-id");
    agregarAlCarrito(idProducto);
  }
});

// Inicializar la página mostrando todos los productos
filtrarPorCategoria("todos");
actualizarContadorCarrito(); // Sincronizar el contador al cargar la página
