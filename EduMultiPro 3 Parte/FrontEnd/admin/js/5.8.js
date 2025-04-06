$(document).ready(function(){
    $('.tablaUsuarios').DataTable({
       language:{
        processing:"Procesando...",
        search:"Buscar:",
        lengthMenu:"Mostrar  _MENU_  registros",
        info:"Mostrando _START_ a _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 a 0 de 0 registros",
        infoFiltered:"(filtrado de _MAX_ registros totales)",
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
    document.querySelectorAll('#principal').forEach(boton => {
        boton.addEventListener('click', function () {
            window.location.href = '../admin/5.5aul.html';
        });
    });
    
    document.querySelectorAll('#trabajo').forEach(boton => {
        boton.addEventListener('click', function () {
            window.location.href = '../admin/5.6trabajo.html';
        });
    });
    
    document.querySelectorAll('#persona').forEach(boton => {
        boton.addEventListener('click', function () {
            window.location.href = '../admin/5.7persona.html';
        });
    });
    
    document.querySelectorAll('#nota').forEach(boton => {
        boton.addEventListener('click', function () {
            window.location.href = '../admin/5.8nota.html';
        });
    });