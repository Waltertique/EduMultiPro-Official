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
        sql = "SELECT * FROM Usuario WHERE Correo1=%s"  # No incluimos la contraseña en la consulta
        cursor.execute(sql, (correo,))
        user = cursor.fetchone()

    if user and check_password_hash(user['Contraseña'], contraseña):  # Comparar con la contraseña encriptada
        return redirect(url_for('profesor_bp.principal'))  # Redirigir al dashboard o página de usuario
    else:
        flash('Correo o contraseña incorrectos', 'danger')  # Mostrar mensaje de error
        return render_template('1-login.html')