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
    
    function confirmarEliminacion() {
        return confirm('¿Estás seguro que deseas eliminar esta jornada?');
    }

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".modificar_jornada").forEach(function(boton) {
          boton.addEventListener("click", function () {
            const fila = boton.closest("tr");
            const id = fila.cells[0].textContent.trim();
            const nombre = fila.cells[1].textContent.trim();
    
            document.getElementById("editarJornadaID").value = id;
            document.getElementById("editarJornadaNombre").value = nombre;
    
            document.getElementById("formEditarJornada").style.display = "block";
          });
        });
      });
    
      function cancelarEdicionJornada() {
        document.getElementById("formEditarJornada").style.display = "none";
      }