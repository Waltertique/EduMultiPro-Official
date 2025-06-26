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
        res.json({ mensaje: 'Login exitoso', usuario: { id: usuario.ID, nombre: usuario.Primer_Nombre, rol: usuario.rol_id } });
      } else {
        res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }
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
  const { grado_id, jornada_id } = req.body;

  const query = `
    UPDATE Curso
    SET grado_id = ?, jornada_id = ?
    WHERE ID = ?
  `;

  conexion.query(query, [grado_id, jornada_id, id], (error, result) => {
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

// Crear comentario
router.post("/Comentarios", (req, res) => {
  const { descripcion, anuncio_id, usuario_id } = req.body;
  const fecha = new Date().toISOString().split("T")[0];

  const query = `
    INSERT INTO Comentario (Descripcion, Fecha, anuncio_id, usuario_id)
    VALUES (?, ?, ?, ?)
  `;

  conexion.query(query, [descripcion, fecha, anuncio_id, usuario_id], (error, result) => {
    if (error) {
      console.error("Error al crear comentario:", error);
      res.status(500).json({ mensaje: "Error al crear el comentario" });
    } else {
      res.json({ mensaje: "Comentario creado correctamente" });
    }
  });
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

//---------------------------------------------------------------------------------------------------------

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
router.post("/Noticias", upload.fields([
  { name: "imagen1" },
  { name: "imagen2" },
  { name: "imagen3" }
]), (req, res) => {
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

  // Validar que no exista otra noticia con el mismo tipo
  const checkQuery = "SELECT * FROM Noticia WHERE tipo_noticia_id = ?";
  conexion.query(checkQuery, [tipo_noticia_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al validar tipo de noticia" });
    if (results.length > 0) {
      return res.status(400).json({ error: "Ya hay una noticia con este tipo" });
    }

    // Insertar nueva noticia
    const insertQuery = `
      INSERT INTO Noticia (
        Titulo_Noticia, Encabezado, Descripcion1, Descripcion2, Descripcion3,
        Fecha_Notica, Imagen1, Imagen2, Imagen3, tipo_noticia_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conexion.query(insertQuery, [
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
    ], (err2, result) => {
      if (err2) return res.status(500).json({ error: "Error al crear la noticia" });
      res.json({ mensaje: "Noticia creada exitosamente" });
    });
  });
});

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
router.put("/Noticias/:id", upload.fields([
  { name: "imagen1" },
  { name: "imagen2" },
  { name: "imagen3" }
]), (req, res) => {
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

  // Validar duplicado de tipo (ajustar solo si cambió)
  const checkQuery = `
    SELECT * FROM Noticia
    WHERE tipo_noticia_id = ? AND ID != ?
  `;
  conexion.query(checkQuery, [tipo_noticia_id, id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al validar tipo de noticia" });
    if (results.length > 0) {
      return res.status(400).json({ error: "Otra noticia ya tiene este tipo" });
    }

    // Preparar imágenes
    const imagen1 = req.files['imagen1']?.[0]?.filename;
    const imagen2 = req.files['imagen2']?.[0]?.filename;
    const imagen3 = req.files['imagen3']?.[0]?.filename;

    let query = `UPDATE Noticia SET Titulo_Noticia = ?, Encabezado = ?, Descripcion1 = ?, Descripcion2 = ?, Descripcion3 = ?, Fecha_Notica = ?, tipo_noticia_id = ?`;
    const params = [titulo, encabezado, descripcion1, descripcion2 || null, descripcion3 || null, fecha, tipo_noticia_id];

    if (imagen1) { query += ", Imagen1 = ?"; params.push(imagen1); }
    if (imagen2) { query += ", Imagen2 = ?"; params.push(imagen2); }
    if (imagen3) { query += ", Imagen3 = ?"; params.push(imagen3); }

    query += " WHERE ID = ?";
    params.push(id);

    conexion.query(query, params, (error, result) => {
      if (error) return res.status(500).json({ error: "Error al actualizar la noticia" });
      res.json({ mensaje: "Noticia actualizada correctamente" });
    });
  });
});

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