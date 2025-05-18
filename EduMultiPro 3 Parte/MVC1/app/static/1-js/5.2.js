document.getElementById('btn-crear').addEventListener('click', function() {
    document.getElementById('crearAnuncio').style.display = 'block';
  });

  document.getElementById('btn-cancelar').addEventListener('click', function() {
    document.getElementById('crearAnuncio').style.display = 'none';
  });

    function confirmarEliminacion() {
        return confirm('¿Estás seguro que deseas eliminar este Anuncio?');
    }

