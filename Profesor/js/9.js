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
document.querySelectorAll('.Principal').forEach(boton => {
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
                        <input id="swal-a" class="swal2-input" placeholder="ID" value="${celdas[0].textContent}">
                        <input id="swal-b" class="swal2-input" placeholder="NO" value="${celdas[1].textContent}">
                        <input id="swal-c" class="swal2-input" placeholder="Primer Nombre" value="${celdas[2].textContent}">
                        <input id="swal-d" class="swal2-input" placeholder="Primer Apellido" value="${celdas[3].textContent}">
                        <input id="swal-e" class="swal2-input" placeholder="Correo" value="${celdas[4].textContent}">
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
                    <input id="swal-a" class="swal2-input" placeholder="ID">
                    <input id="swal-b" class="swal2-input" placeholder="NO">
                    <input id="swal-c" class="swal2-input" placeholder="Primer Nombre">
                    <input id="swal-d" class="swal2-input" placeholder="Primer Apellido">
                    <input id="swal-e" class="swal2-input" placeholder="Correo">
                `,
                showCancelButton: true,
                confirmButtonText: "Agregar",
                cancelButtonText: "Cancelar",
                preConfirm: () => {
                    let a = document.getElementById("swal-a").value;
                    let b = document.getElementById("swal-b").value;
                    let c = document.getElementById("swal-c").value;
                    let d = document.getElementById("swal-d").value;
                    let e = document.getElementById("swal-e").value;
                    if (!b || !c || !d || !e) {
                        Swal.showValidationMessage("Los campos Identificación, son obligatorios");
                        return false;
                    }
                    return { a, b, c, d, e};
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
                        <td><button class="btn-icon modificar"><i class="fa-solid fa-gear"></i></button></td>
                    `;
                    document.querySelector("table tbody").appendChild(nuevaFila);
                    agregarEventosFila(nuevaFila);
                    Swal.fire({
                        icon: "success",
                        title: "Persona Agregada",
                        text: `la Persona ${result.value.b} ha sido agregada exitosamente.`,
                        confirmButtonText: "OK"
                    });
                }
            });
        });
    });

