// Espera a que todo el contenido HTML se haya cargado
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Obtiene todos los productos desde la API
    const respuesta = await fetch("http://localhost:3000/api/products");
    if (!respuesta.ok) throw new Error("Error al obtener productos");

    // Convierte la respuesta a JSON
    const data = await respuesta.json();
    const productos = data.payload;

    // Guarda la lista completa de productos en una variable global dentro de 'window'
    // para que pueda ser accedida desde otras funciones
    window.productosGlobal = productos;

    // Muestra los productos agrupados por categorías en la página
    mostrarProductosPorCategoria(productos);

    // Configura los botones para ordenar productos en cada categoría
    configurarOrdenamiento(productos);

    // Actualiza el contador visual del carrito (cantidad total de items)
    actualizarContadorCarrito();

    // Muestra la categoría "Procesadores" por defecto al cargar la página
    mostrarCategoria("Procesadores");

    // Configura los botones para cambiar la categoría mostrada
    document.getElementById("btnProcesadores").addEventListener("click", () => {
      mostrarCategoria("Procesadores");
    });

    document.getElementById("btnPlacas").addEventListener("click", () => {
      mostrarCategoria("Placas");
    });

  } catch (error) {
    // Si ocurre algún error durante la carga, se muestra en consola
    console.error("Error al cargar productos:", error.message);
  }
});

// Botón que redirige a la página del carrito
document.getElementById("btnVerCarrito").addEventListener("click", () => {
  window.location.href = "carrito.html";
});

// Obtiene el nombre del usuario guardado en sessionStorage y lo muestra en la cabecera
const nombre = sessionStorage.getItem("usuarioNombre");
console.log(nombre);
if (nombre) {
  document.getElementById("nombreUsuario").textContent = nombre;
}

// Función que recibe todos los productos y los muestra separados por categorías
function mostrarProductosPorCategoria(productos) {
  const contenedorProcesadores = document.getElementById("productos-procesadores");
  const contenedorPlacas = document.getElementById("productos-placas");

  // Filtra los productos por categoría
  const procesadores = productos.filter(p => p.categoria === "Procesadores");
  const placas = productos.filter(p => p.categoria === "Placas de video");

  // Renderiza los productos filtrados en sus respectivos contenedores
  renderProductos(procesadores, contenedorProcesadores);
  renderProductos(placas, contenedorPlacas);
}

// Configura los botones para ordenar productos por nombre o precio en ambas categorías
function configurarOrdenamiento(productos) {
  const contenedorProcesadores = document.getElementById("productos-procesadores");
  const contenedorPlacas = document.getElementById("productos-placas");

  const procesadores = productos.filter(p => p.categoria === "Procesadores");
  const placas = productos.filter(p => p.categoria === "Placas de video");

  // Ordenar procesadores por nombre alfabéticamente
  document.getElementById("ordenar-nombre-procesadores").addEventListener("click", () => {
    const ordenados = [...procesadores].sort((a, b) => a.nombre.localeCompare(b.nombre));
    renderProductos(ordenados, contenedorProcesadores);
  });

  // Ordenar procesadores por precio ascendente
  document.getElementById("ordenar-precio-procesadores").addEventListener("click", () => {
    const ordenados = [...procesadores].sort((a, b) => a.precio - b.precio);
    renderProductos(ordenados, contenedorProcesadores);
  });

  // Ordenar placas por nombre alfabéticamente
  document.getElementById("ordenar-nombre-placas").addEventListener("click", () => {
    const ordenados = [...placas].sort((a, b) => a.nombre.localeCompare(b.nombre));
    renderProductos(ordenados, contenedorPlacas);
  });

  // Ordenar placas por precio ascendente
  document.getElementById("ordenar-precio-placas").addEventListener("click", () => {
    const ordenados = [...placas].sort((a, b) => a.precio - b.precio);
    renderProductos(ordenados, contenedorPlacas);
  });
}

// Función que recibe una lista de productos y un contenedor HTML donde renderizarlos
function renderProductos(lista, contenedor) {
  // Crea el HTML para cada producto y lo inserta en el contenedor
  contenedor.innerHTML = lista.map(p => `
    <div class="producto">
      <h3>${p.nombre}</h3>
      <img src="${p.imagen}" alt="${p.nombre}" />
      <p>Precio: $${p.precio}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
    </div>
  `).join("");
}

// Función que agrega un producto al carrito en localStorage, o aumenta la cantidad si ya existe
function agregarAlCarrito(id) {
  // Obtiene el carrito guardado o crea uno vacío si no existe
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Busca si el producto ya está en el carrito
  const index = carrito.findIndex(prod => prod.id === id);

  if (index !== -1) {
    // Si está, aumenta la cantidad en 1
    carrito[index].cantidad += 1;
  } else {
    // Si no está, busca el producto en la lista global y lo agrega con cantidad 1
    const productoAgregar = window.productosGlobal.find(prod => prod.id === id);
    if (!productoAgregar) {
      alert("Producto no encontrado");
      return;
    }
    carrito.push({ ...productoAgregar, cantidad: 1 });
  }

  // Guarda el carrito actualizado en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Actualiza el contador visible en la UI
  actualizarContadorCarrito();
}

// Función que actualiza el contador que muestra la cantidad total de productos en el carrito
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Suma la cantidad de cada producto en el carrito
  const totalCantidad = carrito.reduce((acc, producto) => acc + (producto.cantidad || 1), 0);

  const contadorElement = document.getElementById("contador-carrito");
  if (contadorElement) {
    contadorElement.textContent = totalCantidad;
  }
}

// Función que muestra solo la categoría seleccionada y oculta la otra
function mostrarCategoria(categoria) {
  const seccionProcesadores = document.getElementById("seccion-procesadores");
  const seccionPlacas = document.getElementById("seccion-placas");

  const btnProcesadores = document.getElementById("btnProcesadores");
  const btnPlacas = document.getElementById("btnPlacas");

  if (categoria === "Procesadores") {
    // Muestra procesadores, oculta placas
    seccionProcesadores.classList.add("activa");
    seccionPlacas.classList.remove("activa");

    // Activa botón procesadores, desactiva placas
    btnProcesadores.classList.add("activo");
    btnPlacas.classList.remove("activo");
  } else {
    // Muestra placas, oculta procesadores
    seccionPlacas.classList.add("activa");
    seccionProcesadores.classList.remove("activa");

    // Activa botón placas, desactiva procesadores
    btnPlacas.classList.add("activo");
    btnProcesadores.classList.remove("activo");
  }
}