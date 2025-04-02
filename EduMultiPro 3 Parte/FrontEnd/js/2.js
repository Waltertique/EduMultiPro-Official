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
        document.querySelectorAll(".modificar").forEach(boton => {
            boton.addEventListener("click", function () {
                let fila = this.closest("tr");
                let celdas = fila.querySelectorAll("td");
    
                Swal.fire({
                    title: "¿Quieres modificar esta fila?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Sí, modificar",
                    cancelButtonText: "Cancelar"
                }).then((resultado) => {
                    if (resultado.isConfirmed) {
                        Swal.fire({
                            title: "Editar datos",
                            html: `
                                <input id="swal-nombre" class="swal2-input" value="${celdas[1].textContent}">
                                <input id="swal-curso" class="swal2-input" value="${celdas[2].textContent}">
                                <input id="swal-jornada" class="swal2-input" value="${celdas[3].textContent}">
                                <input id="swal-periodo" class="swal2-input" value="${celdas[4].textContent}">
                            `,
                            showCancelButton: true,
                            confirmButtonText: "Guardar cambios",
                            cancelButtonText: "Cancelar",
                            preConfirm: () => {
                                return {
                                    nombre: document.getElementById("swal-nombre").value,
                                    curso: document.getElementById("swal-curso").value,
                                    jornada: document.getElementById("swal-jornada").value,
                                    periodo: document.getElementById("swal-periodo").value
                                };
                            }
                        }).then((resultado) => {
                            if (resultado.isConfirmed) {
                                let datos = resultado.value;
                                if (datos.nombre && datos.curso && datos.jornada && datos.periodo) {
                                    celdas[1].textContent = datos.nombre;
                                    celdas[2].textContent = datos.curso;
                                    celdas[3].textContent = datos.jornada;
                                    celdas[4].textContent = datos.periodo;
    
                                    Swal.fire({
                                        icon: "success",
                                        title: "¡Datos actualizados!",
                                        text: "La fila ha sido modificada correctamente.",
                                        confirmButtonText: "OK"
                                    });
                                } else {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Error",
                                        text: "Todos los campos deben estar llenos.",
                                        confirmButtonText: "OK"
                                    });
                                }
                            }
                        });
                    }
                });
            });
        });
    
        document.querySelectorAll(".eliminar").forEach(boton => {
            boton.addEventListener("click", function () {
                let fila = this.closest("tr");
    
                Swal.fire({
                    title: "¿Estás seguro?",
                    text: "No podrás revertir esta acción.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "Cancelar"
                }).then((resultado) => {
                    if (resultado.isConfirmed) {
                        fila.remove();
                        Swal.fire({
                            icon: "success",
                            title: "Eliminado",
                            text: "La fila ha sido eliminada.",
                            confirmButtonText: "OK"
                        });
                    }
                });
            });
        });
    });