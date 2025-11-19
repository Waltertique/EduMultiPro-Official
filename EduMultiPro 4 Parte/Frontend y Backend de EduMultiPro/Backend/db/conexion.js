const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
<<<<<<< HEAD
    password: "SENA",
=======
    password: "4580",
>>>>>>> origin/ramajohan
    database: "EduMultiPro",
});

conexion.connect(error => {
    if (error) throw error;
    console.log("✅ Conexión a la base de datos exitosa");
});

module.exports = conexion;