// Script para el carrusel de noticias
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');
  let currentIndex = 0;
  let intervalId;
  
  // Función para mostrar slide
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
  }
  
  // Función para siguiente slide
  function nextSlide() {
    let newIndex = (currentIndex + 1) % slides.length;
    showSlide(newIndex);
  }
  
  // Función para slide anterior
  function prevSlide() {
    let newIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(newIndex);
  }
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Autoplay
  function startAutoPlay() {
    intervalId = setInterval(nextSlide, 5000);
  }
  
  function stopAutoPlay() {
    clearInterval(intervalId);
  }
  
  startAutoPlay();
  
  // Pausar autoplay al interactuar
  const carousel = document.querySelector('.news-carousel');
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);
});
