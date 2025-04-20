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

// codigo del carrusel 

let current = 0;
        const images = document.querySelectorAll(".carousel-img");
      
        setInterval(() => {
          images[current].classList.remove("active");
          current = (current + 1) % images.length;
          images[current].classList.add("active");
        }, 3000);