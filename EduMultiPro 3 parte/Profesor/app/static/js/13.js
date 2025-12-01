// Script para DataTables
$(document).ready(function() {
    $('#tablaUsuarios').DataTable({
      responsive: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
      }
    });
  });

  // Script para resaltar el menú activo
  document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'inicio';
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
      const link = item.getAttribute('href').split('/').pop();
      if (link === currentPage) {
        item.classList.add('active');
      }
    });
  });
