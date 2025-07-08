document.getElementById("formNombre").addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("inputNombre").value.trim();
    sessionStorage.setItem("usuarioNombre", nombre);
    window.location.href = "tienda.html";
});