from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app, session
from flask import jsonify
from werkzeug.utils import secure_filename
import os
from werkzeug.security import generate_password_hash, check_password_hash

profesor_bp = Blueprint('profesor_bp', __name__, url_prefix='/profesor')

# rutas --------------------------------------------------------------------- rutas

@profesor_bp.route('/1-login')
def login():
    return render_template('1-login.html')

@profesor_bp.route('/1-principalProfesor')
def principal():
    return render_template('profesor/1-principalProfesor.html')

@profesor_bp.route('/1-principalProfesor')
def inicio():
    return render_template('profesor/1-principalProfesor.html')

# noticias --------------------------------------------------------------------- noticias
@profesor_bp.route('/2-noticias')
def noticias():
    return render_template('profesor/2-noticias.html')

@profesor_bp.route('/3-ApartadoNoticia')
def articulo_completo():
    return render_template('profesor/3-ApartadoNoticia.html')

@profesor_bp.route('/3-ApartadoNoticia')
def articulo_completo2():
    return render_template('profesor/3-ApartadoNoticia.html')

# horarios --------------------------------------------------------------------- horarios
@profesor_bp.route('/4-horario')
def horarios():
    return render_template('profesor/4-horario.html')

# aula --------------------------------------------------------------------- aula

@profesor_bp.route('/editar-aula/<string:id>', methods=['GET', 'POST'])
def editar_aula(id):
    connection = current_app.connection
    
    if request.method == 'GET':
        try:
            with connection.cursor() as cursor:
                # Obtener los datos del aula
                cursor.execute("""
                    SELECT ID, Aula_Nombre, materia_id, curso_id, usuario_id
                    FROM Aula
                    WHERE ID = %s
                """, (id,))
                aula = cursor.fetchone()
                
                if not aula:
                    flash('Aula no encontrada', 'danger')
                    return redirect(url_for('profesor_bp.aula'))
                
                # Obtener materias, cursos y profesores para los select
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
                
            return render_template('profesor/editar_aula.html', 
                                 aula=aula,
                                 materias=materias,
                                 cursos=cursos,
                                 profesores=profesores)
            
        except Exception as e:
            flash(f'Error al obtener datos del aula: {str(e)}', 'danger')
            return redirect(url_for('profesor_bp.aula'))
    
    elif request.method == 'POST':
        aula_nombre = request.form['aula_nombre']
        materia_id = request.form['materia_id']
        curso_id = request.form['curso_id']
        usuario_id = request.form['usuario_id']
        
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    UPDATE Aula 
                    SET Aula_Nombre = %s, materia_id = %s, curso_id = %s, usuario_id = %s
                    WHERE ID = %s
                """, (aula_nombre, materia_id, curso_id, usuario_id, id))
                
            connection.commit()
            flash('Aula actualizada correctamente', 'success')
        except Exception as e:
            connection.rollback()
            flash(f'Error al actualizar aula: {str(e)}', 'danger')
        
        return redirect(url_for('profesor_bp.aula'))

@profesor_bp.route('/guardar-aula', methods=['POST'])
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

    return redirect(url_for('profesor_bp.aula'))

@profesor_bp.route('/5-aula')
def aula():
    connection = current_app.connection
    aulas = []
    materias = []
    cursos = []
    profesores = []

    try:
        with connection.cursor() as cursor:
            # Obtener aulas
            cursor.execute("""
                SELECT Aula.ID, Aula.Aula_Nombre, Materia.Materia_Nombre, Curso.Curso_Nombre, 
                CONCAT(Usuario.Primer_Nombre, ' ', Usuario.Primer_Apellido) AS Profesor
                FROM Aula
                JOIN Materia ON Aula.materia_id = Materia.ID
                JOIN Curso ON Aula.curso_id = Curso.ID
                JOIN Usuario ON Aula.usuario_id = Usuario.ID
            """)
            aulas = cursor.fetchall()

            # Obtener materias, cursos y profesores para el modal
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

    return render_template('profesor/5-aula.html', 
                         aulas=aulas,
                         materias=materias,
                         cursos=cursos,
                         profesores=profesores)

@profesor_bp.route('/eliminar_aula/<string:id>', methods=['POST'])
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
    
    return redirect(url_for('profesor_bp.aula'))

@profesor_bp.route('/6-trabajo')
def informacion():
    return render_template('profesor/6-trabajo.html')

# calificaciones --------------------------------------------------------------------- calificaciones

@profesor_bp.route('/13-calificaciones')
def calificaciones():
    return render_template('profesor/13-calificaciones.html')

@profesor_bp.route('/Usuario')
def usuarios():
    return render_template('profesor/Usuario.html')

@profesor_bp.route('/1-login.html')
def cerrar():
    return render_template('1-login.html.html')

# botones2 --------------------------------------------------------------------- botones2

@profesor_bp.route('/6-trabajo')
def principal2():
    return render_template('profesor/6-trabajo.html')

# listaTrabajos --------------------------------------------------------------------- listaTrabajos

# Configuración de extensiones permitidas
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@profesor_bp.route('/7-listaTrabajo')
def trabajos():
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            # Obtener lista de trabajos
            cursor.execute("""
                SELECT ID, Titulo_Trabajo AS Titulo, Tema_Trabajo AS Tema, 
                       Fecha_Trabajo AS Fecha, Archivo_Trabajo AS archivo
                FROM Trabajo
                ORDER BY Fecha_Trabajo DESC
            """)
            trabajos = cursor.fetchall()
            
    except Exception as e:
        flash(f'Error al obtener trabajos: {str(e)}', 'danger')
        trabajos = []
    
    return render_template('profesor/7-listaTrabajo.html', trabajos=trabajos)

@profesor_bp.route('/crear-trabajo', methods=['POST'])
def crear_trabajo():
    connection = current_app.connection
    titulo = request.form.get('titulo')
    tema = request.form.get('tema')
    fecha = request.form.get('fecha')
    
    # Manejo de archivo
    archivo = request.files.get('archivo')
    nombre_archivo = None
    
    if archivo and allowed_file(archivo.filename):
        nombre_archivo = secure_filename(archivo.filename)
        ruta_archivo = os.path.join(current_app.config['UPLOAD_FOLDER'], nombre_archivo)
        archivo.save(ruta_archivo)
    
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO Trabajo (Titulo_Trabajo, Tema_Trabajo, Fecha_Trabajo, Archivo_Trabajo)
                VALUES (%s, %s, %s, %s)
            """, (titulo, tema, fecha, nombre_archivo))
            
        connection.commit()
        flash('Trabajo creado exitosamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al crear trabajo: {str(e)}', 'danger')
    
    return redirect(url_for('profesor_bp.trabajos'))

@profesor_bp.route('/eliminar-trabajo/<int:id>', methods=['POST'])
def eliminar_trabajo(id):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            # Obtener información del archivo para eliminarlo
            cursor.execute("SELECT Archivo_Trabajo FROM Trabajo WHERE ID = %s", (id,))
            trabajo = cursor.fetchone()
            
            if trabajo and trabajo['Archivo_Trabajo']:
                ruta_archivo = os.path.join(current_app.config['UPLOAD_FOLDER'], trabajo['Archivo_Trabajo'])
                if os.path.exists(ruta_archivo):
                    os.remove(ruta_archivo)
            
            # Eliminar el trabajo
            cursor.execute("DELETE FROM Trabajo WHERE ID = %s", (id,))
            
        connection.commit()
        flash('Trabajo eliminado exitosamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al eliminar trabajo: {str(e)}', 'danger')
    
    return redirect(url_for('profesor_bp.trabajos'))

@profesor_bp.route('/editar-trabajo/<int:id>', methods=['GET', 'POST'])
def editar_trabajo(id):
    connection = current_app.connection
    
    if request.method == 'GET':
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT ID, Titulo_Trabajo AS Titulo, Tema_Trabajo AS Tema, 
                           Fecha_Trabajo AS Fecha, Archivo_Trabajo AS archivo
                    FROM Trabajo
                    WHERE ID = %s
                """, (id,))
                trabajo = cursor.fetchone()
                
            if not trabajo:
                flash('Trabajo no encontrado', 'danger')
                return redirect(url_for('profesor_bp.trabajos'))
                
            return render_template('profesor/editar_trabajo.html', trabajo=trabajo)
            
        except Exception as e:
            flash(f'Error al obtener trabajo: {str(e)}', 'danger')
            return redirect(url_for('profesor_bp.trabajos'))
    
    elif request.method == 'POST':
        titulo = request.form.get('titulo')
        tema = request.form.get('tema')
        fecha = request.form.get('fecha')
        archivo_actual = request.form.get('archivo_actual')
        
        # Manejo de archivo
        archivo = request.files.get('archivo')
        nombre_archivo = archivo_actual
        
        if archivo and allowed_file(archivo.filename):
            # Eliminar archivo anterior si existe
            if archivo_actual:
                ruta_archivo = os.path.join(current_app.config['UPLOAD_FOLDER'], archivo_actual)
                if os.path.exists(ruta_archivo):
                    os.remove(ruta_archivo)
            
            # Guardar nuevo archivo
            nombre_archivo = secure_filename(archivo.filename)
            ruta_archivo = os.path.join(current_app.config['UPLOAD_FOLDER'], nombre_archivo)
            archivo.save(ruta_archivo)
        
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    UPDATE Trabajo 
                    SET Titulo_Trabajo = %s, Tema_Trabajo = %s, 
                        Fecha_Trabajo = %s, Archivo_Trabajo = %s
                    WHERE ID = %s
                """, (titulo, tema, fecha, nombre_archivo, id))
                
            connection.commit()
            flash('Trabajo actualizado exitosamente', 'success')
        except Exception as e:
            connection.rollback()
            flash(f'Error al actualizar trabajo: {str(e)}', 'danger')
        
        return redirect(url_for('profesor_bp.trabajos'))

# personas --------------------------------------------------------------------- personas

@profesor_bp.route('/9-personas')
def personas():
    connection = current_app.connection
    alumnos_por_clase = []
    
    try:
        with connection.cursor() as cursor:
            # Obtener todos los cursos para mostrar en un selector
            cursor.execute("SELECT ID, Curso_Nombre FROM Curso")
            cursos = cursor.fetchall()
            
            # Obtener el curso_id del parámetro de la URL (si existe)
            curso_id = request.args.get('curso_id')
            
            if curso_id:
                # Obtener alumnos del curso seleccionado
                cursor.execute("""
                    SELECT u.ID, CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) AS alumno, u.Correo1
                    FROM Usuario u
                    JOIN Miembros_Curso mc ON u.ID = mc.usuario_id
                    WHERE mc.curso_id = %s AND u.rol_id = 'R001'
                    ORDER BY u.Primer_Apellido, u.Primer_Nombre
                """, (curso_id,))
                alumnos_por_clase = cursor.fetchall()
                
                # Obtener el nombre del curso seleccionado
                cursor.execute("SELECT Curso_Nombre FROM Curso WHERE ID = %s", (curso_id,))
                curso_seleccionado = cursor.fetchone()
            else:
                curso_seleccionado = None

    except Exception as e:
        flash(f'Error al obtener datos: {str(e)}', 'danger')

    return render_template('profesor/9-personas.html', 
                         alumnos=alumnos_por_clase, 
                         cursos=cursos, 
                         curso_seleccionado=curso_seleccionado)

@profesor_bp.route('/modificar_persona/<int:id>', methods=['POST'])
def modificar_persona(id):
    # Aquí iría la lógica para modificar un alumno
    flash('Alumno modificado correctamente', 'success')
    return redirect(url_for('profesor_bp.personas', curso_id=request.args.get('curso_id')))

@profesor_bp.route('/eliminar_persona/<int:id>', methods=['POST'])
def eliminar_persona(id):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            # Eliminar de Miembros_Curso primero por las restricciones de clave foránea
            cursor.execute("DELETE FROM Miembros_Curso WHERE usuario_id = %s", (id,))
            # Luego eliminar el usuario
            cursor.execute("DELETE FROM Usuario WHERE ID = %s", (id,))
        connection.commit()
        flash('Alumno eliminado correctamente', 'success')
    except Exception as e:
        connection.rollback()
        flash(f'Error al eliminar alumno: {str(e)}', 'danger')
    
    return redirect(url_for('profesor_bp.personas', curso_id=request.args.get('curso_id')))

# notas --------------------------------------------------------------------- notas

@profesor_bp.route('/notas')
def notas():
    connection = current_app.connection
    estudiantes = []
    trabajos = []
    notas_data = []
    
    try:
        with connection.cursor() as cursor:
            # Obtener estudiantes (rol R001 es alumno según la base de datos)
            cursor.execute("""
                SELECT ID, CONCAT(Primer_Nombre, ' ', Primer_Apellido) AS Nombre 
                FROM Usuario 
                WHERE rol_id = 'R001'
            """)
            estudiantes = cursor.fetchall()
            
            # Obtener trabajos con información del aula
            cursor.execute("""
                SELECT t.ID, t.Titulo_Trabajo, a.Aula_Nombre 
                FROM Trabajo t
                JOIN Aula a ON t.aula_id = a.ID
            """)
            trabajos = cursor.fetchall()
            
            # Obtener notas con información de estudiantes, trabajos y aulas
            cursor.execute("""
                SELECT nt.ID, 
                       CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) AS Estudiante,
                       t.Titulo_Trabajo AS Trabajo,
                       a.Aula_Nombre AS Aula,
                       nt.Nota,
                       nt.usuario_id,
                       nt.trabajo_id
                FROM Nota_Trabajo nt
                JOIN Usuario u ON nt.usuario_id = u.ID
                JOIN Trabajo t ON nt.trabajo_id = t.ID
                JOIN Aula a ON t.aula_id = a.ID
            """)
            notas_data = cursor.fetchall()
            
    except Exception as e:
        flash(f'Error al obtener datos: {str(e)}', 'danger')
    
    return render_template('profesor/10-notas.html', 
                         estudiantes=estudiantes, 
                         trabajos=trabajos, 
                         notas=notas_data)

@profesor_bp.route('/crear_nota', methods=['POST'])
def crear_nota():
    connection = current_app.connection
    usuario_id = request.form['usuario_id']
    trabajo_id = request.form['trabajo_id']
    nota = request.form['nota']
    
    try:
        with connection.cursor() as cursor:
            # Verificar si ya existe una nota para este estudiante y trabajo
            cursor.execute("""
                SELECT ID FROM Nota_Trabajo 
                WHERE usuario_id = %s AND trabajo_id = %s
            """, (usuario_id, trabajo_id))
            existe = cursor.fetchone()
            
            if existe:
                flash('Ya existe una nota para este estudiante y trabajo', 'warning')
            else:
                cursor.execute("""
                    INSERT INTO Nota_Trabajo (Nota, trabajo_id, usuario_id)
                    VALUES (%s, %s, %s)
                """, (nota, trabajo_id, usuario_id))
                connection.commit()
                flash('Nota creada correctamente', 'success')
                
    except Exception as e:
        connection.rollback()
        flash(f'Error al crear nota: {str(e)}', 'danger')
    
    return redirect(url_for('profesor_bp.notas'))

@profesor_bp.route('/eliminar_nota/<int:id>', methods=['POST'])
def eliminar_nota(id):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM Nota_Trabajo WHERE ID = %s", (id,))
        connection.commit()
        return jsonify({'success': True, 'message': 'Nota eliminada correctamente'})
    except Exception as e:
        connection.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@profesor_bp.route('/obtener_nota/<int:id>')
def obtener_nota(id):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT nt.ID, nt.usuario_id, nt.trabajo_id, nt.Nota,
                       CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) AS Estudiante,
                       t.Titulo_Trabajo AS Trabajo
                FROM Nota_Trabajo nt
                JOIN Usuario u ON nt.usuario_id = u.ID
                JOIN Trabajo t ON nt.trabajo_id = t.ID
                WHERE nt.ID = %s
            """, (id,))
            nota = cursor.fetchone()
            
            if nota:
                return jsonify({
                    'success': True,
                    'data': {
                        'id': nota['ID'],
                        'usuario_id': nota['usuario_id'],
                        'trabajo_id': nota['trabajo_id'],
                        'nota': nota['Nota'],
                        'estudiante': nota['Estudiante'],
                        'trabajo': nota['Trabajo']
                    }
                })
            else:
                return jsonify({'success': False, 'message': 'Nota no encontrada'}), 404
                
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@profesor_bp.route('/actualizar_nota', methods=['POST'])
def actualizar_nota():
    connection = current_app.connection
    nota_id = request.form['nota_id']
    usuario_id = request.form['usuario_id']
    trabajo_id = request.form['trabajo_id']
    nota = request.form['nota']
    
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                UPDATE Nota_Trabajo 
                SET Nota = %s, trabajo_id = %s, usuario_id = %s
                WHERE ID = %s
            """, (nota, trabajo_id, usuario_id, nota_id))
        connection.commit()
        return jsonify({'success': True, 'message': 'Nota actualizada correctamente'})
    except Exception as e:
        connection.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500