document.addEventListener("DOMContentLoaded", () => {
    const buscarProductoForm = document.getElementById("buscarProductoForm");
    const productoEncontradoInfo = document.getElementById("productoEncontradoInfo");
    const detallesProductoLista = document.getElementById("detallesProductoLista");

    if (buscarProductoForm) {
        buscarProductoForm.addEventListener("submit", async function (e) {
            e.preventDefault(); // Evita el envío del formulario por defecto

            const id = document.getElementById("idProductoConsulta").value;
            productoEncontradoInfo.style.display = "none"; // Oculta info previa
            detallesProductoLista.innerHTML = ""; // Limpia resultados previos

            if (!id || isNaN(id)) {
                alert("Por favor, ingrese un ID de producto válido.");
                return;
            }

            try {
                // Solicitud GET a la API para obtener el producto por ID
                const respuesta = await fetch(`/api/products/${id}`);

                if (!respuesta.ok) {
                    const errorData = await respuesta.json();
                    throw new Error(errorData.message || `Error HTTP: ${respuesta.status}`);
                }

                const data = await respuesta.json();

                const prod = data.payload;

                if (prod) { // Verifica si el producto existe (si prod no es null/undefined)
                    detallesProductoLista.innerHTML = `
                        <li><strong>ID:</strong> ${prod.id}</li>
                        <li><strong>Nombre:</strong> ${prod.nombre}</li>
                        <li><strong>Categoría:</strong> ${prod.categoria}</li>
                        <li><strong>Imagen:</strong> <img src="${prod.imagen}" alt="${prod.nombre}" width="100" /></li>
                        <li><strong>Precio:</strong> $${prod.precio}</li>
                    `;
                    productoEncontradoInfo.style.display = "block"; // Muestra la sección de info
                } else {
                    // Si 'prod' es null/undefined, significa que no se encontró
                    detallesProductoLista.innerHTML = `<p>No se encontró ningún producto con el ID ${id}.</p>`;
                    productoEncontradoInfo.style.display = "block";
                }

            } catch (error) {
                console.error("Error al buscar el producto:", error);
                detallesProductoLista.innerHTML = `<p>${error.message}</p>`;
                productoEncontradoInfo.style.display = "block";
            }
        });
    }
});