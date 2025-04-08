# Vamos a definir la lógica para el registro, login y perfil, utilizando consultas SQL manuales.
# Este código se conecta directamente a la base de datos y ejecuta consultas SQL para el login, registro, y el perfil de usuario.

from flask import Blueprint, render_template, request, redirect, url_for, current_app, session
from flask_bcrypt import Bcrypt

user_bp = Blueprint('user_bp', __name__)
bcrypt = Bcrypt()


@user_bp.route('/login', methods=['GET', 'POST'])
def login():
    connection = current_app.connection

    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT password FROM Usuario WHERE Correo=%s", (email,))
                result = cursor.fetchone()

                if result and bcrypt.check_password_hash(result['password'], password):
                    session['user_email'] = email
                    return redirect(url_for('user_bp.profile'))
                else:
                    return "Login Failed"
        except Exception as e:
            return str(e)

    return render_template('login.html')


@user_bp.route('/register', methods=['GET', 'POST'])
def register():
    connection = current_app.connection

    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        role_id = request.form['role']

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        try:
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO Usuario (ID, Nombre, Correo, Password, Rol_ID) VALUES (UUID(), %s, %s, %s, %s)",
                               (name, email, hashed_password, role_id))
                connection.commit()
            return redirect(url_for('user_bp.login'))
        except Exception as e:
            return str(e)

    # Obtener los roles de la tabla Rol (para el select del registro)
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT ID, Nombre_Rol FROM Rol")
            roles = cursor.fetchall()
    except Exception as e:
        return str(e)

    return render_template('register.html', roles=roles)