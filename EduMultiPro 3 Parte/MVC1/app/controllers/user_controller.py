from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app
from werkzeug.security import check_password_hash  # Importa la función para comparar contraseñas encriptadas

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/login', methods=['GET'])
def mostrar_login():
    return render_template('1-login.html')

# Procesar login (POST)
@user_bp.route('/login', methods=['POST'])
def login():
    correo = request.form['Correo']
    contraseña = request.form['password']

    connection = current_app.connection

    with connection.cursor() as cursor:
        sql = """
            SELECT Usuario.*, Rol.Nombre_Rol
            FROM Usuario
            INNER JOIN Rol ON Usuario.rol_id = Rol.ID
            WHERE Usuario.Correo1=%s
        """
        cursor.execute(sql, (correo,))
        user = cursor.fetchone()

    if user and check_password_hash(user['Contraseña'], contraseña):
        rol = user['Nombre_Rol']

        if rol == 'Administrador':
            return redirect(url_for('admin_bp.usuario'))  # admin/2-usuario.html
        elif rol == 'Alumno':
            return redirect(url_for('alumno_bp.vista_alumno_principal'))
        elif rol == 'Profesor':
            return render_template('profesor/1-principalProfesor.html')
        elif rol == 'Coordinador':
            return render_template('coordinador/1-principal.html')
        else:
            flash('Rol no reconocido', 'danger')
            return redirect(url_for('user_bp.mostrar_login'))
    else:
        flash('Correo o contraseña incorrectos', 'danger')
        return render_template('1-login.html')