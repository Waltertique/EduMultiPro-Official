$(document).ready(function() {
    let tabla = $('#tablaUsuarios').DataTable({
        "paging": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.13.6/i18n/Spanish.json"
        }
    });
    
    // Funcionalidad para agregar un nuevo curso con datos ingresados
    $('#crearCurso').click(function() {
        let idCurso = prompt("Ingrese el ID del curso:");
        let nombreCurso = prompt("Ingrese el nombre del curso:");
        let gradoCurso = prompt("Ingrese el grado del curso:");
        
        if (idCurso && nombreCurso && gradoCurso) {
            let newRow = tabla.row.add([
                idCurso,
                nombreCurso,
                gradoCurso,
                '<button><i class="fa-solid fa-people-group"></i></button>',
                '<button class="btn-icon btn-modificar"><i class="fa-solid fa-gear"></i></button>',
                '<button class="btn-icon btn-eliminar"><i class="fa-solid fa-trash"></i></button>'
            ]).draw().node();
            
            // Agregar eventos a la nueva fila
            $(newRow).find('.btn-eliminar').on('click', function() {
                if (confirm("¿Seguro que deseas eliminar este curso?")) {
                    tabla.row($(this).parents('tr')).remove().draw();
                }
            });
            $(newRow).find('.btn-modificar').on('click', function() {
                let fila = tabla.row($(this).parents('tr'));
                let datos = fila.data();
                let nuevoID = prompt("Modificar ID:", datos[0]);
                let nuevoCurso = prompt("Modificar Curso:", datos[1]);
                let nuevoGrado = prompt("Modificar Grado:", datos[2]);
                if (nuevoID && nuevoCurso && nuevoGrado) {
                    fila.data([nuevoID, nuevoCurso, nuevoGrado, datos[3], datos[4], datos[5]]).draw();
                }
            });
        } else {
            alert("Debe ingresar todos los datos para crear el curso.");
        }
    });
    
    // Funcionalidad para eliminar una fila existente
    $('#tablaUsuarios tbody').on('click', '.btn-eliminar', function() {
        if (confirm("¿Seguro que deseas eliminar este curso?")) {
            tabla.row($(this).parents('tr')).remove().draw();
        }
    });
    
    // Funcionalidad para modificar una fila existente
    $('#tablaUsuarios tbody').on('click', '.btn-modificar', function() {
        let fila = tabla.row($(this).parents('tr'));
        let datos = fila.data();
        let nuevoID = prompt("Modificar ID:", datos[0]);
        let nuevoCurso = prompt("Modificar Curso:", datos[1]);
        let nuevoGrado = prompt("Modificar Grado:", datos[2]);
        if (nuevoID && nuevoCurso && nuevoGrado) {
            fila.data([nuevoID, nuevoCurso, nuevoGrado, datos[3], datos[4], datos[5]]).draw();
        }
    });
});