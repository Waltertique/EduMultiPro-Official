document.addEventListener("DOMContentLoaded", function() {
  const imagenPequena = document.getElementById('imagenPequena');
  const modal = document.getElementById('modalImagen');
  const imagenGrande = document.getElementById('imagenGrande');
  const cerrar = document.querySelector('.cerrar');

  if (imagenPequena) {
    imagenPequena.onclick = function() {
      imagenGrande.src = this.src;
      modal.style.display = "block";
    };
  }

  cerrar.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});