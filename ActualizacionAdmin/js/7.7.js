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
                        <input id="swal-a" class="swal2-input" placeholder="NO" value="${celdas[1].textContent}">
                        <input id="swal-b" class="swal2-input" placeholder="Estudiante" value="${celdas[2].textContent}">
                        <input id="swal-c" class="swal2-input" placeholder="Matematicas" value="${celdas[3].textContent}">
                        <input id="swal-d" class="swal2-input" placeholder="Ingles" value="${celdas[4].textContent}">
                        <input id="swal-e" class="swal2-input" placeholder="Español" value="${celdas[5].textContent}">
                        <input id="swal-f" class="swal2-input" placeholder="Fisica" value="${celdas[6].textContent}">
                        <input id="swal-g" class="swal2-input" placeholder="Etica" value="${celdas[7].textContent}">
                    `,
                    showCancelButton: true,
                    confirmButtonText: "Guardar cambios",
                    cancelButtonText: "Cancelar",
                    preConfirm: () => {
                        return {
                            id: document.getElementById("swal-id").value,
                            a: document.getElementById("swal-a").value,
                            b: document.getElementById("swal-b").value,
                            c: document.getElementById("swal-c").value,
                            d: document.getElementById("swal-d").value,
                            e: document.getElementById("swal-e").value,
                            f: document.getElementById("swal-f").value,
                            g: document.getElementById("swal-g").value,
                        };
                    }
                }).then((resultado) => {
                    if (resultado.isConfirmed) {
                        let datos = resultado.value;
                        celdas[0].textContent = datos.id;
                        celdas[1].textContent = datos.a;
                        celdas[2].textContent = datos.b;
                        celdas[3].textContent = datos.c;
                        celdas[4].textContent = datos.d;
                        celdas[5].textContent = datos.e;
                        celdas[6].textContent = datos.f;
                        celdas[7].textContent = datos.g;
                    }
                });
            });
        }
    
        document.querySelectorAll(".modificar").forEach(boton => {
            agregarEventosFila(boton.closest("tr"));
        });
    });

    // boton de salir 
    document.querySelectorAll('.Salir').forEach(boton => {
        boton.addEventListener('click', function () {
            window.location.href = '../admin/7-planillas.html';
        });
    });