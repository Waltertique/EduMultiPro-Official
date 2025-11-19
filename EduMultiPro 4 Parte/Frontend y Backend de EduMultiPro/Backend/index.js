const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PUERTO = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/edumultipro", require("./routes/usuarios"));

// Ruta principal
app.get("/", (req, res) => {
    res.send("Hola desde el servidor");
});

app.listen(PUERTO, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PUERTO}`);
});

const path = require("path");
<<<<<<< HEAD
app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));
=======
app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));

module.exports = app; // <- EXPORTAR para tests
>>>>>>> origin/ramajohan
