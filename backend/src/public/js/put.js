document.addEventListener("DOMContentLoaded", () => {

    async function obtenerDatosProductoPorId(id) {
        try {
            let respuesta = await fetch(`/api/products/${id}`);
            if (!respuesta.ok) throw new Error('Producto no encontrado');
            let datos = await respuesta.json();
            mostrarProducto(datos.payload);
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            alert("Ocurrió un error al buscar el producto.");
        }
    }

    function mostrarProducto(producto) {
        const contenedor = document.getElementById("getIdContainer");
        contenedor.style.display = "block";
        contenedor.innerHTML = `
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <p>Precio: $${producto.precio}</p>
        <p>Categoría: ${producto.categoria}</p>
        <button id="editarProducto">Editar Producto</button>
      `;
        document.getElementById("editarProducto").addEventListener("click", () => {
            editarProducto(producto);
        });
    }

    function editarProducto(producto) {
        const contenedor = document.getElementById("getIdContainer");
        contenedor.innerHTML = `
        <div>
          <h2>Modificación de producto</h2>
          <form id="modificacion_form" autocomplete="off">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" value="${producto.nombre}" required>
  
            <label for="categoryProd">Categoría</label>
            <select id="categoryProd" name="categoria" required>
              <option value="" disabled>Seleccione una categoría</option>
              <option value="Procesadores" ${producto.categoria === 'Procesadores' ? 'selected' : ''}>Procesadores</option>
              <option value="Placas de video" ${producto.categoria === 'Placas de video' ? 'selected' : ''}>Placas de video</option>
            </select>
  
            <label for="imagenProd">Imagen</label>
            <input type="text" id="imagenProd" name="imagen" value="${producto.imagen}" required>
  
            <label for="precioProd">Precio</label>
            <input type="number" step="0.01" id="precioProd" name="precio" value="${producto.precio}" required>
  
            <button type="submit" class="btn-primario">Modificar Producto</button>
          </form>
        </div>
      `;

        document.getElementById("modificacion_form").addEventListener("submit", function (e) {
            e.preventDefault();
            modificacionProducto(producto);
        });
    }

    async function modificacionProducto(producto) {
        const nombre = document.getElementById("nombre").value;
        const categoria = document.getElementById("categoryProd").value;
        const imagen = document.getElementById("imagenProd").value;
        const precio = document.getElementById("precioProd").value;

        const productoModificado = {
            id: parseInt(producto.id),
            nombre,
            categoria,
            imagen,
            precio
        };

        try {
            const response = await fetch(`/api/products/${producto.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoModificado)
            });

            if (!response.ok) throw new Error("Error en la modificación");

            const data = await response.json();
            console.log('Producto modificado:', data);
            alert('Producto modificado exitosamente');
            // Aquí podrías actualizar la vista o limpiar formulario
        } catch (error) {
            console.error('Error al modificar el producto:', error);
            alert('Error al modificar el producto');
        }
    }

    document.getElementById("altaProducts_form").addEventListener("submit", function (event) {
        event.preventDefault();
        const idProducto = document.getElementById("idProducto").value;
        if (idProducto) {
            obtenerDatosProductoPorId(idProducto);
        } else {
            alert("Por favor, ingrese un ID de producto válido.");
        }
    });

});