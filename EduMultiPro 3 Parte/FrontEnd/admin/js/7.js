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

    document.addEventListener("DOMContentLoaded", function () {
        function agregarEventosFila(fila) {
            fila.querySelector(".modificar").addEventListener("click", function () {
                let celdas = fila.querySelectorAll("td");
    
                Swal.fire({
                    title: "Editar datos",
                    html: `
                        <input id="swal-id" class="swal2-input" placeholder="ID" value="${celdas[0].textContent}">
                        <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${celdas[1].textContent}">
                        <input id="swal-segundo-nombre" class="swal2-input" placeholder="curso" value="${celdas[2].textContent}">
                        <input id="swal-apellido" class="swal2-input" placeholder="jornada" value="${celdas[3].textContent}">
                        <input id="swal-segundo-apellido" class="swal2-input" placeholder="periodo" value="${celdas[4].textContent}">
                    `,
                    showCancelButton: true,
                    confirmButtonText: "Guardar cambios",
                    cancelButtonText: "Cancelar",
                    preConfirm: () => {
                        return {
                            id: document.getElementById("swal-id").value,
                            nombre: document.getElementById("swal-nombre").value,
                            segundoNombre: document.getElementById("swal-segundo-nombre").value,
                            apellido: document.getElementById("swal-apellido").value,
                            segundoApellido: document.getElementById("swal-segundo-apellido").value
                        };
                    }
                }).then((resultado) => {
                    if (resultado.isConfirmed) {
                        let datos = resultado.value;
                        celdas[0].textContent = datos.id;
                        celdas[1].textContent = datos.nombre;
                        celdas[2].textContent = datos.segundoNombre;
                        celdas[3].textContent = datos.apellido;
                        celdas[4].textContent = datos.segundoApellido;
                    }
                });
            });
    
            fila.querySelector(".eliminar").addEventListener("click", function () {
                Swal.fire({
                    title: "¿Eliminar Planilla?",
                    text: "No podrás revertir esta acción.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "Cancelar"
                }).then((resultado) => {
                    if (resultado.isConfirmed) {
                        fila.remove();
                    }
                });
            });
        }
    
        document.querySelectorAll(".modificar").forEach(boton => {
            agregarEventosFila(boton.closest("tr"));
        });
    
        document.querySelector(".crear").addEventListener("click", function () {
            Swal.fire({
                title: "Crear Nueva Planilla",
                html: `
                    <input id="swal-id" class="swal2-input" placeholder="ID">
                    <input id="swal-nombre" class="swal2-input" placeholder="Nombre">
                    <input id="swal-segundo-nombre" class="swal2-input" placeholder="Curso">
                    <input id="swal-apellido" class="swal2-input" placeholder="Jornada">
                    <input id="swal-segundo-apellido" class="swal2-input" placeholder="Periodo">
                `,
                showCancelButton: true,
                confirmButtonText: "Agregar",
                cancelButtonText: "Cancelar",
                preConfirm: () => {
                    let id = document.getElementById("swal-id").value;
                    let nombre = document.getElementById("swal-nombre").value;
                    let segundoNombre = document.getElementById("swal-segundo-nombre").value;
                    let apellido = document.getElementById("swal-apellido").value;
                    let segundoApellido = document.getElementById("swal-segundo-apellido").value;
                    if (!id || !nombre || !apellido) {
                        Swal.showValidationMessage("Los campos Identificación, Nombre y Apellido son obligatorios");
                        return false;
                    }
                    return { id, nombre, segundoNombre, apellido, segundoApellido };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    let nuevaFila = document.createElement("tr");
                    nuevaFila.innerHTML = `
                        <td>${result.value.id}</td>
                        <td>${result.value.nombre}</td>
                        <td>${result.value.segundoNombre || ''}</td>
                        <td>${result.value.apellido}</td>
                        <td>${result.value.segundoApellido || ''}</td>
                        <td><button><i class="fa-solid fa-circle-info"></i></button></td>
                        <td><button class="btn-icon modificar"><i class="fa-solid fa-gear"></i></button></td>
                        <td><button class="btn-icon eliminar"><i class="fa-solid fa-trash"></i></button></td>
                    `;
                    document.querySelector("table tbody").appendChild(nuevaFila);
                    agregarEventosFila(nuevaFila);
                    Swal.fire({
                        icon: "success",
                        title: "Planilla Agregado",
                        text: `La Planilla ${result.value.id} ha sido agregado exitosamente.`,
                        confirmButtonText: "OK"
                    });
                }
            });
        });
    });
    document.querySelectorAll('.info').forEach(boton => {
        boton.addEventListener('click', function () {
            window.location.href = '../admin/7.7plant.html';
        });
    });