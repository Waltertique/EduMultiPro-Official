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

// Script para el carrusel de noticias
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.carousel-img');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let intervalId;
    
    // Función para mostrar la imagen actual
    function showImage(index) {
      images.forEach(img => img.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      images[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }
    
    // Navegación con puntos
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(intervalId);
        showImage(index);
        startCarousel();
      });
    });
    
    // Botones anterior/siguiente
    prevBtn.addEventListener('click', () => {
      clearInterval(intervalId);
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
      startCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
      clearInterval(intervalId);
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
      startCarousel();
    });
    
    // Iniciar carrusel automático
    function startCarousel() {
      intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }, 5000);
    }
    
    // Iniciar el carrusel al cargar la página
    startCarousel();
    
    // Pausar el carrusel al hacer hover
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', () => {
      clearInterval(intervalId);
    });
    
    carousel.addEventListener('mouseleave', () => {
      startCarousel();
    });
  });