document.addEventListener('DOMContentLoaded', function() {
    // Inicializar DataTable
    $('#tablaNotas').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
        }
    });

    // Manejar el envío del formulario para crear/actualizar notas
    $('#nota-form').on('submit', function(e) {
        e.preventDefault();
        
        const formData = $(this).serialize();
        const url = $(this).attr('action');
        const method = $('#nota-id').val() ? '/profesor/actualizar_nota' : url;
        
        $.ajax({
            url: method === url ? url : '/profesor/actualizar_nota',
            type: 'POST',
            data: formData,
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        title: 'Éxito',
                        text: response.message,
                        icon: 'success'
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.message,
                        icon: 'error'
                    });
                }
            },
            error: function(xhr) {
                Swal.fire({
                    title: 'Error',
                    text: xhr.responseJSON?.message || 'Error al procesar la solicitud',
                    icon: 'error'
                });
            }
        });
    });

    // Manejar clic en botón Modificar
    $(document).on('click', '.modificar-nota', function() {
        const id = $(this).data('id');
        
        $.get(`/profesor/obtener_nota/${id}`, function(response) {
            if (response.success) {
                const nota = response.data;
                $('#nota-id').val(nota.id);
                $('#usuario_id').val(nota.usuario_id);
                $('#trabajo_id').val(nota.trabajo_id);
                $('#nota').val(nota.nota);
                $('#form-title').text('Editar Nota');
                
                // Desplazar hasta el formulario
                $('html, body').animate({
                    scrollTop: $('#nota-form').offset().top - 100
                }, 500);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: response.message,
                    icon: 'error'
                });
            }
        }).fail(function(xhr) {
            Swal.fire({
                title: 'Error',
                text: xhr.responseJSON?.message || 'Error al obtener la nota',
                icon: 'error'
            });
        });
    });

    // Manejar clic en botón Eliminar
    $(document).on('click', '.eliminar-nota', function() {
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
                $.ajax({
                    url: `/profesor/eliminar_nota/${id}`,
                    type: 'POST',
                    success: function(response) {
                        if (response.success) {
                            Swal.fire(
                                '¡Eliminado!',
                                response.message,
                                'success'
                            ).then(() => {
                                location.reload();
                            });
                        } else {
                            Swal.fire(
                                'Error',
                                response.message,
                                'error'
                            );
                        }
                    },
                    error: function(xhr) {
                        Swal.fire(
                            'Error',
                            xhr.responseJSON?.message || 'Error al eliminar la nota',
                            'error'
                        );
                    }
                });
            }
        });
    });

    // Botón para limpiar el formulario y agregar nueva nota
    $('.btn-agregar-nueva').on('click', function() {
        $('#nota-id').val('');
        $('#nota-form')[0].reset();
        $('#form-title').text('Agregar Nueva Nota');
    });
});