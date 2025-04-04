
    document.addEventListener("DOMContentLoaded", function () {
      const subirArchivoBtn = document.getElementById("subirArchivo");
      const abrirModalBtn = document.getElementById("abrirModal");
      const archivoNombre = document.getElementById("archivoNombre");
      const archivoSeleccionado = document.getElementById("archivoSeleccionado");
      const confirmarEntregaBtn = document.getElementById("confirmarEntrega");
      let archivoSubido = null;

      subirArchivoBtn.addEventListener("click", function () {
        const input = document.createElement("input");
        input.type = "file";

        input.addEventListener("change", function () {
          if (input.files.length > 0) {
            archivoSubido = input.files[0];
            archivoNombre.textContent = archivoSubido.name;
          }
        });

        input.click();
      });

      abrirModalBtn.addEventListener("click", function () {
        if (archivoSubido) {
          archivoSeleccionado.textContent = archivoSubido.name;
          new bootstrap.Modal(document.getElementById("modalArchivo")).show();
        } else {
          alert("Debes subir un archivo antes de entregar.");
        }
      });

      confirmarEntregaBtn.addEventListener("click", function () {
        alert("Trabajo entregado con éxito.");
        bootstrap.Modal.getInstance(document.getElementById("modalArchivo")).hide();
      });
    });