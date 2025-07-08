document.addEventListener("DOMContentLoaded", () => {
    let productoActual = null;

    document.getElementById("buscarProductoForm").addEventListener("submit", async function (e) {
        e.preventDefault();
        const id = document.getElementById("idEliminar").value;
        const infoDiv = document.getElementById("productoInfo");
        document.getElementById("btnEliminar").disabled = true;
        infoDiv.innerHTML = "";

        try {
            const respuesta = await fetch(`/api/products/${id}`);
            if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

            const data = await respuesta.json();

            if (!data.payload || data.payload.length === 0) {
                infoDiv.innerHTML = `<p>Producto no encontrado</p>`;
                productoActual = null;
                return;
            }

            const prod = data.payload;
            productoActual = prod;
            document.getElementById("btnEliminar").disabled = false;
            infoDiv.style.display = "block";
            infoDiv.innerHTML = `
          <h3>Producto encontrado:</h3>
          <ul>
            <li><strong>ID:</strong> ${prod.id}</li>
            <li><strong>Nombre:</strong> ${prod.nombre}</li>
            <li><strong>Categoría:</strong> ${prod.categoria}</li>
            <li><strong>Imagen:</strong> <img src="${prod.imagen}" alt="${prod.nombre}" width="100" /></li>
            <li><strong>Precio:</strong> $${prod.precio}</li>
          </ul>
        `;

        } catch (error) {
            infoDiv.innerHTML = `<p>Error al buscar el producto: ${error.message}</p>`;
        }
    });

    document.getElementById("btnEliminar").addEventListener("click", async function () {
        if (!productoActual) return;

        const confirmar = confirm(`¿Estás seguro que querés eliminar "${productoActual.nombre}"?`);
        if (!confirmar) return;

        try {
            const respuesta = await fetch(`/api/products/${productoActual.id}`, {
                method: 'DELETE',
            });
            const data = await respuesta.json();

            if (!respuesta.ok) {
                alert(`❌ ${data.message}`);
            } else {
                alert("✅ Producto eliminado correctamente");
                document.getElementById("productoInfo").innerHTML = "";
                productoActual = null;
                document.getElementById("btnEliminar").disabled = true;
                document.getElementById("buscarProductoForm").reset();
            }
        } catch (error) {
            alert(`❌ Error al eliminar: ${error.message}`);
        }
    });
});  