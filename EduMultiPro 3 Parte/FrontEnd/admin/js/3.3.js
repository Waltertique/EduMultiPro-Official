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
    
    const btnAgregar = document.querySelector('.crear');
const tabla = document.getElementById('tablaUsuarios');

// Evento para agregar miembro
btnAgregar.addEventListener('click', () => {
    Swal.fire({
        title: '¿Deseas agregar un nuevo miembro?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, agregar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Ingrese los datos',
                html:
                    `<input type="text" id="identificacion" class="swal2-input" placeholder="Identificación">
                    <input type="text" id="pNombre" class="swal2-input" placeholder="Primer Nombre">
                    <input type="text" id="sNombre" class="swal2-input" placeholder="Segundo Nombre">
                    <input type="text" id="pApellido" class="swal2-input" placeholder="Primer Apellido">
                    <input type="text" id="sApellido" class="swal2-input" placeholder="Segundo Apellido">`,
                showCancelButton: true,
                confirmButtonText: 'Agregar',
                cancelButtonText: 'Cancelar',
                preConfirm: () => {
                    const identificacion = document.getElementById('identificacion').value;
                    const pNombre = document.getElementById('pNombre').value;
                    const sNombre = document.getElementById('sNombre').value;
                    const pApellido = document.getElementById('pApellido').value;
                    const sApellido = document.getElementById('sApellido').value;

                    if (!identificacion || !pNombre || !sNombre || !pApellido || !sApellido) {
                        Swal.showValidationMessage('Todos los campos son obligatorios');
                    }

                    return { identificacion, pNombre, sNombre, pApellido, sApellido };
                }
            }).then((resultado) => {
                if (resultado.isConfirmed) {
                    const datos = resultado.value;

                    const nuevaFila = document.createElement('tr');
                    nuevaFila.innerHTML = `
                        <td>${datos.identificacion}</td>
                        <td>${datos.pNombre}</td>
                        <td>${datos.sNombre}</td>
                        <td>${datos.pApellido}</td>
                        <td>${datos.sApellido}</td>
                        <td><button class="btn-icon eliminar"><i class="fa-solid fa-trash"></i></button></td>
                    `;
                    tabla.querySelector('tbody').appendChild(nuevaFila);

                    agregarEventoEliminar(nuevaFila.querySelector('.eliminar'));

                    Swal.fire({
                        icon: 'success',
                        title: 'Miembro agregado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        }
    });
});

// Evento eliminar
document.querySelectorAll('.eliminar').forEach(boton => {
    agregarEventoEliminar(boton);
});

function agregarEventoEliminar(boton) {
    boton.addEventListener('click', () => {
        const fila = boton.closest('tr');

        Swal.fire({
            title: "¿Eliminar miembro?",
            text: "No podrás revertir esta acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                fila.remove();
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    });
}

document.querySelectorAll('.salir').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../admin/3-curso.html';
    });
});