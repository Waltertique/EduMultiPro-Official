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


// menu secundario
document.querySelectorAll('.principal').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../Profesor/6-trabajo.html';
    });
});
document.querySelectorAll('.trabajos').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../PROFESOR/7-listaTrabajo.html';
    });
});
document.querySelectorAll('.persona').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../PROFESOR/9-personas.html';
    });
});
document.querySelectorAll('.notas').forEach(boton => {
    boton.addEventListener('click', function () {
        window.location.href = '../PROFESOR/10-notas.html';
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

    document.addEventListener("DOMContentLoaded", function () {
        function agregarEventosFila(fila) {
            fila.querySelector(".modificar").addEventListener("click", function () {
                let celdas = fila.querySelectorAll("td");
    
                Swal.fire({
                    title: "Editar datos",
                    html: `
                        <input id="swal-a" class="swal2-input" placeholder="NO" value="${celdas[0].textContent}">
                        <input id="swal-b" class="swal2-input" placeholder="Trabajos" value="${celdas[1].textContent}">
                        <input id="swal-c" class="swal2-input" placeholder="Fecha de Asignacion" value="${celdas[2].textContent}">
                        <input id="swal-d" class="swal2-input" placeholder="Fecha de Entrega" value="${celdas[3].textContent}">
                        <input id="swal-e" class="swal2-input" placeholder="Puntos" value="${celdas[4].textContent}">
                        <input id="swal-f" class="swal2-input" placeholder="Periodo" value="${celdas[5].textContent}">
                    `,
                    showCancelButton: true,
                    confirmButtonText: "Guardar cambios",
                    cancelButtonText: "Cancelar",
                    preConfirm: () => {
                        return {
                            a: document.getElementById("swal-a").value,
                            b: document.getElementById("swal-b").value,
                            c: document.getElementById("swal-c").value,
                            d: document.getElementById("swal-d").value,
                            e: document.getElementById("swal-e").value,
                            f: document.getElementById("swal-f").value
                        };
                    }
                }).then((resultado) => {
                    if (resultado.isConfirmed) {
                        let datos = resultado.value;
                        celdas[0].textContent = datos.a;
                        celdas[1].textContent = datos.b;
                        celdas[2].textContent = datos.c;
                        celdas[3].textContent = datos.d;
                        celdas[4].textContent = datos.e;
                        celdas[5].textContent = datos.f;
                    }
                });
            });
    
            fila.querySelector(".eliminar").addEventListener("click", function () {
                Swal.fire({
                    title: "¿Eliminar Trabajo?",
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
                title: "Crear Nuevo Trabajo",
                html: `
                    <input id="swal-id" class="swal2-input" placeholder="NO">
                    <input id="swal-b" class="swal2-input" placeholder="Trabajos">
                    <input id="swal-c" class="swal2-input" placeholder="Fecha de Asignacion">
                    <input id="swal-d" class="swal2-input" placeholder="Fecha de Entrega">
                    <input id="swal-e" class="swal2-input" placeholder="Puntos">
                    <input id="swal-f" class="swal2-input" placeholder="Periodo">
                `,
                showCancelButton: true,
                confirmButtonText: "Agregar",
                cancelButtonText: "Cancelar",
                preConfirm: () => {
                    let a = document.getElementById("swal-id").value;
                    let b = document.getElementById("swal-b").value;
                    let c = document.getElementById("swal-c").value;
                    let d = document.getElementById("swal-d").value;
                    let e = document.getElementById("swal-e").value;
                    let f = document.getElementById("swal-f").value;
                    if (!b || !c || !d || !e || !f) {
                        Swal.showValidationMessage("Los campos Identificación, son obligatorios");
                        return false;
                    }
                    return { a, b, c, d, e, f};
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    let nuevaFila = document.createElement("tr");
                    nuevaFila.innerHTML = `
                        <td>${result.value.a}</td>
                        <td>${result.value.b}</td>
                        <td>${result.value.c || ''}</td>
                        <td>${result.value.d}</td>
                        <td>${result.value.e || ''}</td>
                        <td>${result.value.f || ''}</td>
                        <td><button class="info"><i class="fa-solid fa-circle-info"></i></button></td>
                        <td><button class="modificar"><i class="fa-solid fa-gear"></i></button></td>
                        <td><button class="eliminar"><i class="fa-solid fa-trash"></i></button></td>
                    `;
                    document.querySelector("table tbody").appendChild(nuevaFila);
                    agregarEventosFila(nuevaFila);
                    Swal.fire({
                        icon: "success",
                        title: "Trabajo Agregado",
                        text: `el Trabajo ${result.value.b} ha sido agregado exitosamente.`,
                        confirmButtonText: "OK"
                    });
                }
            });
        });
    });

    // boton de ir a crear tarea 
    document.querySelectorAll('.info').forEach(boton => {
        boton.addEventListener('click', function () {
            window.location.href = '../PROFESOR/8-crearTarea.html';
        });
    });


