const mysql = require("mysql2");

/**
 * @swagger
 * components:
 *   schemas:
 *     DatabaseConnection:
 *       type: object
 *       properties:
 *         host:
 *           type: string
 *           description: "Dirección del host de la base de datos. Ejemplo: '127.0.0.1'"
 *         user:
 *           type: string
 *           description: "El nombre de usuario para la conexión a la base de datos."
 *         password:
 *           type: string
 *           description: "La contraseña para el usuario de la base de datos."
 *         database:
 *           type: string
 *           description: "El nombre de la base de datos a la que se conecta."
 *         port:
 *           type: integer
 *           description: "El puerto de conexión de la base de datos (por defecto: 3306)."
 */

/**
 * @swagger
 * /database/connection:
 *   get:
 *     summary: Obtener detalles de la conexión a la base de datos
 *     description: "Devuelve los parámetros de conexión a la base de datos y su estado de conexión."
 *     responses:
 *       200:
 *         description: "Detalles de la conexión a la base de datos."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 host:
 *                   type: string
 *                   example: "127.0.0.1"
 *                 user:
 *                   type: string
 *                   example: "root"
 *                 password:
 *                   type: string
 *                   example: ""
 *                 database:
 *                   type: string
 *                   example: "EduMultiPro"
 *                 port:
 *                   type: integer
 *                   example: 3306
 *       500:
 *         description: "Error de conexión a la base de datos"
 */

const conexion = mysql.createConnection({
    host: "127.0.0.1",   // Dirección del host
    user: "root",        // Usuario para la conexión
    password: "",        // Contraseña del usuario
    database: "EduMultiPro", // Nombre de la base de datos
    port: 3306,          // Puerto de conexión (default para MySQL)
});

// Conexión a la base de datos
conexion.connect(error => {
    if (error) {
        console.error("❌ Error de conexión:", error);
        throw error;
    }
    console.log("✅ Conexión a la base de datos exitosa");
});

module.exports = conexion;
