function mostrarArchivo(event) {
    const archivo = event.target.files[0];
    const url = URL.createObjectURL(archivo);

    document.getElementById('archivoSubido').innerHTML = `
      <a href="${url}" target="_blank">${archivo.name}</a>
    `;
  }

  document.querySelectorAll('#crear').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../admin/5.6trabajo.html';
    });
});
document.querySelectorAll('#salir').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../admin/5.6trabajo.html';
    });
});