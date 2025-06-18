const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PUERTO = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/usuarios", require("./routes/usuarios"));

// Ruta principal
app.get("/", (req, res) => {
    res.send("Hola desde el servidor");
});

app.listen(PUERTO, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PUERTO}`);
});
