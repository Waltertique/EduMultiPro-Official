from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app
from flask import jsonify
import pymysql
import pymysql.cursors
from flask import session
from werkzeug.utils import secure_filename
import os
from werkzeug.security import generate_password_hash
import uuid

admin2_bp = Blueprint('admin2_bp', __name__, url_prefix='/admin')


hash = generate_password_hash("pepito123")
print(hash)

# ---------modificar materias

@admin2_bp.route('/modificar_materia', methods=['POST'])
def modificar_materia():
    id = request.form['id']
    nombre = request.form['nombre']
    descripcion = request.form['descripcion']

    connection = current_app.connection
    with connection.cursor() as cursor:
        sql = """
            UPDATE Materia
            SET Materia_Nombre = %s, Descripcion_Materia = %s
            WHERE ID = %s
        """
        cursor.execute(sql, (nombre, descripcion, id))
    connection.commit()

    flash('Materia modificada exitosamente.')
    return redirect(url_for('admin_bp.materia'))

# ---------modificar grados

@admin2_bp.route('/modificar_grado', methods=['POST'])
def modificar_grado():
    id = request.form['id']
    nombre = request.form['nombre']
    descripcion = request.form['descripcion']

    connection = current_app.connection
    with connection.cursor() as cursor:
        sql = """
            UPDATE Grado
            SET Grado_Nombre = %s, Descripcion_Grado = %s
            WHERE ID = %s
        """
        cursor.execute(sql, (nombre, descripcion, id))
    connection.commit()

    flash('Grado modificado exitosamente.')
    return redirect(url_for('admin_bp.grado'))

# ---------modificar jornada

@admin2_bp.route('/modificar_jornada', methods=['POST'])
def modificar_jornada():
    id = request.form['id']
    nombre = request.form['nombre']
    descripcion = request.form['descripcion']

    connection = current_app.connection
    with connection.cursor() as cursor:
        sql = """
            UPDATE Jornada
            SET Jornada_Nombre = %s, Descripcion_Jornada = %s
            WHERE ID = %s
        """
        cursor.execute(sql, (nombre, descripcion, id))
    connection.commit()

    flash('Jornada modificada exitosamente.')
    return redirect(url_for('admin_bp.jornada'))

# ---------crear horario---------------------------------------------------------- 

@admin2_bp.route('/4.1crearHorario')
def crearHorario():
    connection = current_app.connection
    import pymysql.cursors
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    # Obtener los profesores
    cursor.execute("""
        SELECT ID, CONCAT(Primer_Nombre, ' ', Primer_Apellido) AS Nombre_Completo
        FROM Usuario 
        WHERE rol_id = 'R002'
    """)
    profesores = cursor.fetchall()

    # Obtener los cursos con su jornada
    cursor.execute("""
        SELECT Curso.ID, CONCAT(Curso.Curso_Nombre, ' - ', Jornada.Jornada_Nombre) AS Curso_Con_Jornada
        FROM Curso
        INNER JOIN Jornada ON Curso.jornada_id = Jornada.ID
    """)
    cursos = cursor.fetchall()

    return render_template('admin/4.1crearHorario.html', profesores=profesores, cursos=cursos)


@admin2_bp.route('/crear_horario', methods=['POST'])
def crear_horario():
    titulo = request.form['titulo']
    descripcion = request.form['descripcion']
    profesor_id = request.form.get('profesor_id') or None
    curso_id = request.form.get('curso_id') or None
    imagen = request.files['imagen']
    imagen_path = None

    # Validación: Solo uno puede ser seleccionado
    if (profesor_id and curso_id) or (not profesor_id and not curso_id):
        flash('Debes seleccionar solo un curso o un profesor, no ambos.', 'danger')
        return redirect(url_for('admin2_bp.crearHorario'))

    if imagen and imagen.filename:
        filename = secure_filename(imagen.filename)
        imagen_path = os.path.join('static', 'fotos', filename)
        full_path = os.path.join(current_app.root_path, imagen_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        imagen.save(full_path)

    connection = current_app.connection
    import pymysql.cursors
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    # Validar profesor si fue seleccionado
    if profesor_id:
        cursor.execute("SELECT COUNT(*) AS total FROM Usuario WHERE ID = %s", (profesor_id,))
        if cursor.fetchone()['total'] == 0:
            flash('El profesor seleccionado no existe.', 'danger')
            return redirect(url_for('admin2_bp.crearHorario'))

    # Validar curso si fue seleccionado
    if curso_id:
        cursor.execute("SELECT COUNT(*) AS total FROM Curso WHERE ID = %s", (curso_id,))
        if cursor.fetchone()['total'] == 0:
            flash('El curso seleccionado no existe.', 'danger')
            return redirect(url_for('admin2_bp.crearHorario'))

    # Insertar en Horario
    sql = """
        INSERT INTO Horario (Titulo_Horario, Imagen_Horario, Descripcion_Horario, profesor_id, curso_id)
        VALUES (%s, %s, %s, %s, %s)
    """
    try:
        cursor.execute(sql, (
            titulo,
            imagen_path,
            descripcion,
            profesor_id if profesor_id else None,
            curso_id if curso_id else None
        ))
        connection.commit()
        flash('Horario creado exitosamente.', 'success')
    except pymysql.MySQLError as e:
        flash(f'Error al crear el horario: {e.args[0]} - {e.args[1]}', 'danger')
        return redirect(url_for('admin2_bp.crearHorario'))

    return redirect(url_for('admin_bp.horario'))

# ---------modificar horario---------------------------------------------------------- 

@admin2_bp.route('/modificar_horario/<int:id>', methods=['GET'])
def modificarHorario(id):
    connection = current_app.connection
    import pymysql.cursors
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    # Traer los datos del horario
    cursor.execute("""
        SELECT H.ID, H.Titulo_Horario, H.Descripcion_Horario, H.Imagen_Horario,
               H.profesor_id, H.curso_id
        FROM Horario H
        WHERE H.ID = %s
    """, (id,))
    horario = cursor.fetchone()

    # Traer profesores y cursos para los select
    cursor.execute("SELECT ID, CONCAT(Primer_Nombre, ' ', Primer_Apellido) AS Nombre FROM Usuario WHERE rol_id = 'R002'")
    profesores = cursor.fetchall()

    cursor.execute("""
        SELECT Curso.ID, CONCAT(Curso.Curso_Nombre, ' - ', Jornada.Jornada_Nombre) AS Curso_Con_Jornada
        FROM Curso
        INNER JOIN Jornada ON Curso.jornada_id = Jornada.ID
    """)
    cursos = cursor.fetchall()

    return render_template('admin/4.2modificarHorario.html', horario=horario, profesores=profesores, cursos=cursos)

@admin2_bp.route('/guardar_horario_editado/<int:id>', methods=['POST'])
def guardarHorarioEditado(id):
    titulo = request.form['titulo']
    descripcion = request.form['descripcion']
    profesor_id = request.form.get('profesor_id') or None
    curso_id = request.form.get('curso_id') or None
    imagen = request.files['imagen']
    imagen_filename = None

    # Validación: solo se permite curso o profesor, no ambos ni ninguno
    if (profesor_id and curso_id) or (not profesor_id and not curso_id):
        flash('Debes seleccionar solo un curso o un profesor, no ambos.', 'danger')
        return redirect(url_for('admin2_bp.editarHorario', id=id))

    connection = current_app.connection
    import pymysql.cursors
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    # Validar existencia del profesor
    if profesor_id:
        cursor.execute("SELECT COUNT(*) AS total FROM Usuario WHERE ID = %s", (profesor_id,))
        if cursor.fetchone()['total'] == 0:
            flash('El profesor seleccionado no existe.', 'danger')
            return redirect(url_for('admin2_bp.editarHorario', id=id))

    # Validar existencia del curso
    if curso_id:
        cursor.execute("SELECT COUNT(*) AS total FROM Curso WHERE ID = %s", (curso_id,))
        if cursor.fetchone()['total'] == 0:
            flash('El curso seleccionado no existe.', 'danger')
            return redirect(url_for('admin2_bp.editarHorario', id=id))

    # Procesar imagen si se subió
    if imagen and imagen.filename:
        filename = secure_filename(imagen.filename)
        imagen_filename = f'static/fotos/{filename}'
        ruta_completa = os.path.join(current_app.root_path, imagen_filename)
        os.makedirs(os.path.dirname(ruta_completa), exist_ok=True)
        imagen.save(ruta_completa)

    # Armar consulta según si hay imagen
    if imagen_filename:
        cursor.execute("""
            UPDATE Horario
            SET Titulo_Horario = %s,
                Descripcion_Horario = %s,
                Imagen_Horario = %s,
                profesor_id = %s,
                curso_id = %s
            WHERE ID = %s
        """, (titulo, descripcion, imagen_filename, profesor_id, curso_id, id))
    else:
        cursor.execute("""
            UPDATE Horario
            SET Titulo_Horario = %s,
                Descripcion_Horario = %s,
                profesor_id = %s,
                curso_id = %s
            WHERE ID = %s
        """, (titulo, descripcion, profesor_id, curso_id, id))

    connection.commit()
    flash('Horario actualizado correctamente.', 'success')
    return redirect(url_for('admin_bp.horario'))

@admin2_bp.route('/ver_horario/<int:id>', methods=['GET'])
def verHorario(id):
    connection = current_app.connection
    import pymysql.cursors
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    sql = """
        SELECT 
            h.ID, 
            h.Titulo_Horario, 
            h.Imagen_Horario, 
            h.Descripcion_Horario,
            c.Curso_Nombre AS Curso_Nombre, 
            j.Jornada_Nombre AS Jornada_Nombre,
            CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) AS Profesor_Nombre
        FROM Horario h
        LEFT JOIN Curso c ON c.ID = h.curso_id
        LEFT JOIN Jornada j ON j.ID = c.jornada_id
        LEFT JOIN Usuario u ON u.ID = h.profesor_id
        WHERE h.ID = %s
    """
    cursor.execute(sql, (id,))
    horario = cursor.fetchone()

    if not horario:
        flash('Horario no encontrado.', 'danger')
        return redirect(url_for('admin_bp.horario'))

    # Ya no necesitamos la conversión a base64, solo pasamos la ruta
    return render_template('admin/4.3verHorario.html', horario=horario)

# ---------Noticias---------------------------------------------------------------------------------- 

@admin2_bp.route('/8.1crearNoticia')
def crear_noticia():
    connection = current_app.connection
    import pymysql.cursors
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    # Obtener los tipos de noticia
    cursor.execute("SELECT ID, Tipo FROM Tipo_Noticia")
    tipos_noticia = cursor.fetchall()

    return render_template('admin/8.1crearNoticia.html', tipos_noticia=tipos_noticia)


@admin2_bp.route('/guardarNoticia', methods=['POST'])
def guardar_noticia():
    from werkzeug.utils import secure_filename
    import os

    titulo = request.form['titulo']
    encabezado = request.form['encabezado']
    descripcion1 = request.form['descripcion1']
    descripcion2 = request.form['descripcion2']
    descripcion3 = request.form['descripcion3']
    fecha = request.form['fecha']
    tipo_noticia_id = request.form['tipo_noticia_id']

    imagenes = []
    for i in range(1, 4):
        img = request.files.get(f'imagen{i}')
        ruta = None
        if img and img.filename:
            filename = secure_filename(img.filename)
            ruta = os.path.join('static', 'fotos', filename)
            full_path = os.path.join(current_app.root_path, ruta)
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            img.save(full_path)
        imagenes.append(ruta)

    connection = current_app.connection
    import pymysql.cursors
    cursor = connection.cursor()

    sql = """
        INSERT INTO Noticia (
            Titulo_Noticia, Encabezado, Descripcion1, Descripcion2, Descripcion3,
            Fecha_Notica, Imagen1, Imagen2, Imagen3, tipo_noticia_id
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    try:
        cursor.execute(sql, (
            titulo, encabezado, descripcion1, descripcion2, descripcion3,
            fecha, imagenes[0], imagenes[1], imagenes[2], tipo_noticia_id
        ))
        connection.commit()
        flash('Noticia creada exitosamente.', 'success')
    except pymysql.MySQLError as e:
        flash(f'Error al crear la noticia: {e.args[0]} - {e.args[1]}', 'danger')
    
    return redirect(url_for('admin_bp.noticia'))

@admin2_bp.route('/eliminar_noticia/<string:id>', methods=['POST'])
def eliminar_noticia(id):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                DELETE FROM Noticia WHERE ID = %s
            """, (id,))
            
        connection.commit()
        flash('Noticia eliminado correctamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al eliminar Noticia: {str(e)}', 'danger')
    
    return redirect(url_for('admin_bp.noticia'))

@admin2_bp.route('/modificar_noticia/<int:id>', methods=['GET'])
def modificar_noticia(id):
    connection = current_app.connection
    import pymysql.cursors
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    # Traer los datos de la noticia
    cursor.execute("""
        SELECT N.ID, N.Titulo_Noticia, N.Encabezado, N.Descripcion1, N.Descripcion2, N.Descripcion3, 
               N.Fecha_Notica, N.Imagen1, N.Imagen2, N.Imagen3, N.tipo_noticia_id
        FROM Noticia N
        WHERE N.ID = %s
    """, (id,))
    noticia = cursor.fetchone()

    # Traer los tipos de noticia para el select
    cursor.execute("SELECT ID, Tipo FROM Tipo_Noticia")
    tipos_noticia = cursor.fetchall()

    return render_template('admin/8.2modificarNoticia.html', noticia=noticia, tipos_noticia=tipos_noticia)

@admin2_bp.route('/guardar_noticia_editada/<int:id>', methods=['POST'])
def guardar_noticia_editada(id):
    from werkzeug.utils import secure_filename
    import os
    import pymysql.cursors

    # Obtener conexión y cursor
    connection = current_app.connection
    cursor = connection.cursor()

    # Obtener los datos actuales de la noticia
    cursor.execute("SELECT Imagen1, Imagen2, Imagen3 FROM Noticia WHERE ID = %s", (id,))
    noticia_actual = cursor.fetchone()

    # Obtener datos del formulario
    titulo = request.form['titulo']
    encabezado = request.form['encabezado']
    descripcion1 = request.form['descripcion1']
    descripcion2 = request.form['descripcion2']
    descripcion3 = request.form['descripcion3']
    fecha = request.form['fecha']
    tipo_noticia_id = request.form['tipo_noticia_id']

    # Procesar imágenes (nuevas o conservar las anteriores)
    imagenes = []
    for i in range(1, 4):
        img = request.files.get(f'imagen{i}')
        ruta = None
        if img and img.filename:
            filename = secure_filename(img.filename)
            ruta = os.path.join('static', 'fotos', filename)
            full_path = os.path.join(current_app.root_path, ruta)
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            img.save(full_path)
        else:
            ruta = noticia_actual[f'Imagen{i}']  # ← ¡aquí está el fix!
        imagenes.append(ruta)

    # Actualizar la noticia
    sql = """
        UPDATE Noticia
        SET Titulo_Noticia = %s, Encabezado = %s, Descripcion1 = %s, Descripcion2 = %s, Descripcion3 = %s, 
            Fecha_Notica = %s, Imagen1 = %s, Imagen2 = %s, Imagen3 = %s, tipo_noticia_id = %s
        WHERE ID = %s
    """
    try:
        cursor.execute(sql, (
            titulo, encabezado, descripcion1, descripcion2, descripcion3, fecha, 
            imagenes[0], imagenes[1], imagenes[2], tipo_noticia_id, id
        ))
        connection.commit()
        flash('Noticia actualizada correctamente.', 'success')
    except pymysql.MySQLError as e:
        flash(f'Error al actualizar la noticia: {e.args[0]} - {e.args[1]}', 'danger')

    return redirect(url_for('admin_bp.noticia'))

@admin2_bp.route('/ver_noticia/<int:id>', methods=['GET'])
def verNoticia(id):
    connection = current_app.connection
    cursor = connection.cursor()

    sql = "SELECT * FROM Noticia WHERE ID = %s"
    cursor.execute(sql, (id,))
    noticia = cursor.fetchone()

    if not noticia:
        flash('No se encontró la noticia.', 'danger')
        return redirect(url_for('admin_bp.noticia'))

    return render_template('admin/8.3verNoticia.html', noticia=noticia)

# ------------Aulas-----------------------------------------------------------------------------

@admin2_bp.route('/5.2verAula')
def verAula():
    aula_id = request.args.get('aula_id')
    connection = current_app.connection
    aula_info = {}
    anuncios = []

    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT Anuncio.ID,
                    Aula.Aula_Nombre, Materia.Materia_Nombre, 
                    CONCAT(Curso.Curso_Nombre, ' ', Jornada.Jornada_Nombre) AS Curso_Jornada,
                    CONCAT(Usuario.Primer_Nombre, ' ', Usuario.Primer_Apellido) AS Profesor,
                    Usuario.RutaFoto,
                    Anuncio.Titulo_Anuncio, Anuncio.Descripcion_Anuncio, Anuncio.Fecha_Anuncio,
                    Anuncio.Enlace_Anuncio
                FROM Aula
                JOIN Materia ON Aula.materia_id = Materia.ID
                JOIN Curso ON Aula.curso_id = Curso.ID
                JOIN Jornada ON Curso.jornada_id = Jornada.ID
                JOIN Usuario ON Aula.usuario_id = Usuario.ID
                LEFT JOIN Anuncio ON Anuncio.aula_id = Aula.ID
                WHERE Aula.ID = %s
            """, (aula_id,))
            anuncios = cursor.fetchall()

            # Si hay resultados, extraer info del aula
            if anuncios:
                aula_info = {
                    'Aula_Nombre': anuncios[0]['Aula_Nombre'],
                    'Materia_Nombre': anuncios[0]['Materia_Nombre'],
                    'Curso_Jornada': anuncios[0]['Curso_Jornada'],
                    'Profesor': anuncios[0]['Profesor']
                }

    except Exception as e:
        flash(f'Error al obtener información del aula: {str(e)}', 'danger')

    return render_template('admin/5.2verAula.html', aula=aula_info, anuncios=anuncios, aula_id=aula_id)

@admin2_bp.route('/crear_anuncio', methods=['POST'])
def crear_anuncio():
    connection = current_app.connection

    aula_id = request.form.get('aula_id')
    usuario_id = session.get('usuario_id')  # Asegúrate de que el usuario esté autenticado

    titulo = request.form.get('titulo')
    descripcion = request.form.get('descripcion')
    fecha = request.form.get('fecha')
    archivo = request.files.get('archivo')

    enlace_archivo = None

    if archivo and archivo.filename != '':
        # Asegurarse de que la carpeta existe
        carpeta_destino = os.path.join(current_app.root_path, 'static', 'fotos')
        os.makedirs(carpeta_destino, exist_ok=True)

        # Limpiar nombre del archivo
        ext = os.path.splitext(archivo.filename)[1]  # extensión con punto
        nuevo_nombre = f"{uuid.uuid4().hex}{ext}"  # nombre único
        ruta_guardado = os.path.join(carpeta_destino, nuevo_nombre)

        # Guardar el archivo
        archivo.save(ruta_guardado)

        # Ruta para usar en href del navegador
        enlace_archivo = f"fotos/{nuevo_nombre}"

    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO Anuncio (aula_id, usuario_id, Titulo_Anuncio, Descripcion_Anuncio, Fecha_Anuncio, Enlace_Anuncio)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (aula_id, usuario_id, titulo, descripcion, fecha, enlace_archivo))
        connection.commit()
        flash('Anuncio creado correctamente.', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al crear el anuncio: {str(e)}', 'danger')

    return redirect(url_for('admin2_bp.verAula', aula_id=aula_id))

@admin2_bp.route('/eliminar-anuncio/<string:id>/<string:aula_id>', methods=['POST'])
def eliminar_anuncio(id, aula_id):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM Anuncio WHERE ID = %s", (id,))
        connection.commit()
        flash('Anuncio eliminado correctamente.', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al eliminar el anuncio: {str(e)}', 'danger')

    return redirect(url_for('admin2_bp.verAula', aula_id=aula_id))

@admin2_bp.route('/5.3Trabajos')
def Trabajos():
    return render_template('admin/5.3Trabajos.html')

@admin2_bp.route('/5.4Personas')
def Personas():
    return render_template('admin/5.4Personas.html')

@admin2_bp.route('/5.5notas')
def Notas():
    return render_template('admin/5.5notas.html')






