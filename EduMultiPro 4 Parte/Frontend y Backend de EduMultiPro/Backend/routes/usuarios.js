const express = require("express");
const router = express.Router();
const conexion = require("../db/conexion");
const bcrypt = require('bcrypt');

// Ejemplo: Obtener todos los usuarios
router.get("/", (req, res) => {
    conexion.query("SELECT Primer_Nombre FROM Usuario", (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error en la base de datos" });
        } else {
            res.json(results);
        }
    });
});

router.post('/login', (req, res) => {
    const { correo, contrasena } = req.body;

    const query = 'SELECT * FROM Usuario WHERE Correo1 = ? AND Contraseña = ?';
    conexion.query(query, [correo, contrasena], (error, resultados) => {
        if (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        } else if (resultados.length > 0) {
            res.json({ mensaje: 'Login exitoso' });
        } else {
            res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }
    });
})


module.exports = router;