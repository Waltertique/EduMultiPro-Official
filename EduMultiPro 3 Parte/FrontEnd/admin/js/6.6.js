document.querySelectorAll('#salir').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../admin/6-notas.html';
    });
});