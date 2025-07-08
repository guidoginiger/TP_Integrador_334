function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("items-carrito");
    const totalSpan = document.getElementById("precio-total");

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>No hay elementos en el carrito.</p>";
        totalSpan.textContent = "0.00";
        return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
        const item = document.createElement("div");
        item.className = "item-carrito";

        const subtotal = producto.precio * (producto.cantidad || 1);
        item.innerHTML = `
      <p><strong>${producto.nombre}</strong></p>
      <p>Precio unitario: $${producto.precio}</p>
      <p>Cantidad: 
        <button class="btn-cantidad" data-index="${index}" data-accion="disminuir">-</button>
        <span>${producto.cantidad || 1}</span>
        <button class="btn-cantidad" data-index="${index}" data-accion="aumentar">+</button>
      </p>
      <p>Subtotal: $${subtotal.toFixed(2)}</p>
      <button class="eliminar-producto" data-index="${index}">❌ Eliminar</button>
    `;

        contenedor.appendChild(item);
        total += subtotal;
    });

    totalSpan.textContent = total.toFixed(2);

    // Evento eliminar producto
    document.querySelectorAll(".eliminar-producto").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            eliminarProducto(index);
        });
    });

    // Eventos botones cantidad
    document.querySelectorAll(".btn-cantidad").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            const accion = e.target.getAttribute("data-accion");
            cambiarCantidad(index, accion);
        });
    });
}

function eliminarProducto(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

function cambiarCantidad(index, accion) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (!carrito[index]) return;

    if (accion === "aumentar") {
        carrito[index].cantidad = (carrito[index].cantidad || 1) + 1;
    } else if (accion === "disminuir") {
        carrito[index].cantidad = (carrito[index].cantidad || 1) - 1;
        if (carrito[index].cantidad < 1) {
            // Si la cantidad es menor a 1, eliminar el producto
            carrito.splice(index, 1);
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

document.getElementById("vaciar-carrito").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    cargarCarrito();
});


document.getElementById("confirmarCompra").addEventListener("click", async () => {
  const nombre = sessionStorage.getItem("usuarioNombre");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (!nombre || carrito.length === 0) {
    alert("No hay usuario o el carrito está vacío.");
    return;
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  try {
    const response = await fetch("http://localhost:3000/api/venta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario: nombre,
        total: total
      })
    });

    if (!response.ok) throw new Error("Error al confirmar compra");

    alert("✅ ¡Compra confirmada con éxito!");

    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "bienvenida.html";

  } catch (error) {
    console.error("Error al guardar venta:", error.message);
    alert("Ocurrió un error al procesar la compra.");
  }
});

document.addEventListener("DOMContentLoaded", cargarCarrito);