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

    document.querySelectorAll('.salir').forEach(boton => {
        boton.addEventListener('click', function () {
            window.location.href = '/admin/4-horario.html';
        });
    });

    const imagen = document.getElementById("horario-img");
    const modal = document.getElementById("modal");
    const imgAmpliada = document.getElementById("img-ampliada");
    const cerrar = document.getElementById("cerrar");

    // Al hacer clic en la imagen, se abre el modal
    imagen.addEventListener("click", function () {
        modal.style.display = "flex";
        imgAmpliada.src = imagen.src;
    });

    // Cerrar modal con el botón "X"
    cerrar.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Cerrar modal si se hace clic fuera de la imagen
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
