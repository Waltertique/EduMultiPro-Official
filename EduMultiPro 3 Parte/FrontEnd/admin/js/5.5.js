const anuncios = document.getElementById('anuncios');

    function mostrarFormulario() {
        Swal.fire({
            title: 'Crear Anuncio',
            html: `
                <input id="foto" class="swal2-input" placeholder="URL Foto Perfil">
                <input id="nombre" class="swal2-input" placeholder="Nombre">
                <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción"></textarea>
                <input type="file" id="archivo" class="swal2-file">
            `,
            showCancelButton: true,
            confirmButtonText: 'Publicar',
            cancelButtonText: 'Cancelar'
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                const foto = document.getElementById('foto').value;
                const nombre = document.getElementById('nombre').value;
                const descripcion = document.getElementById('descripcion').value;
                const archivoInput = document.getElementById('archivo');
                const archivo = archivoInput.files[0];

                if (!foto || !nombre) {
                    Swal.fire('Error', 'La foto y el nombre son obligatorios', 'error');
                    return;
                }

                const fecha = new Date().toLocaleString();

                const anuncio = document.createElement('div');
                anuncio.className = 'anuncio';
                anuncio.innerHTML = `
                    <div><img src="${foto}">${nombre} - <small>${fecha}</small></div>
                    <p>${descripcion}</p>
                    ${archivo ? `<a href="${URL.createObjectURL(archivo)}" target="_blank">Ver Archivo</a>` : ''}
                    <div class="acciones">
                        <button onclick="modificarAnuncio(this)">Modificar</button>
                        <button onclick="eliminarAnuncio(this)">Eliminar</button>
                        <button onclick="agregarComentario(this)">Comentar</button>
                    </div>
                    <div class="comentarios"></div>
                `;

                anuncios.prepend(anuncio);
            }
        });
    }

    function modificarAnuncio(btn) {
        const anuncio = btn.parentElement.parentElement;
        const fotoActual = anuncio.querySelector('img').src;
        const nombreActual = anuncio.querySelector('img').nextSibling.textContent.split(' - ')[0];
        const descripcionActual = anuncio.querySelector('p').innerText;
        const enlaceArchivo = anuncio.querySelector('a');

        Swal.fire({
            title: 'Modificar Anuncio',
            html: `
                <input id="foto" class="swal2-input" value="${fotoActual}">
                <input id="nombre" class="swal2-input" value="${nombreActual}">
                <textarea id="descripcion" class="swal2-textarea">${descripcionActual}</textarea>
                <input type="file" id="archivo" class="swal2-file">
            `,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                const foto = document.getElementById('foto').value;
                const nombre = document.getElementById('nombre').value;
                const descripcion = document.getElementById('descripcion').value;
                const archivoInput = document.getElementById('archivo');
                const archivo = archivoInput.files[0];

                anuncio.querySelector('img').src = foto;
                anuncio.querySelector('img').nextSibling.textContent = nombre + " - " + new Date().toLocaleString();
                anuncio.querySelector('p').innerText = descripcion;

                if (archivo) {
                    if (enlaceArchivo) {
                        enlaceArchivo.href = URL.createObjectURL(archivo);
                        enlaceArchivo.textContent = 'Ver Archivo';
                    } else {
                        const nuevoEnlace = document.createElement('a');
                        nuevoEnlace.href = URL.createObjectURL(archivo);
                        nuevoEnlace.target = "_blank";
                        nuevoEnlace.textContent = 'Ver Archivo';
                        anuncio.insertBefore(nuevoEnlace, anuncio.querySelector('.acciones'));
                    }
                }
            }
        });
    }

    function eliminarAnuncio(btn) {
        Swal.fire({
            title: "¿Eliminar Anuncio?",
            text: "No podrás revertir esta acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                btn.parentElement.parentElement.remove();
            }
        });
    }

    function agregarComentario(btn) {
        const comentarios = btn.parentElement.nextElementSibling;
        Swal.fire({
            title: 'Nuevo Comentario',
            html: `
                <input id="foto" class="swal2-input" placeholder="URL Foto Perfil">
                <input id="nombre" class="swal2-input" placeholder="Nombre">
                <textarea id="comentario" class="swal2-textarea" placeholder="Escribe tu comentario..."></textarea>
            `,
            showCancelButton: true,
            confirmButtonText: 'Publicar',
            cancelButtonText: 'Cancelar'
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                const foto = document.getElementById('foto').value;
                const nombre = document.getElementById('nombre').value;
                const comentarioTexto = document.getElementById('comentario').value;

                if (!foto || !nombre || !comentarioTexto) {
                    Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
                    return;
                }

                const fecha = new Date().toLocaleString();

                const comentario = document.createElement('div');
                comentario.className = 'comentario';
                comentario.innerHTML = `
                    <div><img src="${foto}">${nombre} - <small>${fecha}</small></div>
                    <p>${comentarioTexto}</p>
                    <button onclick="this.parentElement.remove()">Quitar</button>
                `;

                comentarios.appendChild(comentario);
            }
        });
    }

    document.querySelectorAll('#principal').forEach(boton => {
        boton.addEventListener('click', function () {
            window.location.href = '../admin/5.5aul.html';
        });
    });

    document.querySelectorAll('#trabajo').forEach(boton => {
        boton.addEventListener('click', function () {
            window.location.href = '../admin/5.6trabajo.html';
        });
    });

    document.querySelectorAll('#persona').forEach(boton => {
        boton.addEventListener('click', function () {
            window.location.href = '../admin/5.7persona.html';
        });
    });

    document.querySelectorAll('#nota').forEach(boton => {
        boton.addEventListener('click', function () {
            window.location.href = '../admin/5.8nota.html';
        });
    });