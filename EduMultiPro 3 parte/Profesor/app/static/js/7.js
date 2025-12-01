document.addEventListener('DOMContentLoaded', function() {
    // Inicializar DataTable para la tabla de trabajos
    $('#tablatrabajos').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
        }
    });

    // Manejar clic en botón Eliminar
    $(document).on('click', '.eliminar-trabajo', function(e) {
        e.preventDefault();
        const id = $(this).data('id');
        
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Crear un formulario dinámico para enviar la solicitud POST
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = `/profesor/eliminar-trabajo/${id}`;
                
                // Agregar el token CSRF si estás usando Flask-WTF
                const csrfToken = document.createElement('input');
                csrfToken.type = 'hidden';
                csrfToken.name = 'csrf_token';
                csrfToken.value = '{{ csrf_token() }}';
                form.appendChild(csrfToken);
                
                document.body.appendChild(form);
                form.submit();
            }
        });
    });

    // Manejar clic en botón Editar
    $(document).on('click', '.modificar-trabajo', function() {
        const id = $(this).data('id');
        // Redirigir a la página de edición
        window.location.href = `/profesor/editar-trabajo/${id}`;
    });

    // Configurar el formulario para subir archivos
    $('#trabajo-form').on('submit', function(e) {
        // Validación básica del formulario
        const titulo = $('#titulo').val();
        const fecha = $('#fecha').val();
        
        if (!titulo || !fecha) {
            e.preventDefault();
            Swal.fire({
                title: 'Error',
                text: 'Por favor complete todos los campos requeridos',
                icon: 'error'
            });
        }
    });

    // Mostrar confirmación al enviar el formulario
    $('form').on('submit', function(e) {
        const form = this;
        e.preventDefault();
        
        Swal.fire({
            title: '¿Guardar cambios?',
            text: "¿Estás seguro de que deseas guardar este trabajo?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                form.submit();
            }
        });
    });

    // Manejar la visualización de archivos
    $(document).on('click', 'a[href*="uploads/"]', function(e) {
        e.preventDefault();
        const fileUrl = $(this).attr('href');
        
        Swal.fire({
            title: 'Descargar archivo',
            text: '¿Deseas descargar este archivo?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Descargar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.open(fileUrl, '_blank');
            }
        });
    });
});