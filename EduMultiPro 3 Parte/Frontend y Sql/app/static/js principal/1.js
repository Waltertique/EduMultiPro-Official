document.querySelector('.btn-ingresar').addEventListener('click', function (event) {
    event.preventDefault(); 
    const usuario = document.getElementById('usuario').value.trim();
    const contraseña = document.getElementById('password').value.trim();

    // Validaciones básicas
    if (usuario === '' || contraseña === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos antes de continuar.',
            confirmButtonText: 'Aceptar',
        });
        return;
    }

    // Validar un correo específico y contraseña
    if (usuario === 'profesor99' && contraseña === '12345') {
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido Administrador.',
            confirmButtonText: 'Ingresar',
        }).then(() => {
            // Redirigir a otra página
            window.location.href = '../Profesor/1-principalProfesor.html'; 
        });
    } 
    else if (usuario === 'alumno99' && contraseña === '12345') {
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido Administrador.',
            confirmButtonText: 'Ingresar',
        }).then(() => {
            // Redirigir a otra página
            window.location.href = '../Estudiante/1-principalAlumno.html'; 
        });
    }
    else if (usuario === 'coordinador99' && contraseña === '12345') {
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido Administrador.',
            confirmButtonText: 'Ingresar',
        }).then(() => {
            // Redirigir a otra página
            window.location.href = '../Coordinador/1-inicio.html'; 
        });
    }
    else if (usuario === 'admin99' && contraseña === '12345') {
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido Administrador.',
            confirmButtonText: 'Ingresar',
        }).then(() => {
            // Redirigir a otra página
            window.location.href = '../admin/2-usuario.html'; 
        });
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Credenciales incorrectas',
            text: 'El correo o la contraseña no son válidos. Inténtalo nuevamente.',
            confirmButtonText: 'Reintentar',
        });
    }
});