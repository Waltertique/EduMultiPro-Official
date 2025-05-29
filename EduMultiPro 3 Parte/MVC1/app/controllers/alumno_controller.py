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
        flash('No se encontró un horario para tu curso.', 'danger')
        return redirect(url_for('alumno_bp.vista_alumno_principal'))

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