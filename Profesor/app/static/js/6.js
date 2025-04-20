// Agregar nuevo anuncio
document.getElementById("btnAgregarAnuncio").addEventListener("click", function() {
    const contenido = document.getElementById("contenidoAnuncio").value.trim();
    if (!contenido) return alert("Por favor, escribe un anuncio antes de agregar.");

    const contenedor = document.getElementById("contenedorAnuncios");
    const nuevoAnuncio = document.createElement("div");
    nuevoAnuncio.classList.add("parte5");
    nuevoAnuncio.innerHTML = `
      <div class="dato">
        <p class="fw-bold">Juan Perez</p>
        <button class="btn-icon modificar"><i class="fa-solid fa-gear"></i></button>
      </div>
      <div class="dato1">
        <p>${contenido}</p>
      </div>
    `;
    contenedor.prepend(nuevoAnuncio);
    document.getElementById("contenidoAnuncio").value = "";
  });

  // Delegar evento de modificación
  document.getElementById("contenedorAnuncios").addEventListener("click", function(e) {
    if (e.target.closest('.modificar')) {
      const anuncio = e.target.closest('.parte5');
      const texto = anuncio.querySelector(".dato1 p").innerText;

      Swal.fire({
        title: 'Editar anuncio',
        input: 'textarea',
        inputLabel: 'Contenido',
        inputValue: texto,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          if (!value.trim()) {
            return 'El contenido no puede estar vacío';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          anuncio.querySelector(".dato1 p").innerText = result.value;
          Swal.fire('Guardado', 'El anuncio fue actualizado.', 'success');
        }
      });
    }
  });

// menu principal

document.querySelectorAll('.inicio').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../PROFESOR/1-principalProfesor.html';
    });
});
document.querySelectorAll('.noticia').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../PROFESOR/2-noticias.html';
    });
});
document.querySelectorAll('.Horarios').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../PROFESOR/4-horario.html';
    });
});
document.querySelectorAll('.clase').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../PROFESOR/5-aula.html';
    });
});
document.querySelectorAll('.calificacion').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../PROFESOR/13-calificaciones.html';
    });
});
document.querySelectorAll('.usuarios').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../PROFESOR/Usuarios.html';
    });
});
document.querySelectorAll('.cerrar').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../Principal/index.html.html';
    });
});


// menu secundario
document.querySelectorAll('.principal').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../Profesor/6-trabajo.html';
    });
});
document.querySelectorAll('.trabajos').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../PROFESOR/7-listaTrabajo.html';
    });
});
document.querySelectorAll('.persona').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../PROFESOR/9-personas.html';
    });
});
document.querySelectorAll('.notas').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../PROFESOR/10-notas.html';
    });
});
