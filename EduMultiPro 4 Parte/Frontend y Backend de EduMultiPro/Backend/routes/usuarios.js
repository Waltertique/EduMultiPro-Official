const express = require("express");
const router = express.Router();
const conexion = require("../db/conexion");
const bcrypt = require('bcryptjs');

//JSON WEB TOKEN
const jwt = require('jsonwebtoken');
const JWT_SECRETO = 'mi_clave_super_secreta';

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

const verificarToken = (req, res, next) => { //Sirve para verificar si el cliente (frontend) envió un token válido en la solicitud
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //sirve para obtener solo el token

  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

  jwt.verify(token, JWT_SECRETO, (err, usuario) => {
    if (err) return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    req.usuario = usuario; // se guarda en la petición
    next();
  });
};

router.get('/perfil', verificarToken, (req, res) => { //Esta ruta está protegida por el middleware verificarToken. Si el token es válido, responde con el mensaje y los datos del usuario.
  res.json({ mensaje: 'Acceso a perfil autorizado', usuario: req.usuario });
});

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

    bcrypt.compare(contrasena, usuario.Contraseña, (err, coinciden) => {
      if (err) {
        console.error('❌ Error al comparar contraseñas:', err);
        return res.status(500).json({ mensaje: 'Error al procesar contraseña' });
      }

      if (coinciden) {
        const payload = {
          id: usuario.ID,
          nombre: usuario.Primer_Nombre,
          rol: usuario.rol_id
        };

        // Crear token sin duración
        const token = jwt.sign(payload, JWT_SECRETO); // ✅ Sin expiración

        res.json({
          mensaje: 'Login exitoso',
          token,
          usuario: payload
        });
      } else {
        res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }
    });
  });
});

//CAMBIAR CONTRASEÑA
router.put("/cambiar-contrasena", (req, res) => {
  const { id, correo1, nuevaContraseña, confirmarContraseña } = req.body;

  if (nuevaContraseña !== confirmarContraseña) {
    return res.status(400).json({ error: "Las contraseñas no coinciden." });
  }

  const checkUser = "SELECT * FROM Usuario WHERE ID = ? AND Correo1 = ?";
  conexion.query(checkUser, [id, correo1], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos." });
    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const hash = bcrypt.hashSync(nuevaContraseña, 10); // 🔒 Encriptamos antes de guardar

    const updateQuery = "UPDATE Usuario SET Contraseña = ? WHERE ID = ?";
    conexion.query(updateQuery, [hash, id], (err2) => {
      if (err2) {
        console.error("❌ Error al actualizar contraseña:", err2);
        return res.status(500).json({ error: "Error al actualizar la contraseña." });
      }

      return res.json({ mensaje: "✅ Contraseña actualizada correctamente" });
    });
  });
});

//---------------------------------------------------------------------------------------------------------

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

//---------------------------------------------------------------------------------------------------------

// Obtener todos los cursos
router.get("/Cursos", (req, res) => {
  const query = `
    SELECT c.ID, c.Curso_Nombre, g.Grado_Nombre, j.Jornada_Nombre
    FROM Curso c
    INNER JOIN Grado g ON c.grado_id = g.ID
    INNER JOIN Jornada j ON c.jornada_id = j.ID
  `;
  conexion.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error en la base de datos" });
    } else {
      res.json(results);
    }
  });
});

// Eliminar curso
router.delete("/Cursos/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM Curso WHERE ID = ?";
  conexion.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).json({ mensaje: "Error al eliminar el curso" });
    } else {
      res.json({ mensaje: "Curso eliminado exitosamente" });
    }
  });
});

// Actualizar curso
router.put("/Cursos/:id", (req, res) => {
  const { id } = req.params;
  const { Curso_Nombre, grado_id, jornada_id } = req.body;

  const query = `
    UPDATE Curso
    SET Curso_Nombre = ?, grado_id = ?, jornada_id = ?
    WHERE ID = ?
  `;

  conexion.query(query, [Curso_Nombre, grado_id, jornada_id, id], (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error al actualizar el curso" });
    } else {
      res.json({ mensaje: "Curso actualizado correctamente" });
    }
  });
});

// Crear curso
router.post("/Cursos", (req, res) => {
  const { Curso_Nombre, grado_id, jornada_id } = req.body;

  const query = `
    INSERT INTO Curso (Curso_Nombre, grado_id, jornada_id)
    VALUES (?, ?, ?)
  `;

  conexion.query(query, [Curso_Nombre, grado_id, jornada_id], (error, result) => {
    if (error) {
      res.status(500).json({ mensaje: "Error al crear el curso" });
    } else {
      res.json({ mensaje: "Curso creado correctamente", id: result.insertId });
    }
  });
});

// Obtener integrantes de un curso específico
router.get("/Cursos/:id/integrantes", (req, res) => {
  const idCurso = req.params.id;

  const sql = `
    SELECT u.ID, u.Primer_Nombre, u.Segundo_Nombre, u.Primer_Apellido, u.Segundo_Apellido
    FROM Usuario u
    INNER JOIN Miembros_Curso mc ON u.ID = mc.usuario_id
    WHERE mc.curso_id = ?
  `;

  conexion.query(sql, [idCurso], (error, results) => {
    if (error) {
      console.error("Error al obtener integrantes:", error);
      return res.status(500).json({ mensaje: "Error en la base de datos" });
    }

    res.json(results);
  });
});

// Eliminar integrante de un curso
router.delete("/Cursos/:cursoId/integrantes/:usuarioId", (req, res) => {
  const { cursoId, usuarioId } = req.params;

  const query = "DELETE FROM Miembros_Curso WHERE curso_id = ? AND usuario_id = ?";
  conexion.query(query, [cursoId, usuarioId], (error, result) => {
    if (error) {
      console.error("Error al eliminar integrante:", error);
      return res.status(500).json({ mensaje: "Error al eliminar el integrante" });
    }

    res.json({ mensaje: "Integrante eliminado correctamente" });
  });
});

// Agregar integrante a un curso
router.post("/Cursos/:cursoId/integrantes", (req, res) => {
  const { cursoId } = req.params;
  const { usuario_id } = req.body;

  const query = "INSERT INTO Miembros_Curso (curso_id, usuario_id) VALUES (?, ?)";
  conexion.query(query, [cursoId, usuario_id], (error, result) => {
    if (error) {
      console.error("Error al agregar integrante:", error);
      return res.status(500).json({ mensaje: "Error al agregar el integrante" });
    }

    res.json({ mensaje: "Integrante agregado correctamente" });
  });
});

//---------------------------------------------------------------------------------------------------------

// Obtener todos las Materias
router.get("/Materias", (req, res) => {
  const query = `
    SELECT ID, Materia_Nombre, Descripcion_Materia
    FROM Materia
  `;
  conexion.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error en la base de datos" });
    } else {
      res.json(results);
    }
  });
});

// Eliminar materias
router.delete("/Materias/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM Materia WHERE ID = ?";
  conexion.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).json({ mensaje: "Error al eliminar el Materias" });
    } else {
      res.json({ mensaje: "Materias eliminado exitosamente" });
    }
  });
});

// Actualizar materia
router.put("/Materias/:id", (req, res) => {
  const { id } = req.params;
  const { Materia_Nombre, Descripcion_Materia } = req.body;

  const query = `
    UPDATE Materia
    SET Materia_Nombre = ?, Descripcion_Materia = ?
    WHERE ID = ?
  `;

  conexion.query(query, [Materia_Nombre, Descripcion_Materia, id], (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error al actualizar la materia" });
    } else {
      res.json({ mensaje: "Materia actualizada correctamente" });
    }
  });
});

// Crear nueva materia
router.post("/Materias", (req, res) => {
  const { Materia_Nombre, Descripcion_Materia } = req.body;

  const query = `
    INSERT INTO Materia (Materia_Nombre, Descripcion_Materia)
    VALUES (?, ?)
  `;

  conexion.query(query, [Materia_Nombre, Descripcion_Materia], (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error al crear la materia" });
    } else {
      res.status(201).json({ mensaje: "Materia creada correctamente" });
    }
  });
});

//---------------------------------------------------------------------------------------------------------

// Obtener todos los Grados
router.get("/Grados", (req, res) => {
  const query = `
    SELECT ID, Grado_Nombre, Descripcion_Grado
    FROM Grado 
  `;
  conexion.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error en la base de datos" });
    } else {
      res.json(results);
    }
  });
});

// Eliminar Grados
router.delete("/Grados/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM Grado WHERE ID = ?";
  conexion.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).json({ mensaje: "Error al eliminar el Grado" });
    } else {
      res.json({ mensaje: "Grado eliminado exitosamente" });
    }
  });
});

// Actualizar Grados
router.put("/Grados/:id", (req, res) => {
  const { id } = req.params;
  const { Grado_Nombre, Descripcion_Grado } = req.body;

  const query = `
    UPDATE Grado
    SET Grado_Nombre = ?, Descripcion_Grado = ?
    WHERE ID = ?
  `;

  conexion.query(query, [Grado_Nombre, Descripcion_Grado, id], (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error al actualizar el Grado" });
    } else {
      res.json({ mensaje: "Grado actualizado correctamente" });
    }
  });
});

// Crear nuevo Grado
router.post("/Grados", (req, res) => {
  const { Grado_Nombre, Descripcion_Grado } = req.body;

  const query = `
    INSERT INTO Grado (Grado_Nombre, Descripcion_Grado)
    VALUES (?, ?)
  `;

  conexion.query(query, [Grado_Nombre, Descripcion_Grado], (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error al crear el grado" });
    } else {
      res.status(201).json({ mensaje: "Grado creada correctamente" });
    }
  });
});

//---------------------------------------------------------------------------------------------------------

// Obtener todas las jornadas
router.get("/Jornadas", (req, res) => {
  const query = `
    SELECT ID, Jornada_Nombre, Descripcion_Jornada
    FROM Jornada 
  `;
  conexion.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error en la base de datos" });
    } else {
      res.json(results);
    }
  });
});

// Eliminar jornadas
router.delete("/Jornadas/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM Jornada WHERE ID = ?";
  conexion.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).json({ mensaje: "Error al eliminar el Jornada" });
    } else {
      res.json({ mensaje: "Jornada eliminado exitosamente" });
    }
  });
});

// Actualizar Jornada
router.put("/Jornadas/:id", (req, res) => {
  const { id } = req.params;
  const { Jornada_Nombre, Descripcion_Jornada } = req.body;

  const query = `
    UPDATE Jornada
    SET Jornada_Nombre = ?, Descripcion_Jornada = ?
    WHERE ID = ?
  `;

  conexion.query(query, [Jornada_Nombre, Descripcion_Jornada, id], (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error al actualizar la jornada" });
    } else {
      res.json({ mensaje: "jornada actualizado correctamente" });
    }
  });
});

// Crear nueva jornada
router.post("/Jornadas", (req, res) => {
  const { Jornada_Nombre, Descripcion_Jornada } = req.body;

  const query = `
    INSERT INTO Jornada (Jornada_Nombre, Descripcion_Jornada)
    VALUES (?, ?)
  `;

  conexion.query(query, [Jornada_Nombre, Descripcion_Jornada], (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error al crear la jornada" });
    } else {
      res.status(201).json({ mensaje: "Jornada creada correctamente" });
    }
  });
});

//---------------------------------------------------------------------------------------------------------

// Obtener todos los horarios
router.get("/Horarios", (req, res) => {
  const query = `
    SELECT H.ID, H.Titulo_Horario, C.Curso_Nombre, J.Jornada_Nombre,
    CONCAT(U.Primer_Nombre, ' ', U.Primer_Apellido) AS Profesor_Nombre
    FROM Horario H
    LEFT JOIN Curso C ON H.curso_id = C.ID
    LEFT JOIN Jornada J ON C.jornada_id = J.ID
    LEFT JOIN Usuario U ON H.profesor_id = U.ID
  `;
  conexion.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error en la base de datos" });
    } else {
      res.json(results);
    }
  });
});

// Eliminar horarios
router.delete("/Horarios/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM Horario WHERE ID = ?";
  conexion.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).json({ mensaje: "Error al eliminar el Horario" });
    } else {
      res.json({ mensaje: "Horario eliminado exitosamente" });
    }
  });
});

// Obtener profesores (rol_id = 'R002')
router.get("/Profesores", (req, res) => {
  const query = `
    SELECT ID, CONCAT(Primer_Nombre, ' ', Primer_Apellido) AS Nombre_Completo
    FROM Usuario
    WHERE rol_id = 'R002'
  `;
  conexion.query(query, (error, results) => {
    if (error) return res.status(500).json({ error: "Error en la base de datos" });
    res.json(results);
  });
});

// Crear horario
router.post("/Horarios", upload.single('imagen'), (req, res) => {
  const { titulo, descripcion, profesor_id, curso_id } = req.body;
  const imagen = req.file ? req.file.filename : null;

  // Validación: Solo uno debe tener valor
  if ((profesor_id && curso_id) || (!profesor_id && !curso_id)) {
    return res.status(400).json({ error: "Debe seleccionar solo profesor o curso" });
  }

  // Validar si ya existe horario con ese profesor o curso
  let verificarQuery = '';
  let verificarParams = [];

  if (profesor_id) {
    verificarQuery = "SELECT * FROM Horario WHERE profesor_id = ?";
    verificarParams = [profesor_id];
  } else {
    verificarQuery = "SELECT * FROM Horario WHERE curso_id = ?";
    verificarParams = [curso_id];
  }

  conexion.query(verificarQuery, verificarParams, (error, results) => {
    if (error) return res.status(500).json({ error: "Error al verificar existencia" });
    if (results.length > 0) {
      return res.status(400).json({ error: "Ya existe un horario asignado para ese profesor o curso." });
    }

    // Si no existe, insertar nuevo horario
    const query = `
      INSERT INTO Horario (Titulo_Horario, Imagen_Horario, Descripcion_Horario, profesor_id, curso_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    conexion.query(query, [titulo, imagen, descripcion, profesor_id || null, curso_id || null], (error, result) => {
      if (error) return res.status(500).json({ error: "Error al guardar horario" });
      res.json({ mensaje: "Horario creado exitosamente" });
    });
  });
});

// Obtener cursos
router.get("/Cursos-jornada", (req, res) => {
  const query = `
    SELECT C.ID, CONCAT(C.Curso_Nombre, ' - ', J.Jornada_Nombre) AS Curso_Con_Jornada
    FROM Curso C
    INNER JOIN Jornada J ON C.jornada_id = J.ID
  `;
  conexion.query(query, (error, results) => {
    if (error) return res.status(500).json({ error: "Error en la base de datos" });
    res.json(results);
  });
});

// Obtener un horario específico por ID
router.get("/Horarios/:id", (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT * FROM Horario
    WHERE ID = ?
  `;
  conexion.query(query, [id], (error, results) => {
    if (error) return res.status(500).json({ error: "Error en la base de datos" });
    if (!results.length) return res.status(404).json({ error: "Horario no encontrado" });
    res.json(results[0]);
  });
});

// Actualizar horario
router.put("/Horarios/:id", upload.single('imagen'), (req, res) => {
  const id = req.params.id;
  const { titulo, descripcion, profesor_id, curso_id } = req.body;
  const imagen = req.file ? req.file.filename : null;

  if ((profesor_id && curso_id) || (!profesor_id && !curso_id)) {
    return res.status(400).json({ error: "Debe seleccionar solo profesor o curso" });
  }

  // Verificar si ya existe un horario con ese profesor o curso, excluyendo el actual
  let checkQuery = `SELECT * FROM Horario WHERE (profesor_id = ? OR curso_id = ?) AND ID != ?`;
  conexion.query(checkQuery, [profesor_id || 0, curso_id || 0, id], (err, resultados) => {
    if (err) return res.status(500).json({ error: "Error al validar horario existente" });

    if (resultados.length > 0) {
      return res.status(400).json({ error: "Ese profesor o curso ya tiene un horario asignado" });
    }

    // Construcción dinámica de UPDATE
    let query = `UPDATE Horario SET Titulo_Horario = ?, Descripcion_Horario = ?, profesor_id = ?, curso_id = ?`;
    const params = [titulo, descripcion, profesor_id || null, curso_id || null];

    if (imagen) {
      query += `, Imagen_Horario = ?`;
      params.push(imagen);
    }

    query += ` WHERE ID = ?`;
    params.push(id);

    conexion.query(query, params, (error, result) => {
      if (error) return res.status(500).json({ error: "Error al actualizar el horario" });
      res.json({ mensaje: "Horario actualizado correctamente" });
    });
  });
});


//---------------------------------------------------------------------------------------------------------

// Obtener todas las aulas
router.get("/Aulas", (req, res) => {
  const query = `
    SELECT Aula.ID, Aula.Aula_Nombre, Materia.Materia_Nombre, CONCAT(Curso.Curso_Nombre,' ',j.Jornada_Nombre) AS Curso_Jornada, 
    CONCAT(Usuario.Primer_Nombre, ' ', Usuario.Primer_Apellido) AS Profesor
    FROM Aula
    JOIN Materia ON Aula.materia_id = Materia.ID
    JOIN Curso ON Aula.curso_id = Curso.ID
    JOIN Jornada j ON Curso.jornada_id = j.id
    JOIN Usuario ON Aula.usuario_id = Usuario.ID
  `;
  conexion.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error en la base de datos" });
    } else {
      res.json(results);
    }
  });
});

// Eliminar aulas
router.delete("/Aulas/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM Aula WHERE ID = ?";
  conexion.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).json({ mensaje: "Error al eliminar el Aula" });
    } else {
      res.json({ mensaje: "Aula eliminado exitosamente" });
    }
  });
});

// Crear Aula
router.post("/Aulas", (req, res) => {
  const { aula_nombre, materia_id, curso_id, usuario_id } = req.body;

  const query = `
    INSERT INTO Aula (Aula_Nombre, materia_id, curso_id, usuario_id)
    VALUES (?, ?, ?, ?)
  `;

  conexion.query(query, [aula_nombre, materia_id, curso_id, usuario_id], (error, result) => {
    if (error) {
      res.status(500).json({ mensaje: "Error al crear el Aula" });
    } else {
      res.json({ mensaje: "Aula creada exitosamente" });
    }
  });
});

router.put("/Aulas/:id", (req, res) => {
  const { id } = req.params;
  const { Aula_Nombre, materia_id } = req.body;

  const query = `UPDATE Aula SET Aula_Nombre = ?, materia_id = ? WHERE ID = ?`;
  conexion.query(query, [Aula_Nombre, materia_id, id], (error, result) => {
    if (error) {
      res.status(500).json({ mensaje: "Error al actualizar el Aula" });
    } else {
      res.json({ mensaje: "Aula actualizada correctamente" });
    }
  });
});

// Obtener una aula por ID
router.get("/Aulas/:id", (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT Aula.ID, Aula.Aula_Nombre, Materia.Materia_Nombre, 
    CONCAT(Curso.Curso_Nombre,' ',j.Jornada_Nombre) AS Curso_Jornada,
    CONCAT(Usuario.Primer_Nombre, ' ', Usuario.Primer_Apellido) AS Profesor
    FROM Aula
    JOIN Materia ON Aula.materia_id = Materia.ID
    JOIN Curso ON Aula.curso_id = Curso.ID
    JOIN Jornada j ON Curso.jornada_id = j.id
    JOIN Usuario ON Aula.usuario_id = Usuario.ID
    WHERE Aula.ID = ?
  `;
  conexion.query(query, [id], (error, results) => {
    if (error || results.length === 0) {
      res.status(404).json({ error: "Aula no encontrada" });
    } else {
      res.json(results[0]);
    }
  });
});

// Obtener todos los anuncios de un aula
router.get("/Anuncios/Aula/:aula_id", (req, res) => {
  const aula_id = req.params.aula_id;

  const query = `
    SELECT a.ID, a.Titulo_Anuncio, a.Descripcion_Anuncio, a.Enlace_Anuncio, a.Fecha_Anuncio,
           CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) AS Profesor,
           u.RutaFoto
    FROM Anuncio a
    JOIN Usuario u ON a.usuario_id = u.ID
    WHERE a.aula_id = ?
    ORDER BY a.Fecha_Anuncio DESC
  `;

  conexion.query(query, [aula_id], (error, results) => {
    if (error) {
      console.error("Error al obtener los anuncios del aula:", error);
      return res.status(500).json({ error: "Error al obtener anuncios" });
    }
    res.json(results);
  });
});

//Crear Anuncio
router.post("/Anuncios", upload.array('archivo'), (req, res) => {
  const { titulo, descripcion, aula_id, usuario_id } = req.body;
  const fecha = new Date().toISOString().split("T")[0]; // formato YYYY-MM-DD

  // Guardar los nombres de los archivos
  const archivos = req.files && req.files.length > 0
  ? req.files.map(file => file.filename).join(";")
  : null;

  const query = `
    INSERT INTO Anuncio (Titulo_Anuncio, Descripcion_Anuncio, Enlace_Anuncio, Fecha_Anuncio, aula_id, usuario_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  conexion.query(
    query,
    [titulo, descripcion, archivos, fecha, aula_id, usuario_id],
    (error, result) => {
      if (error) {
        console.error("Error al guardar anuncio:", error);
        res.status(500).json({ mensaje: "Error al crear el anuncio" });
      } else {
        res.json({ mensaje: "Anuncio creado con éxito" });
      }
    }
  );
});

// Eliminar anuncio por ID
router.delete("/Anuncios/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM Anuncio WHERE ID = ?";
  conexion.query(query, [id], (error, result) => {
    if (error) {
      console.error("❌ Error al eliminar el anuncio:", error);
      res.status(500).json({ mensaje: "Error al eliminar el anuncio" });
    } else {
      res.json({ mensaje: "Anuncio eliminado correctamente" });
    }
  });
});

//Editar Anuncio
router.put("/Anuncios/:id", upload.array('archivo'), (req, res) => {
  const id = req.params.id;
  const { titulo, descripcion } = req.body;

  // Guardar archivos nuevos si se suben
  const archivos = req.files && req.files.length > 0
    ? req.files.map(file => file.filename).join(";")
    : null;

  const query = archivos
    ? `UPDATE Anuncio SET Titulo_Anuncio = ?, Descripcion_Anuncio = ?, Enlace_Anuncio = ? WHERE ID = ?`
    : `UPDATE Anuncio SET Titulo_Anuncio = ?, Descripcion_Anuncio = ? WHERE ID = ?`;

  const params = archivos
    ? [titulo, descripcion, archivos, id]
    : [titulo, descripcion, id];

  conexion.query(query, params, (error, result) => {
    if (error) {
      console.error("Error al actualizar el anuncio:", error);
      return res.status(500).json({ mensaje: "Error al actualizar anuncio" });
    }
    res.json({ mensaje: "Anuncio actualizado correctamente" });
  });
});

// Obtener comentarios por anuncio
router.get("/Comentarios/Anuncio/:anuncio_id", (req, res) => {
  const anuncioId = req.params.anuncio_id;
  const query = `
    SELECT c.ID, c.Descripcion, c.Fecha,
           CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) AS Nombre_Usuario,
           u.RutaFoto
    FROM Comentario c
    JOIN Usuario u ON c.usuario_id = u.ID
    WHERE c.anuncio_id = ?
    ORDER BY c.Fecha DESC
  `;
  conexion.query(query, [anuncioId], (error, results) => {
    if (error) {
      console.error("Error al obtener los comentarios:", error);
      res.status(500).json({ error: "Error al obtener comentarios" });
    } else {
      res.json(results);
    }
  });
});

// Crear comentario (para trabajo o anuncio)
router.post("/Comentarios", (req, res) => {
  const { descripcion, trabajo_id, anuncio_id, usuario_id, fecha } = req.body;

  const query = `
    INSERT INTO Comentario (Descripcion, Fecha, trabajo_id, anuncio_id, usuario_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  conexion.query(
    query,
    [descripcion, fecha || new Date().toISOString().split("T")[0], trabajo_id || null, anuncio_id || null, usuario_id],
    (error, result) => {
      if (error) {
        console.error("Error al crear comentario:", error);
        res.status(500).json({ mensaje: "Error al crear el comentario" });
      } else {
        res.json({ mensaje: "Comentario creado correctamente" });
      }
    }
  );
});

// Eliminar comentario por ID
router.delete("/Comentarios/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM Comentario WHERE ID = ?";
  conexion.query(query, [id], (error, result) => {
    if (error) {
      console.error("❌ Error al eliminar el comentario:", error);
      res.status(500).json({ mensaje: "Error al eliminar el comentario" });
    } else {
      res.json({ mensaje: "Comentario eliminado correctamente" });
    }
  });
});

// Obtener integrantes del aula (por curso)
router.get("/Aulas/:id/integrantes", (req, res) => {
  const aulaId = req.params.id;

  const sql = `
    SELECT u.ID, u.Primer_Nombre, u.Segundo_Nombre, u.Primer_Apellido, u.Segundo_Apellido
    FROM Usuario u
    INNER JOIN Miembros_Curso mc ON u.ID = mc.usuario_id
    INNER JOIN Aula a ON mc.curso_id = a.curso_id
    WHERE a.ID = ?
  `;

  conexion.query(sql, [aulaId], (error, results) => {
    if (error) {
      console.error("Error al obtener los integrantes del aula:", error);
      return res.status(500).json({ mensaje: "Error en la base de datos" });
    }

    res.json(results);
  });
});

// Obtener trabajos por aula
router.get("/Trabajos/Aula/:id", (req, res) => {
  const aulaId = req.params.id;

  const sql = `
    SELECT ID, Titulo_Trabajo, Descripcion_Trabajo, Fecha_Trabajo
    FROM Trabajo
    WHERE aula_id = ?
  `;

  conexion.query(sql, [aulaId], (error, results) => {
    if (error) {
      console.error("Error al obtener los trabajos:", error);
      return res.status(500).json({ mensaje: "Error en la base de datos" });
    }

    res.json(results);
  });
});

router.post("/CrearTrabajo", upload.array('archivos'), (req, res) => {
  const { titulo, descripcion, fecha, aula_id } = req.body;
  const archivos = req.files;

  const sqlTrabajo = `
    INSERT INTO Trabajo (Titulo_Trabajo, Descripcion_Trabajo, Fecha_Trabajo, aula_id)
    VALUES (?, ?, ?, ?)
  `;

  conexion.query(sqlTrabajo, [titulo, descripcion, fecha, aula_id], (error, result) => {
    if (error) {
      console.error("Error al insertar trabajo:", error);
      return res.status(500).json({ mensaje: "Error al guardar el trabajo" });
    }

    const trabajoId = result.insertId;

    if (archivos && archivos.length > 0) {
      const sqlArchivos = `
        INSERT INTO Trabajo_Archivo (trabajo_id, ruta_archivo, nombre_original)
        VALUES ?
      `;

      const valores = archivos.map((archivo) => [
        trabajoId,
        archivo.filename,
        archivo.originalname
      ]);

      conexion.query(sqlArchivos, [valores], (err2) => {
        if (err2) {
          console.error("Error al guardar archivos:", err2);
          return res.status(500).json({ mensaje: "Error al guardar archivos" });
        }

        res.status(200).json({ mensaje: "Trabajo y archivos guardados" });
      });
    } else {
      res.status(200).json({ mensaje: "Trabajo guardado sin archivos" });
    }
  });
});

// Obtener datos de un trabajo por ID
router.get("/Trabajo/:id", (req, res) => {
  const id = req.params.id;

  const sqlTrabajo = "SELECT * FROM Trabajo WHERE ID = ?";
  const sqlArchivos = "SELECT * FROM Trabajo_Archivo WHERE trabajo_id = ?";

  conexion.query(sqlTrabajo, [id], (err, trabajoResult) => {
    if (err || trabajoResult.length === 0) {
      return res.status(404).json({ error: "Trabajo no encontrado" });
    }

    conexion.query(sqlArchivos, [id], (err2, archivosResult) => {
      if (err2) {
        return res.status(500).json({ error: "Error al obtener archivos" });
      }

      res.json({
        trabajo: trabajoResult[0],
        archivos: archivosResult
      });
    });
  });
});

// Actualizar trabajo
router.post("/ActualizarTrabajo", upload.array("archivos"), (req, res) => {
  const { trabajo_id, titulo, descripcion, fecha, aula_id, eliminar_archivos } = req.body;
  const archivosNuevos = req.files;

  // 1. Actualiza datos del trabajo
  const sqlUpdate = `
    UPDATE Trabajo
    SET Titulo_Trabajo = ?, Descripcion_Trabajo = ?, Fecha_Trabajo = ?
    WHERE ID = ?
  `;
  conexion.query(sqlUpdate, [titulo, descripcion, fecha, trabajo_id], (err) => {
    if (err) return res.status(500).json({ error: "Error al actualizar trabajo" });

    // 2. Eliminar archivos seleccionados (si los hay)
    if (eliminar_archivos) {
      const idsEliminar = Array.isArray(eliminar_archivos) ? eliminar_archivos : [eliminar_archivos];
      const sqlDeleteArchivos = `DELETE FROM Trabajo_Archivo WHERE ID IN (?)`;

      conexion.query(sqlDeleteArchivos, [idsEliminar], (err) => {
        if (err) console.error("Error al eliminar archivos:", err);
      });
    }

    // 3. Insertar nuevos archivos
    if (archivosNuevos.length > 0) {
      const valores = archivosNuevos.map(file => [
        trabajo_id,
        'imagenes/' + file.filename,
        file.originalname
      ]);

      const sqlInsertArchivos = `INSERT INTO Trabajo_Archivo (trabajo_id, ruta_archivo, nombre_original) VALUES ?`;
      conexion.query(sqlInsertArchivos, [valores], (err) => {
        if (err) console.error("Error al insertar nuevos archivos:", err);
      });
    }

    res.json({ mensaje: "Trabajo actualizado correctamente" });
  });
});

//Eliminar Trabajo
router.delete("/Trabajo/:id", (req, res) => {
  const id = req.params.id;

  const sqlArchivos = "DELETE FROM Trabajo_Archivo WHERE trabajo_id = ?";
  const sqlTrabajo = "DELETE FROM Trabajo WHERE ID = ?";

  conexion.query(sqlArchivos, [id], (err) => {
    if (err) {
      console.error("Error al eliminar archivos del trabajo:", err);
      return res.status(500).json({ error: "Error al eliminar archivos" });
    }

    conexion.query(sqlTrabajo, [id], (err2) => {
      if (err2) {
        console.error("Error al eliminar trabajo:", err2);
        return res.status(500).json({ error: "Error al eliminar el trabajo" });
      }

      res.json({ mensaje: "Trabajo eliminado correctamente" });
    });
  });
});

// Obtener comentarios por trabajo
router.get("/Comentarios/Trabajo/:trabajo_id", (req, res) => {
  const trabajoId = req.params.trabajo_id;
  const query = `
    SELECT c.ID, c.Descripcion, c.Fecha,
           CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) AS Nombre_Usuario,
           u.RutaFoto
    FROM Comentario c
    JOIN Usuario u ON c.usuario_id = u.ID
    WHERE c.trabajo_id = ?
    ORDER BY c.Fecha DESC
  `;

  conexion.query(query, [trabajoId], (error, results) => {
    if (error) {
      console.error("Error al obtener los comentarios:", error);
      res.status(500).json({ error: "Error al obtener comentarios" });
    } else {
      res.json(results);
    }
  });
});

// Obtener estudiantes que entregaron un trabajo específico
router.get("/Trabajos/:id/Entregados", (req, res) => {
  const trabajoId = req.params.id;

  const sql = `
    SELECT 
      te.ID AS trabajo_entregado_id,
      te.Fecha_Trabajo,
      te.Nota,
      u.ID AS usuario_id,
      CONCAT(u.Primer_Nombre, ' ', u.Segundo_Nombre, ' ', u.Primer_Apellido, ' ', u.Segundo_Apellido) AS nombre_completo
    FROM TrabajoEntregado te
    JOIN Usuario u ON te.usuario_id = u.ID
    WHERE te.trabajo_id = ?
  `;

  conexion.query(sql, [trabajoId], (error, results) => {
    if (error) {
      console.error("Error al obtener entregas:", error);
      return res.status(500).json({ mensaje: "Error al consultar las entregas" });
    }

    res.json(results);
  });
});

router.put("/Trabajos/Entregado/:id/Nota", (req, res) => {
    const id = req.params.id;
    const { nota } = req.body;
    const sql = `UPDATE TrabajoEntregado SET Nota = ? WHERE ID = ?`;

    conexion.query(sql, [nota, id], (error) => {
        if (error) return res.status(500).json({ mensaje: "Error al actualizar nota" });
        res.json({ mensaje: "Nota asignada correctamente" });
    });
});

// Obtener entrega con sus archivos
router.get("/TrabajoEntregado/:id/Archivos", (req, res) => {
    const entregaId = req.params.id;

    const sql = `
        SELECT 
            ruta_archivo,
            nombre_original
        FROM TrabajoEntregado_Archivo
        WHERE trabajo_entregado_id = ?
    `;

    conexion.query(sql, [entregaId], (error, results) => {
        if (error) {
            console.error("Error al obtener archivos:", error);
            return res.status(500).json({ mensaje: "Error al consultar los archivos" });
        }

        res.json(results);
    });
});

//Notas
router.get("/Aulas/:id/Notas", (req, res) => {
  const aulaId = req.params.id;

  const sql = `
    SELECT 
      u.ID AS usuario_id,
      CONCAT(u.Primer_Nombre, ' ', u.Segundo_Nombre, ' ', u.Primer_Apellido, ' ', u.Segundo_Apellido) AS nombre_completo,
      t.ID AS trabajo_id,
      t.Titulo_Trabajo,
      te.Nota
    FROM Usuario u
    INNER JOIN Miembros_Curso mc ON u.ID = mc.usuario_id
    INNER JOIN Aula a ON mc.curso_id = a.curso_id
    LEFT JOIN Trabajo t ON a.ID = t.aula_id
    LEFT JOIN TrabajoEntregado te ON te.usuario_id = u.ID AND te.trabajo_id = t.ID
    WHERE a.ID = ?
    ORDER BY u.ID, t.ID
  `;

  conexion.query(sql, [aulaId], (err, results) => {
    if (err) {
      console.error("Error al consultar notas:", err);
      return res.status(500).json({ mensaje: "Error en la base de datos" });
    }

    const alumnos = {};
    const trabajosSet = new Set();

    results.forEach(row => {
      if (!row.Titulo_Trabajo) return;

      trabajosSet.add(row.Titulo_Trabajo);

      if (!alumnos[row.usuario_id]) {
        alumnos[row.usuario_id] = {
          nombre: row.nombre_completo,
          notas: {}
        };
      }

      alumnos[row.usuario_id].notas[row.Titulo_Trabajo] = row.Nota !== null ? row.Nota : "sin nota";
    });

    const trabajos = Array.from(trabajosSet);
    const tabla_notas = Object.values(alumnos);

    res.json({ trabajos, tabla_notas });
  });
});


//---------------------------------------------------------------------------------------------------------
//Alumno y Profesor --------------------------------------------------------------------- Alumno y Profesor

// Obtener todas las noticias
router.get("/Noticias", (req, res) => {
  const query = `
    SELECT n.ID, n.Titulo_Noticia, t.Tipo
    FROM Noticia n
    INNER JOIN Tipo_Noticia t ON n.tipo_noticia_id = t.ID
  `;
  conexion.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error en la base de datos" });
    } else {
      res.json(results);
    }
  });
});

// Eliminar noticias
router.delete("/Noticias/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM Noticia WHERE ID = ?";
  conexion.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).json({ mensaje: "Error al eliminar la Noticia" });
    } else {
      res.json({ mensaje: "Noticia eliminado exitosamente" });
    }
  });
});

// Crear noticia
router.post(
  "/Noticias",
  upload.fields([
    { name: "imagen1" },
    { name: "imagen2" },
    { name: "imagen3" }
  ]),
  (req, res) => {
    const {
      titulo,
      encabezado,
      descripcion1,
      descripcion2,
      descripcion3,
      fecha,
      tipo_noticia_id
    } = req.body;

    const imagen1 = req.files['imagen1']?.[0]?.filename || null;
    const imagen2 = req.files['imagen2']?.[0]?.filename || null;
    const imagen3 = req.files['imagen3']?.[0]?.filename || null;

    // 🔹 Validar duplicados solo para tipos principales (1, 2, 3)
    const tiposUnicos = ['1', '2', '3'];

    if (tiposUnicos.includes(tipo_noticia_id)) {
      const checkQuery = "SELECT * FROM Noticia WHERE tipo_noticia_id = ?";
      conexion.query(checkQuery, [tipo_noticia_id], (err, results) => {
        if (err) return res.status(500).json({ error: "Error al validar tipo de noticia" });
        if (results.length > 0) {
          return res.status(400).json({
            error: "Ya existe una noticia con este tipo principal. No se pueden repetir."
          });
        }

        insertarNoticia();
      });
    } else {
      // Si no es tipo principal, se puede insertar directamente
      insertarNoticia();
    }

    // 🔹 Función auxiliar para insertar la noticia
    function insertarNoticia() {
      const insertQuery = `
        INSERT INTO Noticia (
          Titulo_Noticia, Encabezado, Descripcion1, Descripcion2, Descripcion3,
          Fecha_Notica, Imagen1, Imagen2, Imagen3, tipo_noticia_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      conexion.query(
        insertQuery,
        [
          titulo,
          encabezado,
          descripcion1,
          descripcion2 || null,
          descripcion3 || null,
          fecha,
          imagen1,
          imagen2,
          imagen3,
          tipo_noticia_id
        ],
        (err2) => {
          if (err2)
            return res.status(500).json({ error: "Error al crear la noticia" });
          res.json({ mensaje: "Noticia creada exitosamente" });
        }
      );
    }
  }
);

// Obtener tipos de noticia
router.get("/TiposNoticia", (req, res) => {
  conexion.query("SELECT * FROM Tipo_Noticia", (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener tipos de noticia" });
    } else {
      res.json(results);
    }
  });
});

// Actualizar Noticia
router.put(
  "/Noticias/:id",
  upload.fields([
    { name: "imagen1" },
    { name: "imagen2" },
    { name: "imagen3" }
  ]),
  (req, res) => {
    const id = req.params.id;
    const {
      titulo,
      encabezado,
      descripcion1,
      descripcion2,
      descripcion3,
      fecha,
      tipo_noticia_id
    } = req.body;

    // Preparar imágenes
    const imagen1 = req.files['imagen1']?.[0]?.filename;
    const imagen2 = req.files['imagen2']?.[0]?.filename;
    const imagen3 = req.files['imagen3']?.[0]?.filename;

    // 🔹 Solo validar duplicados si es tipo principal (1, 2 o 3)
    const tiposUnicos = ['1', '2', '3'];

    if (tiposUnicos.includes(tipo_noticia_id)) {
      const checkQuery = `
        SELECT * FROM Noticia
        WHERE tipo_noticia_id = ? AND ID != ?
      `;
      conexion.query(checkQuery, [tipo_noticia_id, id], (err, results) => {
        if (err) return res.status(500).json({ error: "Error al validar tipo de noticia" });
        if (results.length > 0) {
          return res.status(400).json({
            error: "Ya existe otra noticia con este tipo principal. No se pueden repetir."
          });
        }
        actualizarNoticia();
      });
    } else {
      // Si no es tipo principal, actualizar directamente
      actualizarNoticia();
    }

    // 🔹 Función auxiliar para actualizar noticia
    function actualizarNoticia() {
      let query = `
        UPDATE Noticia
        SET Titulo_Noticia = ?, Encabezado = ?, Descripcion1 = ?, Descripcion2 = ?, Descripcion3 = ?,
            Fecha_Notica = ?, tipo_noticia_id = ?
      `;
      const params = [
        titulo,
        encabezado,
        descripcion1,
        descripcion2 || null,
        descripcion3 || null,
        fecha,
        tipo_noticia_id
      ];

      if (imagen1) { query += ", Imagen1 = ?"; params.push(imagen1); }
      if (imagen2) { query += ", Imagen2 = ?"; params.push(imagen2); }
      if (imagen3) { query += ", Imagen3 = ?"; params.push(imagen3); }

      query += " WHERE ID = ?";
      params.push(id);

      conexion.query(query, params, (error) => {
        if (error)
          return res.status(500).json({ error: "Error al actualizar la noticia" });
        res.json({ mensaje: "Noticia actualizada correctamente" });
      });
    }
  }
);

// Obtener una noticia por ID
router.get("/Noticias/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM Noticia WHERE ID = ?";
  conexion.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al obtener la noticia" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }
    res.json(results[0]);
  });
});

//Llamar Noticias A vista Alumno y profesor
router.get("/NoticiasPrincipales", (req, res) => {
  const query = `
    SELECT n.ID, n.Titulo_Noticia, n.Encabezado, n.Imagen1, t.Tipo
    FROM Noticia n
    INNER JOIN Tipo_Noticia t ON n.tipo_noticia_id = t.ID
    WHERE t.Tipo IN ('Noticia Principal 1', 'Noticia Principal 2', 'Noticia Principal 3')
    ORDER BY t.ID ASC
  `;

  conexion.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al obtener noticias principales" });
    }

    // Organizar resultados por tipo
    const noticias = {
      noticia1: null,
      noticia2: null,
      noticia3: null,
    };

    results.forEach(n => {
      if (n.Tipo === 'Noticia Principal 1') noticias.noticia1 = n;
      if (n.Tipo === 'Noticia Principal 2') noticias.noticia2 = n;
      if (n.Tipo === 'Noticia Principal 3') noticias.noticia3 = n;
    });

    res.json(noticias);
  });
});

//Trae las noticas con el titulo, encabezado e imagen1
router.get("/NoticiasDatos", (req, res) => {
  const query = `
    SELECT ID, Titulo_Noticia, Encabezado, Imagen1
    FROM Noticia
    ORDER BY Fecha_Notica DESC
  `;
  conexion.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error en la base de datos" });
    } else {
      res.json(results);
    }
  });
});

// 🔁 Obtener horario del usuario según su rol (alumno o profesor)
router.get("/HorarioUsuario/:id", (req, res) => {
  const idUsuario = req.params.id;

  const rolQuery = "SELECT rol_id FROM Usuario WHERE ID = ?";
  conexion.query(rolQuery, [idUsuario], (err, rolRes) => {
    if (err || rolRes.length === 0) {
      return res.status(500).json({ error: "No se pudo determinar el rol del usuario" });
    }

    const rol = rolRes[0].rol_id;

    if (rol === 'R001') {
      // 🧑 Alumno - obtener horario del curso al que pertenece
      const query = `
        SELECT H.*
        FROM Horario H
        INNER JOIN Miembros_Curso MC ON H.curso_id = MC.curso_id
        WHERE MC.usuario_id = ?
        LIMIT 1
      `;
      conexion.query(query, [idUsuario], (err, result) => {
        if (err) return res.status(500).json({ error: "Error al obtener horario del alumno" });
        if (!result.length) return res.status(404).json({ mensaje: "No hay horario asignado a este alumno" });
        res.json(result[0]);
      });

    } else if (rol === 'R002') {
      // 👨‍🏫 Profesor - obtener horario asignado a él
      const query = `SELECT * FROM Horario WHERE profesor_id = ? LIMIT 1`;
      conexion.query(query, [idUsuario], (err, result) => {
        if (err) return res.status(500).json({ error: "Error al obtener horario del profesor" });
        if (!result.length) return res.status(404).json({ mensaje: "No hay horario asignado a este profesor" });
        res.json(result[0]);
      });

    } else {
      res.status(400).json({ mensaje: "Este usuario no tiene horario asignado por rol" });
    }
  });
});

// Obtener aulas por usuario (alumno o profesor)
router.get("/Aulas/usuario/:id", (req, res) => {
  const usuarioId = req.params.id;

  const sql = `
    SELECT a.ID, a.Aula_Nombre, m.Materia_Nombre, 
           CONCAT(c.Curso_Nombre, ' ', j.Jornada_Nombre) AS Curso_Nombre, 
           CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) AS Profesor,
           a.usuario_id  -- 👈 IMPORTANTE: para verificar si el usuario creó el aula
    FROM Aula a
    JOIN Materia m ON a.materia_id = m.ID
    JOIN Curso c ON a.curso_id = c.ID
    JOIN Jornada j ON c.jornada_id = j.ID
    JOIN Usuario u ON a.usuario_id = u.ID
    WHERE a.curso_id IN (
      SELECT curso_id FROM Miembros_Curso WHERE usuario_id = ?
    )
    OR a.usuario_id = ?
  `;

  conexion.query(sql, [usuarioId, usuarioId], (error, results) => {
    if (error) {
      console.error("Error al obtener aulas del usuario:", error);
      return res.status(500).json({ mensaje: "Error en la base de datos" });
    }

    res.json(results);
  });
});

// Eliminar comentario por ID (con validación del usuario opcional)
router.delete("/ComentariosAlum/:id", (req, res) => {
  const comentarioId = req.params.id;
  const usuarioId = parseInt(req.query.usuario_id);

  const queryVerificar = "SELECT * FROM Comentario WHERE ID = ?";

  conexion.query(queryVerificar, [comentarioId], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ mensaje: "Comentario no encontrado" });
    }

    if (result[0].usuario_id !== usuarioId) {
      return res.status(403).json({ mensaje: "No tienes permiso para eliminar este comentario" });
    }

    // Eliminar si es del usuario logueado
    const queryEliminar = "DELETE FROM Comentario WHERE ID = ?";
    conexion.query(queryEliminar, [comentarioId], (error) => {
      if (error) {
        console.error("❌ Error al eliminar el comentario:", error);
        res.status(500).json({ mensaje: "Error al eliminar el comentario" });
      } else {
        res.json({ mensaje: "Comentario eliminado correctamente" });
      }
    });
  });
});

// obtener comentario
router.get("/ComentariosAlum/Trabajo/:trabajo_id", (req, res) => {
  const trabajoId = req.params.trabajo_id;
  const query = `
    SELECT c.ID, c.Descripcion, c.Fecha,
           c.usuario_id,
           CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) AS Nombre_Usuario,
           u.RutaFoto
    FROM Comentario c
    JOIN Usuario u ON c.usuario_id = u.ID
    WHERE c.trabajo_id = ?
    ORDER BY c.Fecha DESC
  `;

  conexion.query(query, [trabajoId], (error, results) => {
    if (error) {
      console.error("Error al obtener los comentarios:", error);
      res.status(500).json({ error: "Error al obtener comentarios" });
    } else {
      res.json(results);
    }
  });
});

// Obtener comentarios por anuncio (versión para alumno)
router.get("/ComentariosAlum/Anuncio/:anuncio_id", (req, res) => {
  const anuncioId = req.params.anuncio_id;

  const query = `
    SELECT c.ID, c.Descripcion, c.Fecha,
           c.usuario_id,
           CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) AS Nombre_Usuario,
           u.RutaFoto
    FROM Comentario c
    JOIN Usuario u ON c.usuario_id = u.ID
    WHERE c.anuncio_id = ?
    ORDER BY c.Fecha DESC
  `;

  conexion.query(query, [anuncioId], (error, results) => {
    if (error) {
      console.error("Error al obtener comentarios:", error);
      res.status(500).json({ mensaje: "Error al obtener comentarios" });
    } else {
      res.json(results);
    }
  });
});

// Eliminar comentario (con validación de usuario)
router.delete("/ComentariosAlumAnuncio/:id", (req, res) => {
  const comentarioId = req.params.id;
  const usuarioId = parseInt(req.query.usuario_id);

  const queryVerificar = "SELECT * FROM Comentario WHERE ID = ?";
  conexion.query(queryVerificar, [comentarioId], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ mensaje: "Comentario no encontrado" });
    }

    if (result[0].usuario_id !== usuarioId) {
      return res.status(403).json({ mensaje: "No tienes permiso para eliminar este comentario" });
    }

    const queryEliminar = "DELETE FROM Comentario WHERE ID = ?";
    conexion.query(queryEliminar, [comentarioId], (error) => {
      if (error) {
        console.error("Error al eliminar comentario:", error);
        res.status(500).json({ mensaje: "Error al eliminar comentario" });
      } else {
        res.json({ mensaje: "Comentario eliminado correctamente" });
      }
    });
  });
});

// -------------------------------------Subir trabajos como Alumno------------------------------------------

router.get("/TrabajoEntregado/:trabajoId/:usuarioId", (req, res) => {
  const { trabajoId, usuarioId } = req.params;

  const sqlEntrega = "SELECT * FROM TrabajoEntregado WHERE trabajo_id = ? AND usuario_id = ?";
  const sqlArchivos = `
    SELECT * FROM TrabajoEntregado_Archivo 
    WHERE trabajo_entregado_id = ?
  `;

  conexion.query(sqlEntrega, [trabajoId, usuarioId], (err, entregaResult) => {
    if (err) return res.status(500).json({ error: "Error al obtener la entrega" });

    if (entregaResult.length === 0) return res.json(null); // No entregado

    const entrega = entregaResult[0];

    conexion.query(sqlArchivos, [entrega.ID], (err2, archivosResult) => {
      if (err2) return res.status(500).json({ error: "Error al obtener archivos entregados" });

      res.json({
        entrega,
        archivos: archivosResult
      });
    });
  });
});

router.post("/TrabajoEntregado", upload.array("archivo"), (req, res) => {
  const { trabajo_id, usuario_id } = req.body;
  const fecha = new Date().toISOString().split("T")[0];

  const sqlInsertar = `
    INSERT INTO TrabajoEntregado (Fecha_Trabajo, trabajo_id, usuario_id) 
    VALUES (?, ?, ?)
  `;

  conexion.query(sqlInsertar, [fecha, trabajo_id, usuario_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error al registrar entrega" });

    const trabajoEntregadoId = result.insertId;

    const archivos = req.files.map(file => [
      trabajoEntregadoId,
      file.filename,
      file.originalname
    ]);

    const sqlInsertarArchivos = `
      INSERT INTO TrabajoEntregado_Archivo 
      (trabajo_entregado_id, ruta_archivo, nombre_original) 
      VALUES ?
    `;

    conexion.query(sqlInsertarArchivos, [archivos], (err2) => {
      if (err2) return res.status(500).json({ error: "Error al guardar archivos" });

      res.json({ mensaje: "Trabajo entregado exitosamente" });
    });
  });
});

router.delete("/TrabajoEntregado/:trabajoId/:usuarioId", (req, res) => {
  const { trabajoId, usuarioId } = req.params;

  const sqlObtener = `
    SELECT ID FROM TrabajoEntregado 
    WHERE trabajo_id = ? AND usuario_id = ?
  `;

  conexion.query(sqlObtener, [trabajoId, usuarioId], (err, result) => {
    if (err) return res.status(500).json({ error: "Error al buscar entrega" });

    if (result.length === 0) return res.status(404).json({ mensaje: "Entrega no encontrada" });

    const entregaId = result[0].ID;

    const sqlEliminar = "DELETE FROM TrabajoEntregado WHERE ID = ?";

    conexion.query(sqlEliminar, [entregaId], (err2) => {
      if (err2) return res.status(500).json({ error: "Error al eliminar entrega" });

      res.json({ mensaje: "Entrega cancelada correctamente" });
    });
  });
});

// Obtener totales de usuarios por rol
router.get('/reportes/usuarios-totales', (req, res) => {
  const query = `
    SELECT 
      COUNT(*) AS totalUsuarios,
      SUM(CASE WHEN rol_id = 'R003' THEN 1 ELSE 0 END) AS totalCoordinadores,
      SUM(CASE WHEN rol_id = 'R002' THEN 1 ELSE 0 END) AS totalProfesores,
      SUM(CASE WHEN rol_id = 'R001' THEN 1 ELSE 0 END) AS totalAlumnos
    FROM Usuario
  `;

  conexion.query(query, (error, resultados) => {
    if (error) {
      console.error('❌ Error al obtener totales:', error);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }
    res.json(resultados[0]);
  });
});

// Obtener totales de cursos por jornada
router.get("/reportes/cursos", (req, res) => {
  const sql = `
    SELECT 
        'Total Cursos' AS Jornada,
        COUNT(*) AS Total
    FROM Curso

    UNION ALL

    SELECT 
        j.Jornada_Nombre,
        COUNT(c.ID) AS Total
    FROM Jornada j
    LEFT JOIN Curso c ON j.ID = c.jornada_id
    GROUP BY j.ID, j.Jornada_Nombre
  `;

  conexion.query(sql, (err, resultados) => {
    if (err) {
      console.error("Error obteniendo reportes de cursos:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(resultados);
  });
});

// Obtener totales de materias, grados y jornadas
router.get("/reportes/estructura", (req, res) => {
  const sql = `
    SELECT 
        (SELECT COUNT(*) FROM Materia) AS total_materias,
        (SELECT COUNT(*) FROM Grado) AS total_grados,
        (SELECT COUNT(*) FROM Jornada) AS total_jornadas
  `;

  conexion.query(sql, (err, resultados) => {
    if (err) {
      console.error("Error obteniendo datos de estructura:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(resultados[0]); // devolvemos el objeto directamente
  });
});

// Obtener materias y aulas que la usan
router.get("/reportes/materias-aulas", (req, res) => {
  const sql = `
    SELECT 
        m.Materia_Nombre,
        COUNT(a.ID) AS total_aulas
    FROM Materia m
    LEFT JOIN Aula a ON m.ID = a.materia_id
    GROUP BY m.Materia_Nombre
    ORDER BY m.Materia_Nombre;
  `;

  conexion.query(sql, (err, resultados) => {
    if (err) {
      console.error("Error obteniendo materias y aulas:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(resultados);
  });
});

// Obtener grados y cursos que lo usan
router.get("/reportes/grados-cursos", (req, res) => {
  const sql = `
    SELECT 
        g.Grado_Nombre,
        COUNT(c.ID) AS total_cursos
    FROM Grado g
    LEFT JOIN Curso c ON g.ID = c.grado_id
    GROUP BY g.Grado_Nombre
    ORDER BY g.Grado_Nombre;
  `;

  conexion.query(sql, (err, resultados) => {
    if (err) {
      console.error("Error obteniendo grados y cursos:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(resultados);
  });
});

// Obtener jornadas y cursos que lo usan
router.get("/reportes/jornadas-cursos", (req, res) => {
  const sql = `
    SELECT 
        j.Jornada_Nombre,
        COUNT(c.ID) AS total_cursos
    FROM Jornada j
    LEFT JOIN Curso c ON j.ID = c.jornada_id
    GROUP BY j.Jornada_Nombre
    ORDER BY j.Jornada_Nombre;
  `;

  conexion.query(sql, (err, resultados) => {
    if (err) {
      console.error("Error obteniendo jornadas y cursos:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(resultados);
  });
});

// Obtener usuario por id
router.get("/buscar-usuario/:id", (req, res) => {
  const id = req.params.id;

  const sql = `
    SELECT 
        u.ID,
        u.Primer_Nombre,
        u.Primer_Apellido,
        r.Nombre_Rol AS Rol,
        CONCAT(c.Curso_Nombre, ' ', j.Jornada_Nombre) AS Curso_Jornada
    FROM Usuario u
    LEFT JOIN Rol r ON u.rol_id = r.ID
    LEFT JOIN Miembros_Curso mc ON u.ID = mc.usuario_id
    LEFT JOIN Curso c ON mc.curso_id = c.ID
    LEFT JOIN Jornada j ON c.jornada_id = j.ID
    WHERE u.ID = ?
  `;

  conexion.query(sql, [id], (err, resultados) => {
    if (err) {
      console.error("Error buscando usuario:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json(resultados[0]);
  });
});

// Obtener datos para ReportesClase
router.get("/reportes/aulas", (req, res) => {
  const sql = `
    SELECT 
        a.ID AS aula_id,
        a.Aula_Nombre,
        m.Materia_Nombre,
        CONCAT(c.Curso_Nombre, ' - ', j.Jornada_Nombre) AS curso_jornada,
        CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) AS profesor,
        (SELECT COUNT(*) FROM Miembros_Curso mc WHERE mc.curso_id = a.curso_id) AS total_usuarios,
        (SELECT COUNT(*) FROM Anuncio an WHERE an.aula_id = a.ID) AS total_anuncios,
        (
          SELECT COUNT(*) 
          FROM Comentario co 
          INNER JOIN Anuncio an2 ON co.anuncio_id = an2.ID
          WHERE an2.aula_id = a.ID
        ) 
        + 
        (
          SELECT COUNT(*) 
          FROM Comentario co 
          INNER JOIN Trabajo tr2 ON co.trabajo_id = tr2.ID
          WHERE tr2.aula_id = a.ID
        ) AS total_comentarios,
        (SELECT COUNT(*) FROM Trabajo t WHERE t.aula_id = a.ID) AS total_trabajos
    FROM Aula a
    INNER JOIN Materia m ON a.materia_id = m.ID
    INNER JOIN Curso c ON a.curso_id = c.ID
    INNER JOIN Jornada j ON c.jornada_id = j.ID
    INNER JOIN Usuario u ON a.usuario_id = u.ID
  `;

  conexion.query(sql, (err, resultados) => {
    if (err) {
      console.error("Error al obtener reportes de aulas:", err);
      return res.status(500).json({ mensaje: "Error en el servidor" });
    }

    res.json({
      totalAulas: resultados.length,
      aulas: resultados
    });
  });
});

// 📊 Ruta para totales de horarios y profesores
router.get("/reportes/horarios-totales", (req, res) => {
    const query = `
        SELECT
            (SELECT COUNT(*) FROM Horario) AS total_horarios,
            (SELECT COUNT(DISTINCT curso_id) FROM Horario WHERE curso_id IS NOT NULL) AS cursos_con_horario,
            (SELECT COUNT(*) FROM Curso WHERE ID NOT IN (SELECT DISTINCT curso_id FROM Horario WHERE curso_id IS NOT NULL)) AS cursos_sin_horario,
            (SELECT COUNT(DISTINCT profesor_id) FROM Horario WHERE profesor_id IS NOT NULL) AS profesores_con_horario,
            (SELECT COUNT(*) FROM Usuario WHERE rol_id = 'R002' AND ID NOT IN (SELECT DISTINCT profesor_id FROM Horario WHERE profesor_id IS NOT NULL)) AS profesores_sin_horario
    `;

    conexion.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

// 📰 Ruta para total de noticias
router.get("/reportes/noticias-totales", (req, res) => {
    conexion.query(`SELECT COUNT(*) AS total_noticias FROM Noticia`, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

router.get("/reportes/cursos-horarios", (req, res) => {
    const queryConHorario = `
        SELECT c.Curso_Nombre AS curso, j.Jornada_Nombre AS jornada
        FROM Curso c
        JOIN Horario h ON h.curso_id = c.ID
        JOIN Jornada j ON c.jornada_id = j.ID
        GROUP BY c.ID, c.Curso_Nombre, j.Jornada_Nombre
    `;

    const querySinHorario = `
        SELECT c.Curso_Nombre AS curso, j.Jornada_Nombre AS jornada
        FROM Curso c
        LEFT JOIN Horario h ON h.curso_id = c.ID
        JOIN Jornada j ON c.jornada_id = j.ID
        WHERE h.ID IS NULL
        GROUP BY c.ID, c.Curso_Nombre, j.Jornada_Nombre
    `;

    conexion.query(queryConHorario, (err, conHorario) => {
        if (err) return res.status(500).json({ error: err.message });
        conexion.query(querySinHorario, (err2, sinHorario) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.json({ conHorario, sinHorario });
        });
    });
});

router.get("/reportes/profesores-horarios", (req, res) => {
    const queryConHorario = `
        SELECT DISTINCT u.ID, u.Primer_Nombre AS nombre, u.Primer_Apellido AS apellido
        FROM Usuario u
        JOIN Horario h ON h.profesor_id = u.ID
        WHERE u.rol_id = 'R002'
    `;

    const querySinHorario = `
        SELECT u.ID, u.Primer_Nombre AS nombre, u.Primer_Apellido AS apellido
        FROM Usuario u
        LEFT JOIN Horario h ON h.profesor_id = u.ID
        WHERE u.rol_id = 'R002' AND h.ID IS NULL
    `;

    conexion.query(queryConHorario, (err, conHorario) => {
        if (err) return res.status(500).json({ error: err.message });
        conexion.query(querySinHorario, (err2, sinHorario) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.json({ conHorario, sinHorario });
        });
    });
});
