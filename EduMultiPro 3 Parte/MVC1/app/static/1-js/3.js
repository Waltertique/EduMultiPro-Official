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
        return confirm('¿Estás seguro que deseas eliminar este curso?');
    }

    document.querySelectorAll('.modificar').forEach(btn => {
    btn.addEventListener('click', function () {
        const fila = this.closest('tr');
        const id = fila.children[0].textContent;
        const nombre = fila.children[1].textContent;
        const gradoNombre = fila.children[2].textContent;
        const jornadaNombre = fila.children[3].textContent;

        document.getElementById('editarCursoID').value = id.trim();
        document.getElementById('editarCursoNombre').value = nombre.trim();

        const gradoSelect = document.getElementById('editarGrado');
        for (let option of gradoSelect.options) {
        option.selected = option.text === gradoNombre.trim();
        }

        const jornadaSelect = document.getElementById('editarJornada');
        for (let option of jornadaSelect.options) {
        option.selected = option.text === jornadaNombre.trim();
        }

        document.getElementById('modificarCurso').style.display = 'block';
    });
    });

    function cancelarEdicionCurso() {
    document.getElementById('modificarCurso').style.display = "none";
    }