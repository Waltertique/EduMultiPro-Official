document.getElementById('crear').addEventListener('click', function () {
    const titulo = document.getElementById('titulo-sidebar').value;
    const descripcion = document.getElementById('desc-sidebar').value;
    const puntos = document.getElementById('puntos').value;
    const fecha = document.getElementById('fecha').value;
    const tema = document.getElementById('tema').value;
    const cerrar = document.getElementById('cerrar').value;

    if (titulo && descripcion && puntos && fecha && tema) {
        const tareasContainer = document.getElementById('tareas-creadas');
        const nuevaCol = document.createElement('div');
        nuevaCol.classList.add('col');

        const nuevaTarea = document.createElement('div');
        nuevaTarea.classList.add('tarea-item');
        nuevaTarea.innerHTML = `
            <h5>${titulo}</h5>
            <p><strong>Descripción:</strong> ${descripcion}</p>
            <p><strong>Puntos:</strong> ${puntos}</p>
            <p><strong>Fecha de Entrega:</strong> ${fecha}</p>
            <p><strong>Tema:</strong> ${tema}</p>
            <p><strong>Cerrar después de fecha límite:</strong> ${cerrar}</p>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-warning editar">Editar</button>
                <button class="btn btn-sm btn-danger eliminar">Eliminar</button>
                <button class="btn btn-sm btn-info text-white ver">Ver</button>
            </div>
        `;

        nuevaTarea.querySelector('.eliminar').addEventListener('click', () => {
            Swal.fire({
                title: '¿Seguro que quieres eliminar esta tarea?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6'
            }).then(result => {
                if (result.isConfirmed) {
                    nuevaCol.remove();
                    Swal.fire('Eliminado', 'La tarea ha sido eliminada.', 'success');
                }
            });
        });

        nuevaTarea.querySelector('.editar').addEventListener('click', () => {
            Swal.fire({
                title: '¿Deseas editar esta tarea?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí, editar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#f0ad4e',
                cancelButtonColor: '#3085d6'
            }).then(result => {
                if (result.isConfirmed) {
                    document.getElementById('titulo-sidebar').value = titulo;
                    document.getElementById('desc-sidebar').value = descripcion;
                    document.getElementById('puntos').value = puntos;
                    document.getElementById('fecha').value = fecha;
                    document.getElementById('tema').value = tema;
                    document.getElementById('cerrar').value = cerrar;
                    nuevaCol.remove();
                    Swal.fire('Listo', 'Ahora puedes modificar la tarea.', 'info');
                }
            });
        });

        nuevaTarea.querySelector('.ver').addEventListener('click', () => {
            Swal.fire({
                title: `Tarea: ${titulo}`,
                html: `
                    <p><strong>Descripción:</strong> ${descripcion}</p>
                    <p><strong>Puntos:</strong> ${puntos}</p>
                    <p><strong>Fecha de Entrega:</strong> ${fecha}</p>
                    <p><strong>Tema:</strong> ${tema}</p>
                    <p><strong>Cerrar después de fecha límite:</strong> ${cerrar}</p>
                `,
                icon: 'info'
            });
        });

        nuevaCol.appendChild(nuevaTarea);
        tareasContainer.appendChild(nuevaCol);

        document.getElementById('titulo-sidebar').value = '';
        document.getElementById('desc-sidebar').value = '';
        document.getElementById('puntos').value = '';
        document.getElementById('fecha').value = '';
        document.getElementById('tema').value = '';
        document.getElementById('cerrar').value = '';
    } else {
        Swal.fire('Completa todos los campos', '', 'warning');
    }
});

document.getElementById('salir-sidebar').addEventListener('click', function () {
    Swal.fire({
        title: '¿Estás seguro de que quieres salir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '../PROFESOR/7-listaTrabajo.html';
        }
    });
});