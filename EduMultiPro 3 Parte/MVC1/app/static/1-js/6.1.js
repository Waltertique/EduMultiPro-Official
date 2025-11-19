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

document.querySelectorAll('.mostrarEntregado').forEach(boton => {
    boton.addEventListener('click', () => {
        const nombre = boton.dataset.nombre;
        const nota = boton.dataset.nota;
        const fecha = boton.dataset.fecha;
        const archivos = JSON.parse(boton.dataset.archivos || '[]');
        const trabajoEntregadoId = boton.dataset.id;  // NUEVO: obtener el id de la entrega

        document.getElementById('nombreAlumno').textContent = nombre;
        document.getElementById('notaAlumno').textContent = nota && nota !== "None" ? nota : "No asignada";
        document.getElementById('fechaEntrega').textContent = fecha ? fecha : "Sin fecha";

        // Cargar la nota en el input para modificarla
        document.getElementById('inputNota').value = (nota && nota !== "None") ? nota : "";

        // Poner el id en el campo hidden del formulario
        document.getElementById('trabajoEntregadoId').value = trabajoEntregadoId;

        const listaArchivos = document.getElementById('listaArchivos');
        listaArchivos.innerHTML = '';

        if (archivos.length > 0) {
            archivos.forEach((archivo, i) => {
                const div = document.createElement('div');
                div.className = 'archivo1';
                const link = document.createElement('a');
                link.href = archivo.ruta;
                link.textContent = archivo.nombre || `Archivo ${i + 1}`;
                link.target = '_blank';
                div.appendChild(link);
                listaArchivos.appendChild(div);
            });
        } else {
            const div = document.createElement('div');
            div.className = 'archivo1';
            div.textContent = 'No hay archivos entregados.';
            listaArchivos.appendChild(div);
        }

        document.getElementById('trabajosEntregados').style.display = 'block';
    });
});

document.getElementById('salir1').addEventListener('click', () => {
    document.getElementById('trabajosEntregados').style.display = 'none';
});