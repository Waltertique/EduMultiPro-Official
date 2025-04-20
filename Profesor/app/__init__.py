from flask import Flask
import pymysql.cursors
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    try:
        connection = pymysql.connect(
            host=app.config['MYSQL_HOST'],
            user=app.config['MYSQL_USER'],
            password=app.config['MYSQL_PASSWORD'],
            database=app.config['MYSQL_DB'],
            cursorclass=pymysql.cursors.DictCursor
        )
        print("✔ Conexión a MySQL exitosa.")
    except Exception as e:
        print("❌ Error al conectar a MySQL:", e)
        connection = None

    from app.controllers.main_controller import main_bp
    from app.controllers.user_controller import user_bp
    from app.controllers.profesor_controller import profesor_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(profesor_bp)

    app.connection = connection

    return app