from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app
from flask import jsonify
import pymysql
import pymysql.cursors
from flask import session
from werkzeug.utils import secure_filename
import os
from werkzeug.security import generate_password_hash
import uuid
from datetime import datetime # importa tu modelo
from conexion import obtener_conexion

alumno_bp = Blueprint('alumno_bp', __name__, url_prefix='/alumno')

@alumno_bp.route('/1-principal')
def inicio():
    return render_template('alumno/1-principal.html')

# Noticias en pagina principal-----------------------------------------------------------

@alumno_bp.route('/principal')
def vista_alumno_principal():
    connection = current_app.connection
    import pymysql.cursors
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    # Obtener la Noticia Principal 1
    cursor.execute("""
        SELECT ID, Titulo_Noticia, Encabezado, Imagen1, tipo_noticia_id 
        FROM Noticia 
        WHERE tipo_noticia_id = 1
        ORDER BY Fecha_Notica DESC
        LIMIT 1
    """)
    noticia_principal1 = cursor.fetchone()

    # Obtener la Noticia Principal 2 (si existe)
    cursor.execute("""
        SELECT ID, Titulo_Noticia, Encabezado, Imagen1, tipo_noticia_id 
        FROM Noticia 
        WHERE tipo_noticia_id = 2
        ORDER BY Fecha_Notica DESC
        LIMIT 1
    """)
    noticia_principal2 = cursor.fetchone()

    # Obtener la Noticia Principal 3 (si existe)
    cursor.execute("""
        SELECT ID, Titulo_Noticia, Encabezado, Imagen1, tipo_noticia_id 
        FROM Noticia 
        WHERE tipo_noticia_id = 3
        ORDER BY Fecha_Notica DESC
        LIMIT 1
    """)
    noticia_principal3 = cursor.fetchone()

    return render_template('alumno/1-principal.html', noticia1=noticia_principal1, noticia2=noticia_principal2,  noticia3=noticia_principal3)

# todas las Noticias en pagina de noticias -----------------------------------------------------------

@alumno_bp.route('/todas-las-noticias')
def vista_todas_las_noticias():
    connection = current_app.connection
    import pymysql.cursors
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    # Traer todas las noticias, ordenadas por fecha descendente
    cursor.execute("""
        SELECT ID, Titulo_Noticia, Encabezado, Imagen1, tipo_noticia_id
        FROM Noticia
        ORDER BY Fecha_Notica DESC
    """)
    todas_las_noticias = cursor.fetchall()

    return render_template('alumno/2-noticias.html', noticias=todas_las_noticias)


@alumno_bp.route('/2.2verNoticia/<int:noticia_id>')
def verNoticia(noticia_id):
    connection = current_app.connection
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    cursor.execute("""
        SELECT Titulo_Noticia, Descripcion1, Imagen2, Descripcion2, Imagen3, Descripcion3, Fecha_Notica
        FROM Noticia
        WHERE ID = %s
    """, (noticia_id,))
    
    noticia = cursor.fetchone()

    if not noticia:
        flash("La noticia no existe", "danger")
        return redirect(url_for('alumno_bp.vista_todas_las_noticias'))

    return render_template('alumno/2.2verNoticia.html', noticia=noticia)

@alumno_bp.route('/3-horario')
def horario():
    usuario_id = session.get('usuario_id')

    if not usuario_id:
        flash('Debe iniciar sesión para ver el horario.', 'warning')
        return redirect(url_for('user_bp.mostrar_login'))

    connection = current_app.connection
    import pymysql.cursors
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    # Obtener el curso del usuario
    cursor.execute("""
        SELECT c.ID AS curso_id, c.Curso_Nombre, j.Jornada_Nombre, g.Grado_Nombre
        FROM Miembros_Curso mc
        INNER JOIN Curso c ON mc.curso_id = c.ID
        INNER JOIN Jornada j ON c.jornada_id = j.ID
        INNER JOIN Grado g ON c.grado_id = g.ID
        WHERE mc.usuario_id = %s
    """, (usuario_id,))
    curso_info = cursor.fetchone()

    if not curso_info:
        flash('No estás asignado a ningún curso.', 'danger')
        return redirect(url_for('alumno_bp.vista_alumno_principal'))

    curso_id = curso_info['curso_id']

    # Obtener el horario asociado al curso
    cursor.execute("""
        SELECT Titulo_Horario, Imagen_Horario, Descripcion_Horario
        FROM Horario
        WHERE curso_id = %s
        LIMIT 1
    """, (curso_id,))
    horario = cursor.fetchone()

    if not horario:
        horario = None
        return render_template('alumno/3-horario.html', horario=horario, curso=curso_info)

    # ✅ Ajustar ruta de imagen si empieza con "static/"
    if horario['Imagen_Horario'].startswith('static/'):
        horario['Imagen_Horario'] = horario['Imagen_Horario'][7:]  # quita "static/"

    return render_template('alumno/3-horario.html', horario=horario, curso=curso_info)

@alumno_bp.route('/7-perfil')
def perfil():
    usuario_id = session.get('usuario_id')

    if not usuario_id:
        flash('Debes iniciar sesión para ver tu perfil.', 'warning')
        return redirect(url_for('user_bp.mostrar_login'))

    connection = current_app.connection
    import pymysql.cursors
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    cursor.execute("""
        SELECT u.ID, u.Primer_Nombre, u.Segundo_Nombre, u.Primer_Apellido, u.Segundo_Apellido,
               u.Correo1, u.Correo2, u.Contacto1, u.Contacto2, u.Fecha_Nacimiento,
               u.RutaFoto, r.Nombre_Rol AS Rol, d.Tipo_Documento AS Documento
        FROM Usuario u
        JOIN Rol r ON u.rol_id = r.ID
        JOIN Documento d ON u.documento_id = d.ID
        WHERE u.ID = %s
    """, (usuario_id,))

    usuario = cursor.fetchone()

    if not usuario:
        flash('No se encontró el perfil del usuario.', 'danger')
        return redirect(url_for('alumno_bp.vista_alumno_principal'))

    return render_template('alumno/7-perfil.html', usuario=usuario)

@alumno_bp.route('/4-clases')
def Aulas():
    connection = current_app.connection
    import pymysql.cursors
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    usuario_id = session.get('usuario_id')

    # Obtener las aulas en las que el alumno está inscrito
    cursor.execute("""
        SELECT 
            a.ID,
            a.Aula_Nombre,
            m.Materia_Nombre,
            CONCAT(c.Curso_Nombre, ' - ', j.Jornada_Nombre) AS Curso_Nombre,
            CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) AS Profesor
        FROM Miembros_Curso mc
        JOIN Curso c ON mc.curso_id = c.ID
        JOIN Jornada j ON c.jornada_id = j.ID
        JOIN Aula a ON a.curso_id = c.ID
        JOIN Materia m ON a.materia_id = m.ID
        JOIN Usuario u ON a.usuario_id = u.ID
        WHERE mc.usuario_id = %s
    """, (usuario_id,))
    
    aulas = cursor.fetchall()

    return render_template('alumno/4-clases.html', aulas=aulas)

@alumno_bp.route('/5-Aula')
def verAula():
    aula_id = request.args.get('aula_id')

    if not aula_id:
        flash('No se especificó un aula.', 'warning')
        return redirect(url_for('alumno_bp.Aulas'))  # Redirige a la lista de clases del alumno

    try:
        aula_id = int(aula_id)
    except ValueError:
        flash('ID de aula no válido.', 'danger')
        return redirect(url_for('alumno_bp.Aulas'))

    connection = current_app.connection
    aula_info = {}
    anuncios = []
    comentarios_por_anuncio = {}

    try:
        with connection.cursor() as cursor:
            # Obtener información del aula y anuncios
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

            # Obtener la información general del aula (usamos el primer anuncio como referencia)
            if anuncios:
                aula_info = {
                    'Aula_Nombre': anuncios[0]['Aula_Nombre'],
                    'Materia_Nombre': anuncios[0]['Materia_Nombre'],
                    'Curso_Jornada': anuncios[0]['Curso_Jornada'],
                    'Profesor': anuncios[0]['Profesor'],
                    'RutaFoto': anuncios[0]['RutaFoto']
                }

                # Obtener comentarios relacionados con los anuncios
                anuncio_ids = [anuncio['ID'] for anuncio in anuncios if anuncio['ID'] is not None]
                if anuncio_ids:
                    placeholders = ','.join(['%s'] * len(anuncio_ids))
                    cursor.execute(f"""
                        SELECT Comentario.ID AS comentario_id,
                               Comentario.anuncio_id,
                               Comentario.Descripcion AS comentario,
                               Comentario.Fecha AS fecha_comentario,
                               CONCAT(Usuario.Primer_Nombre, ' ', Usuario.Primer_Apellido) AS Comentador,
                               Usuario.RutaFoto,
                               Comentario.usuario_id  -- ✅ Campo necesario para identificar al autor
                        FROM Comentario
                        JOIN Usuario ON Comentario.usuario_id = Usuario.ID
                        WHERE Comentario.anuncio_id IN ({placeholders})
                        ORDER BY Comentario.Fecha DESC
                    """, anuncio_ids)

                    comentarios = cursor.fetchall()

                    for com in comentarios:
                        anuncio_id = com['anuncio_id']
                        if anuncio_id not in comentarios_por_anuncio:
                            comentarios_por_anuncio[anuncio_id] = []
                        comentarios_por_anuncio[anuncio_id].append(com)

    except Exception as e:
        flash(f'Error al obtener la información del aula: {str(e)}', 'danger')

    return render_template(
        'alumno/5-Aula.html',
        aula=aula_info,
        anuncios=anuncios,
        aula_id=aula_id,
        comentarios_por_anuncio=comentarios_por_anuncio
    )
    
@alumno_bp.route('/comentar/<int:anuncio_id>', methods=['POST'])
def comentar(anuncio_id):
    aula_id = request.args.get('aula_id')
    usuario_id = session.get('usuario_id')

    if not usuario_id:
        flash('No has iniciado sesión', 'warning')
        return redirect(url_for('alumno_bp.verAula', aula_id=aula_id))

    texto_comentario = request.form.get('comentario')
    if not texto_comentario:
        flash('Debe escribir un comentario', 'warning')
        return redirect(url_for('alumno_bp.verAula', aula_id=aula_id))

    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO Comentario (anuncio_id, Descripcion, Fecha, usuario_id)
                VALUES (%s, %s, NOW(), %s)
            """, (anuncio_id, texto_comentario, usuario_id))
            connection.commit()
        flash('Comentario agregado con éxito', 'success')
    except Exception as e:
        flash(f'Error al agregar comentario: {str(e)}', 'danger')

    return redirect(url_for('alumno_bp.verAula', aula_id=aula_id))

@alumno_bp.route('/eliminar_comentario/<int:id>', methods=['POST'])
def eliminar_comentario(id):
    aula_id = request.args.get('aula_id')
    usuario_id = session.get('usuario_id')

    if not usuario_id:
        flash('No has iniciado sesión.', 'warning')
        return redirect(url_for('alumno_bp.verAula', aula_id=aula_id))

    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT usuario_id FROM Comentario WHERE ID = %s", (id,))
            resultado = cursor.fetchone()

            if not resultado:
                flash('Comentario no encontrado.', 'danger')
            elif resultado['usuario_id'] != usuario_id:
                flash('No puedes eliminar comentarios de otros usuarios.', 'danger')
            else:
                cursor.execute("DELETE FROM Comentario WHERE ID = %s", (id,))
                connection.commit()
                flash('Comentario eliminado correctamente.', 'success')

    except Exception as e:
        flash(f'Error al eliminar comentario: {str(e)}', 'danger')

    return redirect(url_for('alumno_bp.verAula', aula_id=aula_id))

@alumno_bp.route('/5.1-trabajos')
def Trabajos():
    aula_id = request.args.get('aula_id')
    if not aula_id:
        flash("No se especificó aula", "error")
        return redirect(url_for('alumno_bp.verAula'))

    conexion = obtener_conexion()
    try:
        with conexion.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("""
                SELECT ID, Titulo_Trabajo, Fecha_Trabajo, Descripcion_Trabajo
                FROM Trabajo
                WHERE aula_id = %s
            """, (aula_id,))
            trabajos = cursor.fetchall()
    finally:
        conexion.close()

    return render_template('alumno/5.1-trabajos.html', trabajos=trabajos, aula_id=aula_id)

@alumno_bp.route('/5.2-personas')
def Personas():
    aula_id = request.args.get('aula_id')
    if not aula_id:
        flash("No se especificó aula", "error")
        return redirect(url_for('alumno_bp.verAula'))

    conexion = obtener_conexion()
    try:
        with conexion.cursor(pymysql.cursors.DictCursor) as cursor:
            # Obtener el curso_id a partir del aula
            cursor.execute("SELECT curso_id FROM Aula WHERE ID = %s", (aula_id,))
            resultado = cursor.fetchone()

            if not resultado:
                flash("Aula no encontrada", "error")
                return redirect(url_for('alumno_bp.verAula'))

            curso_id = resultado['curso_id']

            # Obtener usuarios (miembros del curso)
            query = """
                SELECT u.ID, u.Primer_Nombre, u.Segundo_Nombre, u.Primer_Apellido, u.Segundo_Apellido
                FROM Usuario u
                JOIN Miembros_Curso mc ON u.ID = mc.usuario_id
                WHERE mc.curso_id = %s
            """
            cursor.execute(query, (curso_id,))
            usuarios = cursor.fetchall()
    finally:
        conexion.close()

    return render_template('alumno/5.2-personas.html', usuarios=usuarios, aula_id=aula_id)

@alumno_bp.route('/5.3verTrabajo')
def verTrabajo():
    trabajo_id = request.args.get('trabajo_id')
    aula_id = request.args.get('aula_id')
    usuario_id = session.get('usuario_id')  # 👈 Usuario autenticado

    if not trabajo_id or not aula_id:
        flash("Faltan datos del trabajo o aula", "warning")
        return redirect(url_for('alumno_bp.Trabajos', aula_id=aula_id))

    conexion = obtener_conexion()
    trabajo = None
    archivos = []
    comentarios_trabajo = []
    nota = None
    fecha_entrega = None
    archivos_entregados = []

    try:
        with conexion.cursor(pymysql.cursors.DictCursor) as cursor:
            # Obtener el trabajo
            cursor.execute("SELECT * FROM Trabajo WHERE ID = %s", (trabajo_id,))
            trabajo = cursor.fetchone()

            # Archivos del profesor
            cursor.execute("SELECT * FROM Trabajo_Archivo WHERE trabajo_id = %s", (trabajo_id,))
            archivos = cursor.fetchall()

            # Comentarios del trabajo
            cursor.execute("""
                SELECT Comentario.ID AS comentario_id,
                       Comentario.Descripcion AS comentario,
                       Comentario.Fecha AS fecha_comentario,
                       Comentario.usuario_id,
                       CONCAT(Usuario.Primer_Nombre, ' ', Usuario.Primer_Apellido) AS Comentador,
                       Usuario.RutaFoto
                FROM Comentario
                JOIN Usuario ON Comentario.usuario_id = Usuario.ID
                WHERE Comentario.trabajo_id = %s
                ORDER BY Comentario.Fecha DESC
            """, (trabajo_id,))
            comentarios_trabajo = cursor.fetchall()

            # Obtener entrega del alumno (incluye Nota y Fecha)
            cursor.execute("""
                SELECT ID, Fecha_Trabajo, Nota
                FROM TrabajoEntregado
                WHERE trabajo_id = %s AND usuario_id = %s
            """, (trabajo_id, usuario_id))
            entrega = cursor.fetchone()

            if entrega:
                nota = entrega['Nota']
                fecha_entrega = entrega['Fecha_Trabajo']
                entrega_id = entrega['ID']

                # Obtener archivos entregados
                cursor.execute("""
                    SELECT ruta_archivo, nombre_original
                    FROM TrabajoEntregado_Archivo
                    WHERE trabajo_entregado_id = %s
                """, (entrega_id,))
                archivos_entregados = cursor.fetchall()

    except Exception as e:
        flash(f"Error al cargar el trabajo: {str(e)}", "danger")

    finally:
        conexion.close()

    return render_template('alumno/5.3verTrabajo.html',
                           trabajo=trabajo,
                           archivos=archivos,
                           aula_id=aula_id,
                           trabajo_id=trabajo_id,
                           comentarios_trabajo=comentarios_trabajo,
                           nota=nota,
                           fecha_entrega=fecha_entrega,
                           archivos_entregados=archivos_entregados) 
    
@alumno_bp.route('/comentar_trabajo/<int:trabajo_id>', methods=['POST'])
def comentar_trabajo(trabajo_id):
    aula_id = request.args.get('aula_id')
    usuario_id = session.get('usuario_id')

    if not usuario_id:
        flash('Debes iniciar sesión para comentar.', 'warning')
        return redirect(url_for('alumno_bp.verTrabajo', trabajo_id=trabajo_id, aula_id=aula_id))

    comentario = request.form.get('comentario')
    if not comentario:
        flash('No puedes enviar un comentario vacío.', 'warning')
        return redirect(url_for('alumno_bp.verTrabajo', trabajo_id=trabajo_id, aula_id=aula_id))

    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            cursor.execute("""
                INSERT INTO Comentario (trabajo_id, Descripcion, Fecha, usuario_id)
                VALUES (%s, %s, NOW(), %s)
            """, (trabajo_id, comentario, usuario_id))
            conexion.commit()
            flash('Comentario agregado con éxito.', 'success')
    except Exception as e:
        flash(f'Error al agregar comentario: {str(e)}', 'danger')

    return redirect(url_for('alumno_bp.verTrabajo', trabajo_id=trabajo_id, aula_id=aula_id))

@alumno_bp.route('/eliminar_comentario_trabajo/<int:id>', methods=['POST'])
def eliminar_comentario_trabajo(id):
    trabajo_id = request.args.get('trabajo_id')
    aula_id = request.args.get('aula_id')

    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            cursor.execute("DELETE FROM Comentario WHERE ID = %s", (id,))
            conexion.commit()
            flash('Comentario eliminado correctamente.', 'success')
    except Exception as e:
        flash(f'Error al eliminar comentario: {str(e)}', 'danger')

    return redirect(url_for('alumno_bp.verTrabajo', trabajo_id=trabajo_id, aula_id=aula_id))

@alumno_bp.route('/subir_trabajo', methods=['POST'])
def subir_trabajo():
    archivo = request.files.get('archivo')
    trabajo_id = request.form.get('trabajo_id')
    aula_id = request.form.get('aula_id')
    usuario_id = session.get('usuario_id')

    if not archivo or not trabajo_id or not aula_id:
        flash("Faltan datos para subir el archivo", "warning")
        return redirect(url_for('alumno_bp.verTrabajo', trabajo_id=trabajo_id, aula_id=aula_id))

    if archivo.filename == '':
        flash('No seleccionaste ningún archivo.', 'warning')
        return redirect(url_for('alumno_bp.verTrabajo', trabajo_id=trabajo_id, aula_id=aula_id))

    carpeta_destino = os.path.join(current_app.root_path, 'static', 'fotos')
    os.makedirs(carpeta_destino, exist_ok=True)

    ext = os.path.splitext(archivo.filename)[1]
    nuevo_nombre = f"{uuid.uuid4().hex}{ext}"
    ruta_guardado = os.path.join(carpeta_destino, nuevo_nombre)
    archivo.save(ruta_guardado)

    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            # Verificar si ya existe una entrega
            cursor.execute("""
                SELECT ID FROM TrabajoEntregado 
                WHERE trabajo_id = %s AND usuario_id = %s
            """, (trabajo_id, usuario_id))
            resultado = cursor.fetchone()

            hoy = datetime.today().date()

            if resultado:
                trabajo_entregado_id = resultado['ID']

                # Actualizar fecha del trabajo
                cursor.execute("""
                    UPDATE TrabajoEntregado SET Fecha_Trabajo = %s 
                    WHERE ID = %s
                """, (hoy, trabajo_entregado_id))
            else:
                # Crear nueva entrega
                cursor.execute("""
                    INSERT INTO TrabajoEntregado (Fecha_Trabajo, Nota, trabajo_id, usuario_id)
                    VALUES (%s, %s, %s, %s)
                """, (hoy, None, trabajo_id, usuario_id))
                trabajo_entregado_id = cursor.lastrowid

            # Guardar archivo
            cursor.execute("""
                INSERT INTO TrabajoEntregado_Archivo (trabajo_entregado_id, ruta_archivo, nombre_original)
                VALUES (%s, %s, %s)
            """, (trabajo_entregado_id, f"fotos/{nuevo_nombre}", archivo.filename))

        conexion.commit()
        flash('Archivo subido correctamente.', 'success')

    except Exception as e:
        conexion.rollback()
        flash(f'Error al subir archivo: {str(e)}', 'danger')

    finally:
        conexion.close()

    return redirect(url_for('alumno_bp.verTrabajo', trabajo_id=trabajo_id, aula_id=aula_id))

@alumno_bp.route('/cancelar_entrega', methods=['POST'])
def cancelar_entrega():
    trabajo_id = request.form.get('trabajo_id')
    aula_id = request.form.get('aula_id')
    usuario_id = session.get('usuario_id')

    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            # Obtener ID de la entrega
            cursor.execute("""
                SELECT ID FROM TrabajoEntregado
                WHERE trabajo_id = %s AND usuario_id = %s
            """, (trabajo_id, usuario_id))
            entrega = cursor.fetchone()

            if entrega:
                entrega_id = entrega['ID']

                # Eliminar archivos asociados
                cursor.execute("""
                    SELECT ruta_archivo FROM TrabajoEntregado_Archivo
                    WHERE trabajo_entregado_id = %s
                """, (entrega_id,))
                archivos = cursor.fetchall()

                for archivo in archivos:
                    ruta = os.path.join(current_app.root_path, 'static', archivo['ruta_archivo'])
                    if os.path.exists(ruta):
                        os.remove(ruta)

                cursor.execute("""
                    DELETE FROM TrabajoEntregado_Archivo
                    WHERE trabajo_entregado_id = %s
                """, (entrega_id,))

                # Eliminar la entrega
                cursor.execute("""
                    DELETE FROM TrabajoEntregado
                    WHERE ID = %s
                """, (entrega_id,))

        conexion.commit()
        flash("Entrega cancelada correctamente.", "success")
    except Exception as e:
        conexion.rollback()
        flash(f"Error al cancelar entrega: {str(e)}", "danger")
    finally:
        conexion.close()

    return redirect(url_for('alumno_bp.verTrabajo', trabajo_id=trabajo_id, aula_id=aula_id))

