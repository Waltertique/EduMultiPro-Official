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
        return confirm('¿Estás seguro que deseas eliminar esta materia?');
    }

    document.querySelectorAll('.modificar').forEach(btn => {
        btn.addEventListener('click', function () {
          const fila = this.closest('tr');
          const id = fila.children[0].textContent;
          const nombre = fila.children[1].textContent;
          const descripcion = fila.children[2].textContent;
    
          document.getElementById('editarID').value = id.trim();
          document.getElementById('editarNombre').value = nombre.trim();
          document.getElementById('editarDescripcion').value = descripcion.trim();
    
          document.getElementById('formEditarMateria').style.display = 'block';
        });
      });

    function cancelarEdicion() {
        document.getElementById("formEditarMateria").style.display = "none";
    }