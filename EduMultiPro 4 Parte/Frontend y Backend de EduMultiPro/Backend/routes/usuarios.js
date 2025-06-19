const express = require("express");
const router = express.Router();
const conexion = require("../db/conexion");
const bcrypt = require('bcryptjs');

const multer = require('multer');
const path = require('path');

// Configurar almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imagenes'); // Carpeta donde se guardan
  },
  filename: function (req, file, cb) {
    const nombreArchivo = Date.now() + path.extname(file.originalname); // Ej: 162534.png
    cb(null, nombreArchivo);
  }
});

const upload = multer({ storage });

//Controlador del Login
router.post('/login', (req, res) => {
  const { correo, contrasena } = req.body;

  const query = 'SELECT * FROM Usuario WHERE Correo1 = ?';
  conexion.query(query, [correo], (error, resultados) => {
    if (error) {
      console.error('❌ Error en el servidor:', error);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    if (resultados.length === 0) {
      return res.status(401).json({ mensaje: 'Correo no registrado' });
    }

    const usuario = resultados[0];

    // Comparar la contraseña ingresada con el hash
    bcrypt.compare(contrasena, usuario.Contraseña, (err, coinciden) => {
      if (err) {
        console.error('❌ Error al comparar contraseñas:', err);
        return res.status(500).json({ mensaje: 'Error al procesar contraseña' });
      }

      if (coinciden) {
        res.json({ mensaje: 'Login exitoso', usuario: { id: usuario.ID, nombre: usuario.Primer_Nombre } });
      } else {
        res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }
    });
  });
});

// Obtener todos los usuarios
router.get("/Usuarios", (req, res) => {
    const query = `
        SELECT ID, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido 
        FROM Usuario
    `;
    conexion.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error en la base de datos" });
        } else {
            res.json(results);
        }
    });
});

//Eliminar Usuario
router.delete("/usuarios/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM Usuario WHERE ID = ?";
  conexion.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).json({ mensaje: "Error al eliminar el usuario" });
    } else {
      res.json({ mensaje: "Usuario eliminado exitosamente" });
    }
  });
});

//Crear Usuario
router.post("/crearUsuario", upload.single("foto"), (req, res) => {
  console.log("📥 Datos recibidos:", req.body);
  console.log("📸 Archivo recibido:", req.file);

  let {
    id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
    correo1, contrasena, correo2, contacto1, contacto2,
    fecha_nacimiento, rol_id, documento_id
  } = req.body;

  console.log("🔐 Contraseña original:", contrasena);

  const rutaFoto = req.file ? req.file.filename : null;

  // Asegurar que los campos opcionales tengan valor nulo si están vacíos
  segundo_nombre = segundo_nombre || null;
  segundo_apellido = segundo_apellido || null;
  correo2 = correo2 || null;
  contacto2 = contacto2 || null;

  if (!contrasena) {
    return res.status(400).json({ mensaje: "Contraseña no proporcionada" });
  }

  // Encriptar la contraseña
  const hash = bcrypt.hashSync(contrasena, 10);

  const query = `
    INSERT INTO Usuario (
      ID, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido,
      Correo1, Contraseña, Correo2, Contacto1, Contacto2,
      Fecha_Nacimiento, RutaFoto, rol_id, documento_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  conexion.query(query, [
    id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
    correo1, hash, correo2, contacto1, contacto2,
    fecha_nacimiento, rutaFoto, rol_id, documento_id
  ], (error, resultado) => {
    if (error) {
      console.error("❌ Error MySQL:", error);
      res.status(500).json({ mensaje: "Error al crear usuario" });
    } else {
      res.json({ mensaje: "✅ Usuario creado correctamente" });
    }
  });
});

router.get("/roles", (req, res) => {
  conexion.query("SELECT ID, Nombre_Rol FROM Rol", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener roles" });
    res.json(results);
  });
});

router.get("/documentos", (req, res) => {
  conexion.query("SELECT ID, Tipo_Documento FROM Documento", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener tipos de documento" });
    res.json(results);
  });
});

// buscar usuario por id
router.get("/verUsuario/:id", (req, res) => {
  const id = req.params.id;

  const queryUsuario = `
    SELECT u.ID, u.documento_id, d.Tipo_Documento AS Documento, u.Primer_Nombre, u.Segundo_Nombre,
           u.Primer_Apellido, u.Segundo_Apellido, u.Correo1, u.rol_id, r.Nombre_Rol AS Rol,
           u.Correo2, u.Contacto1, u.Contacto2, u.Fecha_Nacimiento, u.RutaFoto
    FROM Usuario u
    LEFT JOIN Documento d ON u.documento_id = d.ID
    LEFT JOIN Rol r ON u.rol_id = r.ID
    WHERE u.ID = ?
  `;

  conexion.query(queryUsuario, [id], (error, usuario) => {
    if (error || usuario.length === 0) {
      return res.status(500).json({ mensaje: "❌ Error al obtener usuario" });
    }

    // 👉 Formatear la fecha para que React la acepte en el input type="date"
    if (usuario[0].Fecha_Nacimiento instanceof Date) {
      usuario[0].Fecha_Nacimiento = usuario[0].Fecha_Nacimiento.toISOString().split('T')[0];
    }

    // Consultar roles y documentos
    const queryRoles = "SELECT ID, Nombre_Rol FROM Rol";
    const queryDocs = "SELECT ID, Tipo_Documento FROM Documento";

    conexion.query(queryRoles, (errorRoles, roles) => {
      if (errorRoles) return res.status(500).json({ mensaje: "Error al obtener roles" });

      conexion.query(queryDocs, (errorDocs, documentos) => {
        if (errorDocs) return res.status(500).json({ mensaje: "Error al obtener documentos" });

        res.json({
          usuario: usuario[0],
          roles,
          documentos
        });
      });
    });
  });
});

// Actualizar Usuario
router.post("/actualizarUsuario", upload.single("RutaFoto"), (req, res) => {
  const {
  usuario_id, documento_id, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido,
  Correo1, rol_id, Correo2, Contacto1, Contacto2, Fecha_Nacimiento, contrasena
  } = req.body;
  const nuevaFoto = req.file ? req.file.filename : null;

  const updates = [];
  const valores = [];

  if (Primer_Nombre) { updates.push("Primer_Nombre = ?"); valores.push(Primer_Nombre); }
  if (Segundo_Nombre) { updates.push("Segundo_Nombre = ?"); valores.push(Segundo_Nombre); }
  if (Primer_Apellido) { updates.push("Primer_Apellido = ?"); valores.push(Primer_Apellido); }
  if (Segundo_Apellido) { updates.push("Segundo_Apellido = ?"); valores.push(Segundo_Apellido); }
  if (Correo1) { updates.push("Correo1 = ?"); valores.push(Correo1); }
  if (Correo2) { updates.push("Correo2 = ?"); valores.push(Correo2); }
  if (Contacto1) { updates.push("Contacto1 = ?"); valores.push(Contacto1); }
  if (Contacto2) { updates.push("Contacto2 = ?"); valores.push(Contacto2); }
  if (Fecha_Nacimiento) { updates.push("Fecha_Nacimiento = ?"); valores.push(Fecha_Nacimiento); }
  if (rol_id) { updates.push("rol_id = ?"); valores.push(rol_id); }
  if (documento_id) { updates.push("documento_id = ?"); valores.push(documento_id); }
  if (nuevaFoto) { updates.push("RutaFoto = ?"); valores.push(nuevaFoto); }
  if (contrasena && contrasena.trim() !== "") {
  const hash = bcrypt.hashSync(contrasena, 10);
    updates.push("Contraseña = ?");
    valores.push(hash);
  }

  if (updates.length === 0) {
    return res.status(400).json({ mensaje: "No se recibieron datos para actualizar" });
  }

  const query = `UPDATE Usuario SET ${updates.join(", ")} WHERE ID = ?`;
  valores.push(usuario_id);

  conexion.query(query, valores, (error) => {
    if (error) {
      console.error("❌ Error al actualizar:", error);
      return res.status(500).json({ mensaje: "Error al actualizar usuario" });
    }

    res.json({ mensaje: "✅ Usuario actualizado correctamente" });
  });
});

module.exports = router;