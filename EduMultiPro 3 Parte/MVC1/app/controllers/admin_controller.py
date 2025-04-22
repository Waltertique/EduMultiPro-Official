from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app
from flask import jsonify
from werkzeug.utils import secure_filename
import os
from werkzeug.security import generate_password_hash, check_password_hash

admin_bp = Blueprint('admin_bp', __name__, url_prefix='/admin')

# rutas --------------------------------------------------------------------- rutas

@admin_bp.route('/login')
def login():
    return render_template('1-login.html')


@admin_bp.route('/2-usuario')
def usuario():
    connection = current_app.connection
    usuarios = []
    try:
        print("Conectando a la base de datos...")  # Verifica si la conexión está funcionando
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT ID, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido
                FROM Usuario
            """)
            usuarios = cursor.fetchall()  # Devuelve todos los usuarios como una lista de tuplas
            print("Usuarios obtenidos:", usuarios)  # Esto imprimirá los resultados
    except Exception as e:
        flash(f'Error al obtener usuarios: {str(e)}', 'danger')
    
    return render_template('admin/2-usuario.html', usuarios=usuarios)

@admin_bp.route('/eliminar-usuario/<string:id>', methods=['POST'])
def eliminar_usuario(id):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            # Eliminar usuario por ID
            cursor.execute("""
                DELETE FROM Usuario WHERE ID = %s
            """, (id,))
            
        connection.commit()
        flash('Usuario eliminado correctamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al eliminar usuario: {str(e)}', 'danger')
    
    return redirect(url_for('admin_bp.usuario'))

# ------------Horario-----------------------------------------------------------------------------

@admin_bp.route('/4-horario')
def horario():
    connection = current_app.connection
    horarios = []
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT 
                    H.ID, 
                    H.Titulo_Horario, 
                    C.Curso_Nombre, 
                    J.Jornada_Nombre,
                    CONCAT(U.Primer_Nombre, ' ', U.Primer_Apellido) AS Profesor_Nombre
                FROM Horario H
                LEFT JOIN Horario_Curso HC ON HC.horario_id = H.ID
                LEFT JOIN Curso C ON HC.curso_id = C.ID
                LEFT JOIN Jornada J ON C.jornada_id = J.ID
                LEFT JOIN Usuario U ON HC.profesor_id = U.ID
            """)
            horarios = cursor.fetchall()
    except Exception as e:
        flash(f'Error al obtener horarios: {str(e)}', 'danger')

    return render_template('admin/4-horario.html', horarios=horarios)

@admin_bp.route('/eliminar_horario/<string:id>', methods=['POST'])
def eliminar_horario(id):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            # Eliminar horario por ID
            cursor.execute("""
                DELETE FROM Horario WHERE ID = %s
            """, (id,))
            
        connection.commit()
        flash('Horario eliminado correctamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al eliminar Horario: {str(e)}', 'danger')
    
    return redirect(url_for('admin_bp.horario'))

# ------------notas-----------------------------------------------------------------------------

@admin_bp.route('/6-notas')
def notas():
    return render_template('admin/6-notas.html')

@admin_bp.route('/7-planillas')
def planillas():
    return render_template('admin/7-planillas.html')

@admin_bp.route('/8-noticia')
def noticia():
    connection = current_app.connection
    noticias = []
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT n.ID, n.Titulo_Noticia, t.Tipo
                FROM Noticia n
                INNER JOIN Tipo_Noticia t ON n.tipo_noticia_id = t.ID
            """)
            noticias = cursor.fetchall()
    except Exception as e:
        flash(f'Error al obtener noticias: {str(e)}', 'danger')
    
    return render_template('admin/8-noticia.html', noticias=noticias)


# crear usuario --------------------------------------------------------------------- crear usuario

@admin_bp.route('/2.3usu')
def crearUsuario():
    connection = current_app.connection
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM Rol")
        roles = cursor.fetchall()

        cursor.execute("SELECT * FROM Documento")
        documentos = cursor.fetchall()

    return render_template('admin/2.3usu.html', roles=roles, documentos=documentos)


@admin_bp.route('/guardar_usuario', methods=['POST'])
def guardar_usuario():
    connection = current_app.connection

    # Datos del formulario
    id = request.form['id']
    primer_nombre = request.form['primer_nombre']
    segundo_nombre = request.form.get('segundo_nombre', '')
    primer_apellido = request.form['primer_apellido']
    segundo_apellido = request.form.get('segundo_apellido', '')
    correo1 = request.form['correo1']
    contraseña = request.form['contraseña']
    rol_id = request.form['rol_id']
    documento_id = request.form['documento_id']

    correo2 = request.form.get('correo2', '')
    contacto1 = request.form['contacto1']
    contacto2 = request.form.get('contacto2', '')
    fecha_nacimiento = request.form['fecha_nacimiento']

    # Manejo de la foto
    foto = request.files.get('foto')
    ruta_foto = None

    if foto and foto.filename != '':
        filename = secure_filename(foto.filename)

        # Asegurar carpeta static/fotos
        ruta_carpeta_fotos = os.path.join(current_app.root_path, 'static', 'fotos')
        os.makedirs(ruta_carpeta_fotos, exist_ok=True)

        ruta_foto = f'fotos/{filename}'
        ruta_completa = os.path.join(ruta_carpeta_fotos, filename)
        foto.save(ruta_completa)

    # Encriptar la contraseña antes de guardarla
    contraseña_encriptada = generate_password_hash(contraseña)

    try:
        with connection.cursor() as cursor:
            # Insertar en Usuario con contraseña encriptada
            cursor.execute(""" 
                INSERT INTO Usuario (ID, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Correo1, Contraseña, rol_id, documento_id)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo1, contraseña_encriptada, rol_id, documento_id))

            # Insertar en Informacion, ya no es necesario especificar el ID
            cursor.execute(""" 
                INSERT INTO Informacion (Correo2, Contacto1, Contacto2, Fecha_Nacimiento, RutaFoto, usuario_id)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (correo2, contacto1, contacto2, fecha_nacimiento, ruta_foto, id))

        # Confirmar los cambios
        connection.commit()
        flash('Usuario creado correctamente', 'success')
    except Exception as e:
        # Si ocurre un error, hacer rollback y mostrar mensaje
        connection.rollback()
        flash(f'Error al crear usuario: {str(e)}', 'danger')
        print(f"Error al guardar el usuario: {str(e)}")  # Esto imprimirá el error en la consola del servidor para depurar

    return redirect(url_for('admin_bp.usuario'))

# ver usuario ----------------------------

@admin_bp.route('/2.4verUsuario', methods=['GET'])
def informacion_usuario():
    usuario_id = request.args.get('usuario_id')

    connection = current_app.connection
    with connection.cursor() as cursor:
        # Obtener datos del usuario
        cursor.execute("""
            SELECT u.ID, d.Tipo_Documento AS Documento, u.Primer_Nombre, u.Segundo_Nombre, 
                u.Primer_Apellido, u.Segundo_Apellido, u.Correo1, r.Nombre_Rol AS Rol, 
                i.Correo2, i.Contacto1, i.Contacto2, i.Fecha_Nacimiento, i.RutaFoto
            FROM Usuario u
            LEFT JOIN Informacion i ON u.ID = i.usuario_id
            LEFT JOIN Documento d ON u.documento_id = d.ID
            LEFT JOIN Rol r ON u.rol_id = r.ID
            WHERE u.ID = %s
        """, (usuario_id,))
        
        # Obtener los datos del usuario
        datos = cursor.fetchone()

        # Obtener los roles
        cursor.execute("SELECT * FROM Rol")
        roles = cursor.fetchall()

        # Obtener los documentos
        cursor.execute("SELECT * FROM Documento")
        documentos = cursor.fetchall()

    return render_template('admin/2.4verUsuario.html', usuario=datos, roles=roles, documentos=documentos)

@admin_bp.route('/actualizar_usuario', methods=['GET', 'POST'])
def actualizar_usuario():
    if request.method == 'GET':
        usuario_id = request.args.get('usuario_id')
        connection = current_app.connection

        with connection.cursor() as cursor:
            # Obtener usuario con información adicional
            cursor.execute("""
                SELECT u.ID, u.documento_id, u.Primer_Nombre, u.Segundo_Nombre, u.Primer_Apellido, 
                       u.Segundo_Apellido, u.Correo1, u.rol_id, 
                       i.Correo2, i.Contacto1, i.Contacto2, i.Fecha_Nacimiento, i.RutaFoto
                FROM Usuario u
                LEFT JOIN Informacion i ON u.ID = i.usuario_id
                WHERE u.ID = %s
            """, (usuario_id,))
            usuario = cursor.fetchone()

            # Formatear fecha
            if usuario and usuario['Fecha_Nacimiento']:
                usuario['Fecha_Nacimiento'] = usuario['Fecha_Nacimiento'].strftime('%Y-%m-%d')

            # Obtener roles y documentos
            cursor.execute("SELECT ID, Nombre_Rol FROM Rol")
            roles = cursor.fetchall()

            cursor.execute("SELECT ID, Tipo_Documento FROM Documento")
            documentos = cursor.fetchall()

        return render_template('admin/actualizar_usuario.html', usuario=usuario, documentos=documentos, roles=roles)

    # POST: Guardar cambios
    if request.method == 'POST':
        usuario_id = request.form['usuario_id']
        documento_id = request.form.get('documento_id')
        Primer_Nombre = request.form.get('Primer_Nombre')
        Segundo_Nombre = request.form.get('Segundo_Nombre')
        Primer_Apellido = request.form.get('Primer_Apellido')
        Segundo_Apellido = request.form.get('Segundo_Apellido')
        Correo1 = request.form.get('Correo1')
        rol_id = request.form.get('rol_id')
        Correo2 = request.form.get('Correo2')
        Contacto1 = request.form.get('Contacto1')
        Contacto2 = request.form.get('Contacto2')
        Fecha_Nacimiento = request.form.get('Fecha_Nacimiento')

        foto = request.files.get('RutaFoto')
        nombre_foto = None
        if foto and foto.filename != '':
            nombre_foto = secure_filename(foto.filename)
            ruta = os.path.join(current_app.root_path, 'static/fotos', nombre_foto)
            foto.save(ruta)

        nueva_contraseña = request.form.get('Contraseña')
        if nueva_contraseña:
            Contraseña = generate_password_hash(nueva_contraseña)
        else:
            Contraseña = None

        conexion = current_app.connection.cursor()

        # Actualizar tabla Usuario
        if Primer_Nombre:
            conexion.execute("""UPDATE Usuario SET Primer_Nombre=%s WHERE ID=%s""", (Primer_Nombre, usuario_id))
        if Segundo_Nombre:
            conexion.execute("""UPDATE Usuario SET Segundo_Nombre=%s WHERE ID=%s""", (Segundo_Nombre, usuario_id))
        if Primer_Apellido:
            conexion.execute("""UPDATE Usuario SET Primer_Apellido=%s WHERE ID=%s""", (Primer_Apellido, usuario_id))
        if Segundo_Apellido:
            conexion.execute("""UPDATE Usuario SET Segundo_Apellido=%s WHERE ID=%s""", (Segundo_Apellido, usuario_id))
        if Correo1:
            conexion.execute("""UPDATE Usuario SET Correo1=%s WHERE ID=%s""", (Correo1, usuario_id))
        if rol_id:
            conexion.execute("""UPDATE Usuario SET rol_id=%s WHERE ID=%s""", (rol_id, usuario_id))
        if documento_id:
            conexion.execute("""UPDATE Usuario SET documento_id=%s WHERE ID=%s""", (documento_id, usuario_id))

        # Actualizar tabla Informacion
        conexion.execute("SELECT ID FROM Informacion WHERE usuario_id=%s", (usuario_id,))
        info = conexion.fetchone()

        if info:
            if Correo2:
                conexion.execute("""UPDATE Informacion SET Correo2=%s WHERE usuario_id=%s""", (Correo2, usuario_id))
            if Contacto1:
                conexion.execute("""UPDATE Informacion SET Contacto1=%s WHERE usuario_id=%s""", (Contacto1, usuario_id))
            if Contacto2:
                conexion.execute("""UPDATE Informacion SET Contacto2=%s WHERE usuario_id=%s""", (Contacto2, usuario_id))
            if Fecha_Nacimiento:
                conexion.execute("""UPDATE Informacion SET Fecha_Nacimiento=%s WHERE usuario_id=%s""", (Fecha_Nacimiento, usuario_id))
            if nombre_foto:
                conexion.execute("""UPDATE Informacion SET RutaFoto=%s WHERE usuario_id=%s""", (nombre_foto, usuario_id))
        else:
            conexion.execute(""" 
                INSERT INTO Informacion (Correo2, Contacto1, Contacto2, Fecha_Nacimiento, RutaFoto, usuario_id)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (Correo2, Contacto1, Contacto2, Fecha_Nacimiento, nombre_foto, usuario_id))

        if Contraseña:
            conexion.execute("""UPDATE Usuario SET Contraseña=%s WHERE ID=%s""", (Contraseña, usuario_id))

        conexion.connection.commit()
        conexion.close()

        flash('Datos actualizados correctamente')
        return redirect(url_for('admin_bp.informacion_usuario', usuario_id=usuario_id))


# cursos --------------------------------------------------------------------- cursos

@admin_bp.route('/3.3cur')
def crearCurso():
    connection = current_app.connection
    with connection.cursor() as cursor:
        # Obtener todos los grados
        cursor.execute("SELECT * FROM Grado")
        grados = cursor.fetchall()

        # Obtener todas las jornadas
        cursor.execute("SELECT * FROM Jornada")
        jornadas = cursor.fetchall()

    return render_template('admin/3.3cur.html', grados=grados, jornadas=jornadas)


@admin_bp.route('/guardar-curso', methods=['POST'])
def guardar_curso():
    connection = current_app.connection

    id_curso = request.form['id']
    curso_nombre = request.form['curso_nombre']
    grado_id = request.form['grado_id']
    jornada_id = request.form['jornada_id']

    try:
        with connection.cursor() as cursor:
            # Insertar el curso en la tabla Curso
            cursor.execute("""
                INSERT INTO Curso (ID, Curso_Nombre, grado_id, jornada_id)
                VALUES (%s, %s, %s, %s)
            """, (id_curso, curso_nombre, grado_id, jornada_id))

        connection.commit()
        flash('Curso creado correctamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al crear curso: {str(e)}', 'danger')

    return redirect(url_for('admin_bp.curso'))


@admin_bp.route('/3.2verCurso', methods=['GET'])
def verCurso():
    curso_id = request.args.get('curso_id')

    connection = current_app.connection
    cursor = connection.cursor()

    consulta = """
        SELECT u.ID, u.Primer_Nombre, u.Segundo_Nombre, u.Primer_Apellido, u.Segundo_Apellido
        FROM Usuario u
        JOIN Miembros_Curso mc ON u.ID = mc.usuario_id
        WHERE mc.curso_id = %s
    """
    cursor.execute(consulta, (curso_id,))
    usuarios = cursor.fetchall()  # Obtiene los resultados como diccionarios

    return render_template('admin/3.2verCurso.html', usuarios=usuarios, curso_id=curso_id)

@admin_bp.route('/eliminar_integrante_curso', methods=['POST'])
def eliminar_integrante_curso():
    usuario_id = request.form['usuario_id']
    curso_id = request.form['curso_id']

    connection = current_app.connection
    cursor = connection.cursor()
    cursor.execute("DELETE FROM Miembros_Curso WHERE usuario_id = %s AND curso_id = %s", (usuario_id, curso_id))
    connection.commit()

    flash("Usuario eliminado del curso exitosamente", "success")
    return redirect(url_for('admin_bp.verCurso', curso_id=curso_id))

@admin_bp.route('/agregar_usuario_a_curso/<curso_id>', methods=['POST'])
def agregar_usuario_a_curso(curso_id):
    # Obtener el ID del usuario que se va a agregar
    usuario_id = request.form['usuario_id']

    # Conexión a la base de datos
    connection = current_app.connection
    cursor = connection.cursor()

    # Verificar si el usuario ya es parte de este curso
    cursor.execute("SELECT * FROM Miembros_Curso WHERE curso_id = %s AND usuario_id = %s", (curso_id, usuario_id))
    miembro_existente = cursor.fetchone()

    if miembro_existente:
        flash('Este usuario ya está inscrito en este curso.', 'danger')
        return redirect(url_for('admin_bp.verCurso', curso_id=curso_id))

    # Insertar el usuario en la tabla Miembros_Curso
    try:
        cursor.execute("INSERT INTO Miembros_Curso (usuario_id, curso_id) VALUES (%s, %s)", (usuario_id, curso_id))
        connection.commit()
        flash('Usuario agregado al curso con éxito.', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al agregar el usuario: {e}', 'danger')

    return redirect(url_for('admin_bp.verCurso', curso_id=curso_id))

# agregar curso a la tabla -------------------------

@admin_bp.route('/3-curso')
def curso():
    connection = current_app.connection
    cursos = []
    try:
        print("Conectando a la base de datos...") 
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT Curso.ID, Curso.Curso_Nombre, Grado.Grado_Nombre, Jornada.Jornada_Nombre
                FROM Curso
                INNER JOIN Grado ON Curso.grado_id = Grado.ID
                INNER JOIN Jornada ON Curso.jornada_id = Jornada.ID
            """)
            cursos = cursor.fetchall()  
            print("cursos obtenidos:", cursos)  
    except Exception as e:
        flash(f'Error al obtener cursos: {str(e)}', 'danger')
    
    return render_template('admin/3-curso.html', cursos=cursos)

@admin_bp.route('/eliminar-curso/<string:id>', methods=['POST'])
def eliminar_curso(id):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                DELETE FROM Curso WHERE ID = %s
            """, (id,))
            
        connection.commit()
        flash('Curso eliminado correctamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al eliminar curso: {str(e)}', 'danger')
    
    return redirect(url_for('admin_bp.curso'))

# materias --------------------------------------------------------------------- materias

@admin_bp.route('/guardar-materia', methods=['POST'])
def guardar_materia():
    connection = current_app.connection

    id_materia = request.form['id']
    materia_nombre = request.form['materia_nombre']
    materia_descripcion = request.form['materia_descripcion']

    try:
        with connection.cursor() as cursor:
            # Insertar el curso en la tabla Curso
            cursor.execute("""
                INSERT INTO Materia (ID, Materia_Nombre, Descripcion_Materia)
                VALUES (%s, %s, %s)
            """, (id_materia, materia_nombre, materia_descripcion))

        connection.commit()
        flash('Materia creado correctamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al crear Materia: {str(e)}', 'danger')

    return redirect(url_for('admin_bp.materia'))

@admin_bp.route('/3.4materias')
def materia():
    connection = current_app.connection
    materias = []
    try:
        print("Conectando a la base de datos...") 
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT Materia.ID, Materia_Nombre, Descripcion_Materia
                FROM Materia
            """)
            materias = cursor.fetchall()  
            print("Materias obtenidos:", materias)  
    except Exception as e:
        flash(f'Error al obtener Materias: {str(e)}', 'danger')
    
    return render_template('admin/3.4materias.html', materias=materias)

@admin_bp.route('/eliminar-materia/<string:id>', methods=['POST'])
def eliminar_materia(id):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                DELETE FROM Materia WHERE ID = %s
            """, (id,))
            
        connection.commit()
        flash('materia eliminada correctamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al eliminar materia: {str(e)}', 'danger')
    
    return redirect(url_for('admin_bp.materia'))

# grados --------------------------------------------------------------------- grados

@admin_bp.route('/guardar-grado', methods=['POST'])
def guardar_grado():
    connection = current_app.connection

    id_materia = request.form['id']
    grado_Nombre = request.form['grado_Nombre']

    try:
        with connection.cursor() as cursor:
            # Insertar el curso en la tabla Curso
            cursor.execute("""
                INSERT INTO Grado (ID, Grado_Nombre)
                VALUES (%s, %s)
            """, (id_materia, grado_Nombre))

        connection.commit()
        flash('Grado creado correctamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al crear Grado: {str(e)}', 'danger')

    return redirect(url_for('admin_bp.grado'))

@admin_bp.route('/3.5grado')
def grado():
    connection = current_app.connection
    grados = []
    try:
        print("Conectando a la base de datos...") 
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT Grado.ID, Grado_Nombre
                FROM Grado
            """)
            grados = cursor.fetchall()  
            print("grados obtenidos:", grados)  
    except Exception as e:
        flash(f'Error al obtener grados: {str(e)}', 'danger')
    
    return render_template('admin/3.5grado.html', grados=grados)

@admin_bp.route('/eliminar-grado/<string:id>', methods=['POST'])
def eliminar_grado(id):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                DELETE FROM Grado WHERE ID = %s
            """, (id,))
            
        connection.commit()
        flash('grado eliminada correctamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al eliminar grado: {str(e)}', 'danger')
    
    return redirect(url_for('admin_bp.grado'))

# jornadas--------------------------------------------------------------------- jornadas

@admin_bp.route('/guardar-jornada', methods=['POST'])
def guardar_jornada():
    connection = current_app.connection

    id_jornada = request.form['id']
    jornada_Nombre = request.form['jornada_Nombre']

    try:
        with connection.cursor() as cursor:
            # Insertar el curso en la tabla Curso
            cursor.execute("""
                INSERT INTO Jornada (ID, Jornada_Nombre)
                VALUES (%s, %s)
            """, (id_jornada, jornada_Nombre))

        connection.commit()
        flash('jornada creado correctamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al crear jornada: {str(e)}', 'danger')

    return redirect(url_for('admin_bp.jornada'))

@admin_bp.route('/3.6jornada')
def jornada():
    connection = current_app.connection
    jornadas = []
    try:
        print("Conectando a la base de datos...") 
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT Jornada.ID, Jornada_Nombre
                FROM Jornada
            """)
            jornadas = cursor.fetchall()  
            print("jornada obtenidos:", jornadas)  
    except Exception as e:
        flash(f'Error al obtener jornada: {str(e)}', 'danger')
    
    return render_template('admin/3.6jornada.html', jornadas=jornadas)

@admin_bp.route('/eliminar-jornada/<string:id>', methods=['POST'])
def eliminar_jornada(id):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                DELETE FROM Jornada WHERE ID = %s
            """, (id,))
            
        connection.commit()
        flash('jornada eliminada correctamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al eliminar jornada: {str(e)}', 'danger')
    
    return redirect(url_for('admin_bp.jornada'))

# Aula--------------------------------------------------------------------- Aula

@admin_bp.route('/crear-aula')
def crear_aula():
    connection = current_app.connection
    materias = []
    cursos = []
    profesores = []

    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT ID, Materia_Nombre FROM Materia")
            materias = cursor.fetchall()

            cursor.execute("SELECT ID, Curso_Nombre FROM Curso")
            cursos = cursor.fetchall()

            cursor.execute("""
                SELECT Usuario.ID, CONCAT(Usuario.Primer_Nombre, ' ', Usuario.Primer_Apellido) AS Nombre_Completo
                FROM Usuario
                WHERE Usuario.rol_id = 'R002'
            """)
            profesores = cursor.fetchall()

    except Exception as e:
        flash(f'Error al obtener datos: {str(e)}', 'danger')

    return render_template('admin/5.1crearaul.html', materias=materias, cursos=cursos, profesores=profesores)

@admin_bp.route('/guardar-aula', methods=['POST'])
def guardar_aula():
    connection = current_app.connection
    id = request.form['id']
    aula_nombre = request.form['aula_nombre']
    materia_id = request.form['materia_id']
    curso_id = request.form['curso_id']
    usuario_id = request.form['usuario_id']

    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO Aula (ID, Aula_Nombre, materia_id, curso_id, usuario_id)
                VALUES (%s, %s, %s, %s, %s)
            """, (id, aula_nombre, materia_id, curso_id, usuario_id))
        connection.commit()
        flash('Aula creada correctamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al crear aula: {str(e)}', 'danger')

    return redirect(url_for('admin_bp.aula'))

@admin_bp.route('/5-aula')
def aula():
    connection = current_app.connection
    aulas = []

    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT Aula.ID, Aula.Aula_Nombre, Materia.Materia_Nombre, Curso.Curso_Nombre, 
                CONCAT(Usuario.Primer_Nombre, ' ', Usuario.Primer_Apellido) AS Profesor
                FROM Aula
                JOIN Materia ON Aula.materia_id = Materia.ID
                JOIN Curso ON Aula.curso_id = Curso.ID
                JOIN Usuario ON Aula.usuario_id = Usuario.ID
            """)
            aulas = cursor.fetchall()

    except Exception as e:
        flash(f'Error al obtener aulas: {str(e)}', 'danger')

    return render_template('admin/5-aula.html', aulas=aulas)

@admin_bp.route('/eliminar_aula/<string:id>', methods=['POST'])
def eliminar_aula(id):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                DELETE FROM Aula WHERE ID = %s
            """, (id,))
            
        connection.commit()
        flash('aula eliminada correctamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al eliminar aula: {str(e)}', 'danger')
    
    return redirect(url_for('admin_bp.aula'))