document.addEventListener("DOMContentLoaded", () => {
    let altaProducts_form = document.getElementById("altaProducts_form");

    altaProducts_form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita el envío del formulario por defecto

        let formData = new FormData(event.target); // Obtiene los datos del formulario
        let data = Object.fromEntries(formData.entries()); // Convierte FormData a un objeto

        // Enviar los datos al servidor usando fetch
        try {
            let response = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data) // Convierte el objeto a JSON
            });

            if (response.ok) {
                console.log(response);

                let result = await response.json();
                console.log(result.message);
                alert("Producto creado exitosamente.");
            }
            else {
                let error = await response.json();
                console.error("Error al crear el producto:", error);
            }

        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert("Ocurrió un error al crear el producto. Por favor, inténtalo de nuevo.");
            return;
        }

    })
});