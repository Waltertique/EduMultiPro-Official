// Script para el carrusel de imágenes
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.carousel-img');
    let currentIndex = 0;
    
    function showNextImage() {
      images[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
    }
    
    // Cambiar imagen cada 5 segundos
    setInterval(showNextImage, 5000);
  });