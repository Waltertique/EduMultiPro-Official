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


// funciones de los botones 
$(document).ready(function(){
    $('.tablaUsuarios').DataTable({
       language:{
        processing:"Procesando...",
        search:"Buscar:",
        lengthMenu:"Mostrar  _MENU_  registros",
        Tearea:"Mostrando _START_ a _END_ de _TOTAL_ registros",
        TeareaEmpty: "Mostrando 0 a 0 de 0 registros",
        TeareaFiltered:"(filtrado de _MAX_ registros totales)",
        loadingRecords: "Cargando...",
        zeroRecords: "No se encontraron resultados",
        emptyTable: "No hay datos en la tabla",
        paginate:{
            previous: "Anterior", 
            next:"Siguiente",
        },
        aria:{
            sortAscending:"Activar para ordenar la columna ascendentemente",
            sortDescending:"Activar para ordenar la columna descendentemente",
        }
       },
       paging:true,
       searching:true,
       ordering:true 
       
    });
    }); 

    // boton de ir a principal
    document.querySelectorAll('.info').forEach(boton => {
        boton.addEventListener('click', function () {
            window.location.href = '#';
        });
    });



