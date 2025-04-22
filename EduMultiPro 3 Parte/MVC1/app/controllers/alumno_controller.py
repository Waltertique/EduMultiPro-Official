from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app
from flask import jsonify
from werkzeug.utils import secure_filename
import os
from werkzeug.security import generate_password_hash, check_password_hash

alumno_bp = Blueprint('alumno_bp', __name__, url_prefix='/alumno')

@alumno_bp.route('/1-principal')
def inicio():
    return render_template('alumno/1-principal.html')

@alumno_bp.route('/7-perfil')
def perfil():
    return render_template('alumno/7-perfil.html')

@alumno_bp.route('/3-horario')
def horario():
    return render_template('alumno/3-horario.html')

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


@alumno_bp.route('/2.2verNoticia')
def verNoticia():
    return render_template('alumno/2.2verNoticia.html')