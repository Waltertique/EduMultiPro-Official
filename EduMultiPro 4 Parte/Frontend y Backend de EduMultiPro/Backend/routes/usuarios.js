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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - correo
 *         - contrasena
 *       properties:
 *         correo:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *           example: "usuario@email.com"
 *         contrasena:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario
 *           example: "miContraseña123"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *           example: "Login exitoso"
 *         token:
 *           type: string
 *           description: JWT token para autenticación
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         usuario:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: ID único del usuario
 *               example: "1234567890"
 *             nombre:
 *               type: string
 *               description: Primer nombre del usuario
 *               example: "Juan"
 *             rol:
 *               type: integer
 *               description: ID del rol del usuario
 *               example: 2
 *     PerfilResponse:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *           example: "Acceso a perfil autorizado"
 *         usuario:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "1234567890"
 *             nombre:
 *               type: string
 *               example: "Juan"
 *             rol:
 *               type: integer
 *               example: 2
 *     Error:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *           description: Mensaje de error descriptivo
 *           example: "Error en el servidor"
 */

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

/**
 * @swagger
 * /api/edumultipro/perfil:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     description: Ruta protegida que devuelve la información del usuario que ha iniciado sesión. Requiere token JWT válido.
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PerfilResponse'
 *       401:
 *         description: Token no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               mensaje: "Token no proporcionado"
 *       403:
 *         description: Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               mensaje: "Token inválido o expirado"
 */
router.get('/perfil', verificarToken, (req, res) => { //Esta ruta está protegida por el middleware verificarToken. Si el token es válido, responde con el mensaje y los datos del usuario.
  res.json({ mensaje: 'Acceso a perfil autorizado', usuario: req.usuario });
});

/**
 * @swagger
 * /api/edumultipro/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: Autentica un usuario con correo electrónico y contraseña. Devuelve un JWT token para futuras peticiones.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             ejemplo_login:
 *               summary: Ejemplo de login válido
 *               value:
 *                 correo: "docente@colegio.edu"
 *                 contrasena: "password123"
 *     responses:
 *       200:
 *         description: Login exitoso - Usuario autenticado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               correo_no_registrado:
 *                 summary: Correo no existe en la base de datos
 *                 value:
 *                   mensaje: "Correo no registrado"
 *               contrasena_incorrecta:
 *                 summary: Contraseña incorrecta
 *                 value:
 *                   mensaje: "Contraseña incorrecta"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               error_servidor:
 *                 summary: Error en el servidor
 *                 value:
 *                   mensaje: "Error en el servidor"
 *               error_bcrypt:
 *                 summary: Error al procesar contraseña
 *                 value:
 *                   mensaje: "Error al procesar contraseña"
 */
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

/**
 * @swagger
 * tags:
 *   - name: Autenticación
 *     description: Operaciones de login y autorización de usuarios
 */

module.exports = router;

//---------------------------------------------------------------------------------------------------------

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         ID:
 *           type: string
 *           description: ID único del usuario
 *           example: "1234567890"
 *         Primer_Nombre:
 *           type: string
 *           description: Primer nombre del usuario
 *           example: "Juan"
 *         Segundo_Nombre:
 *           type: string
 *           description: Segundo nombre del usuario
 *           example: "Carlos"
 *         Primer_Apellido:
 *           type: string
 *           description: Primer apellido del usuario
 *           example: "Pérez"
 *         Segundo_Apellido:
 *           type: string
 *           description: Segundo apellido del usuario
 *           example: "González"
 *     CrearUsuarioRequest:
 *       type: object
 *       required:
 *         - id
 *         - primer_nombre
 *         - primer_apellido
 *         - correo1
 *         - contrasena
 *         - contacto1
 *         - fecha_nacimiento
 *         - rol_id
 *         - documento_id
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del usuario
 *           example: "1234567890"
 *         primer_nombre:
 *           type: string
 *           description: Primer nombre del usuario
 *           example: "Juan"
 *         segundo_nombre:
 *           type: string
 *           description: Segundo nombre del usuario (opcional)
 *           example: "Carlos"
 *         primer_apellido:
 *           type: string
 *           description: Primer apellido del usuario
 *           example: "Pérez"
 *         segundo_apellido:
 *           type: string
 *           description: Segundo apellido del usuario (opcional)
 *           example: "González"
 *         correo1:
 *           type: string
 *           format: email
 *           description: Correo electrónico principal
 *           example: "juan.perez@email.com"
 *         contrasena:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario
 *           example: "miContraseña123"
 *         correo2:
 *           type: string
 *           format: email
 *           description: Correo electrónico secundario (opcional)
 *           example: "juan.secundario@email.com"
 *         contacto1:
 *           type: string
 *           description: Número de contacto principal
 *           example: "3001234567"
 *         contacto2:
 *           type: string
 *           description: Número de contacto secundario (opcional)
 *           example: "3009876543"
 *         fecha_nacimiento:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento
 *           example: "1990-05-15"
 *         rol_id:
 *           type: integer
 *           description: ID del rol del usuario
 *           example: 2
 *         documento_id:
 *           type: integer
 *           description: ID del tipo de documento
 *           example: 1
 *         foto:
 *           type: string
 *           format: binary
 *           description: Archivo de imagen para la foto del usuario (opcional)
 *     UsuarioDetallado:
 *       type: object
 *       properties:
 *         usuario:
 *           type: object
 *           properties:
 *             ID:
 *               type: string
 *               example: "1234567890"
 *             documento_id:
 *               type: integer
 *               example: 1
 *             Documento:
 *               type: string
 *               example: "Cédula de Ciudadanía"
 *             Primer_Nombre:
 *               type: string
 *               example: "Juan"
 *             Segundo_Nombre:
 *               type: string
 *               example: "Carlos"
 *             Primer_Apellido:
 *               type: string
 *               example: "Pérez"
 *             Segundo_Apellido:
 *               type: string
 *               example: "González"
 *             Correo1:
 *               type: string
 *               example: "juan.perez@email.com"
 *             rol_id:
 *               type: integer
 *               example: 2
 *             Rol:
 *               type: string
 *               example: "Docente"
 *             Correo2:
 *               type: string
 *               example: "juan.secundario@email.com"
 *             Contacto1:
 *               type: string
 *               example: "3001234567"
 *             Contacto2:
 *               type: string
 *               example: "3009876543"
 *             Fecha_Nacimiento:
 *               type: string
 *               format: date
 *               example: "1990-05-15"
 *             RutaFoto:
 *               type: string
 *               example: "1634567890.jpg"
 *         roles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Rol'
 *         documentos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Documento'
 *     Rol:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           example: 1
 *         Nombre_Rol:
 *           type: string
 *           example: "Administrador"
 *     Documento:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           example: 1
 *         Tipo_Documento:
 *           type: string
 *           example: "Cédula de Ciudadanía"
 *     Error:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *           description: Mensaje de error descriptivo
 *           example: "Error en el servidor"
 *         error:
 *           type: string
 *           description: Descripción del error
 *           example: "Error en la base de datos"
 *     SuccessMessage:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *           description: Mensaje de éxito
 *           example: "Operación exitosa"
 */

//---------------------------------------------------------------------------------------------------------

/**
 * @swagger
 * /api/edumultipro/Usuarios:
 *   get:
 *     summary: Obtener lista de todos los usuarios
 *     description: Retorna una lista con la información básica de todos los usuarios registrados en el sistema
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *             example:
 *               - ID: "1234567890"
 *                 Primer_Nombre: "Juan"
 *                 Segundo_Nombre: "Carlos"
 *                 Primer_Apellido: "Pérez"
 *                 Segundo_Apellido: "González"
 *               - ID: "0987654321"
 *                 Primer_Nombre: "María"
 *                 Segundo_Nombre: "José"
 *                 Primer_Apellido: "López"
 *                 Segundo_Apellido: "Martínez"
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Error en la base de datos"
 */
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

/**
 * @swagger
 * /api/edumultipro/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     description: Elimina permanentemente un usuario del sistema utilizando su ID único
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del usuario a eliminar
 *         schema:
 *           type: string
 *           example: "1234567890"
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *             example:
 *               mensaje: "Usuario eliminado exitosamente"
 *       500:
 *         description: Error al eliminar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               mensaje: "Error al eliminar el usuario"
 */
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

/**
 * @swagger
 * /api/edumultipro/crearUsuario:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema con todos sus datos personales y opción de subir foto de perfil
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CrearUsuarioRequest'
 *           example:
 *             id: "1234567890"
 *             primer_nombre: "Juan"
 *             segundo_nombre: "Carlos"
 *             primer_apellido: "Pérez"
 *             segundo_apellido: "González"
 *             correo1: "juan.perez@email.com"
 *             contrasena: "miContraseña123"
 *             correo2: "juan.secundario@email.com"
 *             contacto1: "3001234567"
 *             contacto2: "3009876543"
 *             fecha_nacimiento: "1990-05-15"
 *             rol_id: 2
 *             documento_id: 1
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *             example:
 *               mensaje: "✅ Usuario creado correctamente"
 *       400:
 *         description: Datos inválidos o faltantes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               mensaje: "Contraseña no proporcionada"
 *       500:
 *         description: Error al crear el usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               mensaje: "Error al crear usuario"
 */
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

/**
 * @swagger
 * /api/edumultipro/roles:
 *   get:
 *     summary: Obtener lista de roles disponibles
 *     description: Retorna todos los roles que pueden ser asignados a los usuarios del sistema
 *     tags: [Catálogos]
 *     responses:
 *       200:
 *         description: Lista de roles obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rol'
 *             example:
 *               - ID: 1
 *                 Nombre_Rol: "Administrador"
 *               - ID: 2
 *                 Nombre_Rol: "Docente"
 *               - ID: 3
 *                 Nombre_Rol: "Estudiante"
 *       500:
 *         description: Error al obtener roles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Error al obtener roles"
 */
router.get("/roles", (req, res) => {
  conexion.query("SELECT ID, Nombre_Rol FROM Rol", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener roles" });
    res.json(results);
  });
});

/**
 * @swagger
 * /api/edumultipro/documentos:
 *   get:
 *     summary: Obtener tipos de documentos disponibles
 *     description: Retorna todos los tipos de documentos de identificación que pueden ser asignados a los usuarios
 *     tags: [Catálogos]
 *     responses:
 *       200:
 *         description: Lista de tipos de documento obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Documento'
 *             example:
 *               - ID: 1
 *                 Tipo_Documento: "Cédula de Ciudadanía"
 *               - ID: 2
 *                 Tipo_Documento: "Tarjeta de Identidad"
 *               - ID: 3
 *                 Tipo_Documento: "Pasaporte"
 *       500:
 *         description: Error al obtener tipos de documento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Error al obtener tipos de documento"
 */
router.get("/documentos", (req, res) => {
  conexion.query("SELECT ID, Tipo_Documento FROM Documento", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener tipos de documento" });
    res.json(results);
  });
});

/**
 * @swagger
 * /api/edumultipro/verUsuario/{id}:
 *   get:
 *     summary: Obtener información detallada de un usuario
 *     description: Retorna toda la información de un usuario específico junto con los catálogos de roles y documentos para formularios
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del usuario
 *         schema:
 *           type: string
 *           example: "1234567890"
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente con toda su información detallada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioDetallado'
 *       500:
 *         description: Error al obtener usuario o usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               usuario_no_encontrado:
 *                 summary: Usuario no encontrado
 *                 value:
 *                   mensaje: "❌ Error al obtener usuario"
 *               error_roles:
 *                 summary: Error al obtener roles
 *                 value:
 *                   mensaje: "Error al obtener roles"
 *               error_documentos:
 *                 summary: Error al obtener documentos
 *                 value:
 *                   mensaje: "Error al obtener documentos"
 */
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

/**
 * @swagger
 * /api/edumultipro/actualizarUsuario:
 *   post:
 *     summary: Actualizar información de un usuario existente
 *     description: Actualiza los campos especificados de un usuario. Solo se actualizarán los campos que se envíen. Permite actualizar contraseña y foto de perfil.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - usuario_id
 *             properties:
 *               usuario_id:
 *                 type: string
 *                 description: ID del usuario a actualizar
 *                 example: "1234567890"
 *               documento_id:
 *                 type: integer
 *                 description: ID del tipo de documento
 *                 example: 1
 *               Primer_Nombre:
 *                 type: string
 *                 description: Primer nombre del usuario
 *                 example: "Juan"
 *               Segundo_Nombre:
 *                 type: string
 *                 description: Segundo nombre del usuario
 *                 example: "Carlos"
 *               Primer_Apellido:
 *                 type: string
 *                 description: Primer apellido del usuario
 *                 example: "Pérez"
 *               Segundo_Apellido:
 *                 type: string
 *                 description: Segundo apellido del usuario
 *                 example: "González"
 *               Correo1:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico principal
 *                 example: "juan.perez@email.com"
 *               rol_id:
 *                 type: integer
 *                 description: ID del rol del usuario
 *                 example: 2
 *               Correo2:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico secundario
 *                 example: "juan.secundario@email.com"
 *               Contacto1:
 *                 type: string
 *                 description: Número de contacto principal
 *                 example: "3001234567"
 *               Contacto2:
 *                 type: string
 *                 description: Número de contacto secundario
 *                 example: "3009876543"
 *               Fecha_Nacimiento:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento
 *                 example: "1990-05-15"
 *               contrasena:
 *                 type: string
 *                 format: password
 *                 description: Nueva contraseña (opcional, solo si se desea cambiar)
 *                 example: "nuevaContraseña123"
 *               RutaFoto:
 *                 type: string
 *                 format: binary
 *                 description: Nueva foto del usuario (opcional)
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *             example:
 *               mensaje: "✅ Usuario actualizado correctamente"
 *       400:
 *         description: No se recibieron datos para actualizar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               mensaje: "No se recibieron datos para actualizar"
 *       500:
 *         description: Error al actualizar usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               mensaje: "Error al actualizar usuario"
 */
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

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Operaciones CRUD para la gestión de usuarios del sistema
 *   - name: Catálogos
 *     description: Información de roles y tipos de documento para formularios
 */

module.exports = router;

//---------------------------------------------------------------------------------------------------------

/**
 * @swagger
 * tags:
 *   - name: Cursos
 *     description: Operaciones CRUD para la gestión de cursos del sistema
 * components:
 *   schemas:
 *     Curso:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: Identificador único del curso
 *         Curso_Nombre:
 *           type: string
 *           description: Nombre del curso
 *         Grado_Nombre:
 *           type: string
 *           description: Nombre del grado
 *         Jornada_Nombre:
 *           type: string
 *           description: Nombre de la jornada
 *     CrearCurso:
 *       type: object
 *       required:
 *         - Curso_Nombre
 *         - grado_id
 *         - jornada_id
 *       properties:
 *         Curso_Nombre:
 *           type: string
 *           description: Nombre del curso
 *         grado_id:
 *           type: integer
 *           description: ID del grado
 *         jornada_id:
 *           type: integer
 *           description: ID de la jornada
 *     ActualizarCurso:
 *       type: object
 *       required:
 *         - grado_id
 *         - jornada_id
 *       properties:
 *         grado_id:
 *           type: integer
 *           description: ID del grado
 *         jornada_id:
 *           type: integer
 *           description: ID de la jornada
 *     Integrante:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID del usuario
 *         Primer_Nombre:
 *           type: string
 *           description: Primer nombre del usuario
 *         Segundo_Nombre:
 *           type: string
 *           description: Segundo nombre del usuario
 *         Primer_Apellido:
 *           type: string
 *           description: Primer apellido del usuario
 *         Segundo_Apellido:
 *           type: string
 *           description: Segundo apellido del usuario
 *     AgregarIntegrante:
 *       type: object
 *       required:
 *         - usuario_id
 *       properties:
 *         usuario_id:
 *           type: integer
 *           description: ID del usuario a agregar
 */

/**
 * @swagger
 * /api/edumultipro/Cursos:
 *   get:
 *     tags:
 *       - Cursos
 *     summary: Obtener todos los cursos
 *     description: Obtiene la lista completa de cursos con información de grado y jornada
 *     responses:
 *       200:
 *         description: Lista de cursos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error en la base de datos"
 */
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

/**
 * @swagger
 * /api/edumultipro/Cursos/{id}:
 *   delete:
 *     tags:
 *       - Cursos
 *     summary: Eliminar un curso
 *     description: Elimina un curso específico del sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del curso a eliminar
 *     responses:
 *       200:
 *         description: Curso eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Curso eliminado exitosamente"
 *       500:
 *         description: Error al eliminar el curso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al eliminar el curso"
 */
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

/**
 * @swagger
 * /api/edumultipro/Cursos/{id}:
 *   put:
 *     tags:
 *       - Cursos
 *     summary: Actualizar un curso existente
 *     description: Actualiza la información de un curso específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del curso a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarCurso'
 *     responses:
 *       200:
 *         description: Curso actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Curso actualizado correctamente"
 *       500:
 *         description: Error al actualizar el curso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al actualizar el curso"
 */
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

/**
 * @swagger
 * /api/edumultipro/Cursos:
 *   post:
 *     tags:
 *       - Cursos
 *     summary: Crear un nuevo curso
 *     description: Crea un nuevo curso en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearCurso'
 *     responses:
 *       200:
 *         description: Curso creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Curso creado correctamente"
 *                 id:
 *                   type: integer
 *                   description: ID del curso creado
 *       500:
 *         description: Error al crear el curso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al crear el curso"
 */
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

/**
 * @swagger
 * /api/edumultipro/Cursos/{id}/integrantes:
 *   get:
 *     tags:
 *       - Cursos
 *     summary: Obtener integrantes de un curso
 *     description: Obtiene la lista de todos los integrantes de un curso específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Lista de integrantes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Integrante'
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error en la base de datos"
 */
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

/**
 * @swagger
 * /api/edumultipro/Cursos/{cursoId}/integrantes/{usuarioId}:
 *   delete:
 *     tags:
 *       - Cursos
 *     summary: Eliminar integrante de un curso
 *     description: Elimina un integrante específico de un curso
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del curso
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Integrante eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Integrante eliminado correctamente"
 *       500:
 *         description: Error al eliminar el integrante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al eliminar el integrante"
 */
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

/**
 * @swagger
 * /api/edumultipro/Cursos/{cursoId}/integrantes:
 *   post:
 *     tags:
 *       - Cursos
 *     summary: Agregar integrante a un curso
 *     description: Agrega un nuevo integrante a un curso específico
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgregarIntegrante'
 *     responses:
 *       200:
 *         description: Integrante agregado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Integrante agregado correctamente"
 *       500:
 *         description: Error al agregar el integrante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al agregar el integrante"
 */
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


/**
 * @swagger
 * tags:
 *   - name: Materias
 *     description: Operaciones CRUD para la gestión de materias del sistema
 *   - name: Grados
 *     description: Operaciones CRUD para la gestión de grados del sistema
 * components:
 *   schemas:
 *     Materia:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: Identificador único de la materia
 *         Materia_Nombre:
 *           type: string
 *           description: Nombre de la materia
 *         Descripcion_Materia:
 *           type: string
 *           description: Descripción de la materia
 *     CrearMateria:
 *       type: object
 *       required:
 *         - Materia_Nombre
 *         - Descripcion_Materia
 *       properties:
 *         Materia_Nombre:
 *           type: string
 *           description: Nombre de la materia
 *         Descripcion_Materia:
 *           type: string
 *           description: Descripción de la materia
 *     ActualizarMateria:
 *       type: object
 *       required:
 *         - Materia_Nombre
 *         - Descripcion_Materia
 *       properties:
 *         Materia_Nombre:
 *           type: string
 *           description: Nombre de la materia
 *         Descripcion_Materia:
 *           type: string
 *           description: Descripción de la materia
 *     Grado:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: Identificador único del grado
 *         Grado_Nombre:
 *           type: string
 *           description: Nombre del grado
 *         Descripcion_Grado:
 *           type: string
 *           description: Descripción del grado
 *     CrearGrado:
 *       type: object
 *       required:
 *         - Grado_Nombre
 *         - Descripcion_Grado
 *       properties:
 *         Grado_Nombre:
 *           type: string
 *           description: Nombre del grado
 *         Descripcion_Grado:
 *           type: string
 *           description: Descripción del grado
 *     ActualizarGrado:
 *       type: object
 *       required:
 *         - Grado_Nombre
 *         - Descripcion_Grado
 *       properties:
 *         Grado_Nombre:
 *           type: string
 *           description: Nombre del grado
 *         Descripcion_Grado:
 *           type: string
 *           description: Descripción del grado
 */

//---------------------------------------------------------------------------------------------------------

/**
 * @swagger
 * /api/edumultipro/Materias:
 *   get:
 *     tags:
 *       - Materias
 *     summary: Obtener todas las materias
 *     description: Obtiene la lista completa de materias del sistema
 *     responses:
 *       200:
 *         description: Lista de materias obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Materia'
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error en la base de datos"
 */
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

/**
 * @swagger
 * /api/edumultipro/Materias/{id}:
 *   delete:
 *     tags:
 *       - Materias
 *     summary: Eliminar una materia
 *     description: Elimina una materia específica del sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la materia a eliminar
 *     responses:
 *       200:
 *         description: Materia eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Materias eliminado exitosamente"
 *       500:
 *         description: Error al eliminar la materia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al eliminar el Materias"
 */
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

/**
 * @swagger
 * /api/edumultipro/Materias/{id}:
 *   put:
 *     tags:
 *       - Materias
 *     summary: Actualizar una materia existente
 *     description: Actualiza la información de una materia específica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la materia a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarMateria'
 *     responses:
 *       200:
 *         description: Materia actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Materia actualizada correctamente"
 *       500:
 *         description: Error al actualizar la materia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al actualizar la materia"
 */
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

/**
 * @swagger
 * /api/edumultipro/Materias:
 *   post:
 *     tags:
 *       - Materias
 *     summary: Crear una nueva materia
 *     description: Crea una nueva materia en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearMateria'
 *     responses:
 *       201:
 *         description: Materia creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Materia creada correctamente"
 *       500:
 *         description: Error al crear la materia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al crear la materia"
 */
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

/**
 * @swagger
 * /api/edumultipro/Grados:
 *   get:
 *     tags:
 *       - Grados
 *     summary: Obtener todos los grados
 *     description: Obtiene la lista completa de grados del sistema
 *     responses:
 *       200:
 *         description: Lista de grados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grado'
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error en la base de datos"
 */
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

/**
 * @swagger
 * /api/edumultipro/Grados/{id}:
 *   delete:
 *     tags:
 *       - Grados
 *     summary: Eliminar un grado
 *     description: Elimina un grado específico del sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del grado a eliminar
 *     responses:
 *       200:
 *         description: Grado eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Grado eliminado exitosamente"
 *       500:
 *         description: Error al eliminar el grado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al eliminar el Grado"
 */
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

/**
 * @swagger
 * /api/edumultipro/Grados/{id}:
 *   put:
 *     tags:
 *       - Grados
 *     summary: Actualizar un grado existente
 *     description: Actualiza la información de un grado específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del grado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarGrado'
 *     responses:
 *       200:
 *         description: Grado actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Grado actualizado correctamente"
 *       500:
 *         description: Error al actualizar el grado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al actualizar el Grado"
 */
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

/**
 * @swagger
 * /api/edumultipro/Grados:
 *   post:
 *     tags:
 *       - Grados
 *     summary: Crear un nuevo grado
 *     description: Crea un nuevo grado en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearGrado'
 *     responses:
 *       201:
 *         description: Grado creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Grado creada correctamente"
 *       500:
 *         description: Error al crear el grado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al crear el grado"
 */
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


/**
 * @swagger
 * tags:
 *   - name: Jornadas
 *     description: Operaciones CRUD para la gestión de jornadas del sistema
 *   - name: Horarios
 *     description: Operaciones CRUD para la gestión de horarios del sistema
 * components:
 *   schemas:
 *     Jornada:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: Identificador único de la jornada
 *         Jornada_Nombre:
 *           type: string
 *           description: Nombre de la jornada
 *         Descripcion_Jornada:
 *           type: string
 *           description: Descripción de la jornada
 *     CrearJornada:
 *       type: object
 *       required:
 *         - Jornada_Nombre
 *         - Descripcion_Jornada
 *       properties:
 *         Jornada_Nombre:
 *           type: string
 *           description: Nombre de la jornada
 *         Descripcion_Jornada:
 *           type: string
 *           description: Descripción de la jornada
 *     ActualizarJornada:
 *       type: object
 *       required:
 *         - Jornada_Nombre
 *         - Descripcion_Jornada
 *       properties:
 *         Jornada_Nombre:
 *           type: string
 *           description: Nombre de la jornada
 *         Descripcion_Jornada:
 *           type: string
 *           description: Descripción de la jornada
 *     Horario:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: Identificador único del horario
 *         Titulo_Horario:
 *           type: string
 *           description: Título del horario
 *         Curso_Nombre:
 *           type: string
 *           description: Nombre del curso
 *         Jornada_Nombre:
 *           type: string
 *           description: Nombre de la jornada
 *         Profesor_Nombre:
 *           type: string
 *           description: Nombre completo del profesor
 *     HorarioDetalle:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: Identificador único del horario
 *         Titulo_Horario:
 *           type: string
 *           description: Título del horario
 *         Imagen_Horario:
 *           type: string
 *           description: Nombre del archivo de imagen
 *         Descripcion_Horario:
 *           type: string
 *           description: Descripción del horario
 *         profesor_id:
 *           type: integer
 *           description: ID del profesor asignado
 *         curso_id:
 *           type: integer
 *           description: ID del curso asignado
 *     CrearHorario:
 *       type: object
 *       required:
 *         - titulo
 *         - descripcion
 *       properties:
 *         titulo:
 *           type: string
 *           description: Título del horario
 *         descripcion:
 *           type: string
 *           description: Descripción del horario
 *         profesor_id:
 *           type: integer
 *           description: ID del profesor (exclusivo con curso_id)
 *         curso_id:
 *           type: integer
 *           description: ID del curso (exclusivo con profesor_id)
 *         imagen:
 *           type: string
 *           format: binary
 *           description: Imagen del horario
 *     ActualizarHorario:
 *       type: object
 *       required:
 *         - titulo
 *         - descripcion
 *       properties:
 *         titulo:
 *           type: string
 *           description: Título del horario
 *         descripcion:
 *           type: string
 *           description: Descripción del horario
 *         profesor_id:
 *           type: integer
 *           description: ID del profesor (exclusivo con curso_id)
 *         curso_id:
 *           type: integer
 *           description: ID del curso (exclusivo con profesor_id)
 *         imagen:
 *           type: string
 *           format: binary
 *           description: Nueva imagen del horario (opcional)
 *     Profesor:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID del profesor
 *         Nombre_Completo:
 *           type: string
 *           description: Nombre completo del profesor
 *     CursoJornada:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID del curso
 *         Curso_Con_Jornada:
 *           type: string
 *           description: Nombre del curso con jornada
 */

/**
 * @swagger
 * /api/edumultipro/Jornadas:
 *   get:
 *     tags:
 *       - Jornadas
 *     summary: Obtener todas las jornadas
 *     description: Obtiene la lista completa de jornadas del sistema
 *     responses:
 *       200:
 *         description: Lista de jornadas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Jornada'
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error en la base de datos"
 */
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

/**
 * @swagger
 * /api/edumultipro/Jornadas/{id}:
 *   delete:
 *     tags:
 *       - Jornadas
 *     summary: Eliminar una jornada
 *     description: Elimina una jornada específica del sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la jornada a eliminar
 *     responses:
 *       200:
 *         description: Jornada eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Jornada eliminado exitosamente"
 *       500:
 *         description: Error al eliminar la jornada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al eliminar el Jornada"
 */
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

/**
 * @swagger
 * /api/edumultipro/Jornadas/{id}:
 *   put:
 *     tags:
 *       - Jornadas
 *     summary: Actualizar una jornada existente
 *     description: Actualiza la información de una jornada específica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la jornada a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarJornada'
 *     responses:
 *       200:
 *         description: Jornada actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "jornada actualizado correctamente"
 *       500:
 *         description: Error al actualizar la jornada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al actualizar la jornada"
 */
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

/**
 * @swagger
 * /api/edumultipro/Jornadas:
 *   post:
 *     tags:
 *       - Jornadas
 *     summary: Crear una nueva jornada
 *     description: Crea una nueva jornada en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearJornada'
 *     responses:
 *       201:
 *         description: Jornada creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Jornada creada correctamente"
 *       500:
 *         description: Error al crear la jornada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al crear la jornada"
 */
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

/**
 * @swagger
 * /api/edumultipro/Horarios:
 *   get:
 *     tags:
 *       - Horarios
 *     summary: Obtener todos los horarios
 *     description: Obtiene la lista completa de horarios con información de curso, jornada y profesor
 *     responses:
 *       200:
 *         description: Lista de horarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Horario'
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error en la base de datos"
 */
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

/**
 * @swagger
 * /api/edumultipro/Horarios/{id}:
 *   delete:
 *     tags:
 *       - Horarios
 *     summary: Eliminar un horario
 *     description: Elimina un horario específico del sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del horario a eliminar
 *     responses:
 *       200:
 *         description: Horario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Horario eliminado exitosamente"
 *       500:
 *         description: Error al eliminar el horario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al eliminar el Horario"
 */
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

/**
 * @swagger
 * /api/edumultipro/Profesores:
 *   get:
 *     tags:
 *       - Horarios
 *     summary: Obtener lista de profesores
 *     description: Obtiene la lista de usuarios con rol de profesor (rol_id = 'R002')
 *     responses:
 *       200:
 *         description: Lista de profesores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profesor'
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error en la base de datos"
 */
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

/**
 * @swagger
 * /api/edumultipro/Horarios:
 *   post:
 *     tags:
 *       - Horarios
 *     summary: Crear un nuevo horario
 *     description: Crea un nuevo horario en el sistema. Debe seleccionar solo profesor O curso, no ambos.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CrearHorario'
 *     responses:
 *       200:
 *         description: Horario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Horario creado exitosamente"
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   examples:
 *                     selection: "Debe seleccionar solo profesor o curso"
 *                     exists: "Ya existe un horario asignado para ese profesor o curso."
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al guardar horario"
 */
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

/**
 * @swagger
 * /api/edumultipro/Cursos-jornada:
 *   get:
 *     tags:
 *       - Horarios
 *     summary: Obtener cursos con jornada
 *     description: Obtiene la lista de cursos concatenados con su jornada correspondiente
 *     responses:
 *       200:
 *         description: Lista de cursos con jornada obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CursoJornada'
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error en la base de datos"
 */
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

/**
 * @swagger
 * /api/edumultipro/Horarios/{id}:
 *   get:
 *     tags:
 *       - Horarios
 *     summary: Obtener un horario específico
 *     description: Obtiene los detalles completos de un horario por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del horario a obtener
 *     responses:
 *       200:
 *         description: Horario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HorarioDetalle'
 *       404:
 *         description: Horario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Horario no encontrado"
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error en la base de datos"
 */
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

/**
 * @swagger
 * /api/edumultipro/Horarios/{id}:
 *   put:
 *     tags:
 *       - Horarios
 *     summary: Actualizar un horario existente
 *     description: Actualiza un horario específico. Debe seleccionar solo profesor O curso, no ambos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del horario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarHorario'
 *     responses:
 *       200:
 *         description: Horario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Horario actualizado correctamente"
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   examples:
 *                     selection: "Debe seleccionar solo profesor o curso"
 *                     exists: "Ese profesor o curso ya tiene un horario asignado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al actualizar el horario"
 */
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


const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

/**
 * @swagger
 * components:
 *   schemas:
 *     Aula:
 *       type: object
 *       required:
 *         - aula_nombre
 *         - materia_id
 *         - curso_id
 *         - usuario_id
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID único del aula
 *         Aula_Nombre:
 *           type: string
 *           description: Nombre del aula
 *         Materia_Nombre:
 *           type: string
 *           description: Nombre de la materia
 *         Curso_Jornada:
 *           type: string
 *           description: Curso y jornada concatenados
 *         Profesor:
 *           type: string
 *           description: Nombre completo del profesor
 *         aula_nombre:
 *           type: string
 *           description: Nombre del aula (para crear/actualizar)
 *         materia_id:
 *           type: integer
 *           description: ID de la materia
 *         curso_id:
 *           type: integer
 *           description: ID del curso
 *         usuario_id:
 *           type: integer
 *           description: ID del usuario (profesor)
 *       example:
 *         ID: 1
 *         Aula_Nombre: "Matemáticas 101"
 *         Materia_Nombre: "Matemáticas"
 *         Curso_Jornada: "10° A Mañana"
 *         Profesor: "Juan Pérez"
 *     
 *     Anuncio:
 *       type: object
 *       required:
 *         - titulo
 *         - descripcion
 *         - aula_id
 *         - usuario_id
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID único del anuncio
 *         Titulo_Anuncio:
 *           type: string
 *           description: Título del anuncio
 *         Descripcion_Anuncio:
 *           type: string
 *           description: Descripción del anuncio
 *         Enlace_Anuncio:
 *           type: string
 *           description: Archivos adjuntos separados por ;
 *         Fecha_Anuncio:
 *           type: string
 *           format: date
 *           description: Fecha del anuncio
 *         Profesor:
 *           type: string
 *           description: Nombre completo del profesor
 *         RutaFoto:
 *           type: string
 *           description: Ruta de la foto del profesor
 *         titulo:
 *           type: string
 *           description: Título del anuncio (para crear/actualizar)
 *         descripcion:
 *           type: string
 *           description: Descripción del anuncio (para crear/actualizar)
 *         aula_id:
 *           type: integer
 *           description: ID del aula
 *         usuario_id:
 *           type: integer
 *           description: ID del usuario
 *       example:
 *         ID: 1
 *         Titulo_Anuncio: "Examen Final"
 *         Descripcion_Anuncio: "El examen final será el próximo viernes"
 *         Fecha_Anuncio: "2024-01-15"
 *         Profesor: "Juan Pérez"
 */

/**
 * @swagger
 * tags:
 *   - name: Aulas
 *     description: Operaciones para la gestión de aulas del sistema
 *   - name: Anuncios
 *     description: Operaciones para la gestión de anuncios en las aulas
 */

/**
 * @swagger
 * /Aulas:
 *   get:
 *     summary: Obtener todas las aulas
 *     tags: [Aulas]
 *     description: Retorna una lista completa de todas las aulas con información de materia, curso, jornada y profesor
 *     responses:
 *       200:
 *         description: Lista de aulas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aula'
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error en la base de datos"
 */

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

/**
 * @swagger
 * /Aulas/{id}:
 *   delete:
 *     summary: Eliminar un aula
 *     tags: [Aulas]
 *     description: Elimina un aula específica del sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del aula a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aula eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Aula eliminado exitosamente"
 *       500:
 *         description: Error al eliminar el aula
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al eliminar el Aula"
 */

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

/**
 * @swagger
 * /Aulas:
 *   post:
 *     summary: Crear una nueva aula
 *     tags: [Aulas]
 *     description: Crea una nueva aula en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aula_nombre
 *               - materia_id
 *               - curso_id
 *               - usuario_id
 *             properties:
 *               aula_nombre:
 *                 type: string
 *                 description: Nombre del aula
 *                 example: "Matemáticas 101"
 *               materia_id:
 *                 type: integer
 *                 description: ID de la materia
 *                 example: 1
 *               curso_id:
 *                 type: integer
 *                 description: ID del curso
 *                 example: 1
 *               usuario_id:
 *                 type: integer
 *                 description: ID del profesor
 *                 example: 1
 *     responses:
 *       200:
 *         description: Aula creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Aula creada exitosamente"
 *       500:
 *         description: Error al crear el aula
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al crear el Aula"
 */

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

/**
 * @swagger
 * /Aulas/{id}:
 *   put:
 *     summary: Actualizar un aula
 *     tags: [Aulas]
 *     description: Actualiza la información de un aula específica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del aula a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Aula_Nombre
 *               - materia_id
 *             properties:
 *               Aula_Nombre:
 *                 type: string
 *                 description: Nuevo nombre del aula
 *                 example: "Física Avanzada"
 *               materia_id:
 *                 type: integer
 *                 description: ID de la nueva materia
 *                 example: 2
 *     responses:
 *       200:
 *         description: Aula actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Aula actualizada correctamente"
 *       500:
 *         description: Error al actualizar el aula
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al actualizar el Aula"
 */

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

/**
 * @swagger
 * /Aulas/{id}:
 *   get:
 *     summary: Obtener una aula por ID
 *     tags: [Aulas]
 *     description: Retorna la información completa de un aula específica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del aula
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aula encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aula'
 *       404:
 *         description: Aula no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Aula no encontrada"
 */

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

/**
 * @swagger
 * /Anuncios/Aula/{aula_id}:
 *   get:
 *     summary: Obtener todos los anuncios de un aula
 *     tags: [Anuncios]
 *     description: Retorna todos los anuncios de un aula específica ordenados por fecha descendente
 *     parameters:
 *       - in: path
 *         name: aula_id
 *         required: true
 *         description: ID del aula
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de anuncios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Anuncio'
 *       500:
 *         description: Error al obtener anuncios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener anuncios"
 */

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

/**
 * @swagger
 * /Anuncios:
 *   post:
 *     summary: Crear un nuevo anuncio
 *     tags: [Anuncios]
 *     description: Crea un nuevo anuncio en un aula específica con posibilidad de adjuntar archivos
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - aula_id
 *               - usuario_id
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título del anuncio
 *                 example: "Examen Final de Matemáticas"
 *               descripcion:
 *                 type: string
 *                 description: Descripción detallada del anuncio
 *                 example: "El examen final se realizará el próximo viernes a las 8:00 AM"
 *               aula_id:
 *                 type: integer
 *                 description: ID del aula donde se publica el anuncio
 *                 example: 1
 *               usuario_id:
 *                 type: integer
 *                 description: ID del usuario que crea el anuncio
 *                 example: 1
 *               archivo:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Archivos adjuntos (opcional)
 *     responses:
 *       200:
 *         description: Anuncio creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Anuncio creado con éxito"
 *       500:
 *         description: Error al crear el anuncio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al crear el anuncio"
 */

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

/**
 * @swagger
 * /Anuncios/{id}:
 *   delete:
 *     summary: Eliminar un anuncio
 *     tags: [Anuncios]
 *     description: Elimina un anuncio específico del sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del anuncio a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Anuncio eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Anuncio eliminado correctamente"
 *       500:
 *         description: Error al eliminar el anuncio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al eliminar el anuncio"
 */

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

/**
 * @swagger
 * /Anuncios/{id}:
 *   put:
 *     summary: Editar un anuncio
 *     tags: [Anuncios]
 *     description: Actualiza un anuncio existente con posibilidad de cambiar archivos adjuntos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del anuncio a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Nuevo título del anuncio
 *                 example: "Examen Final Reprogramado"
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción del anuncio
 *                 example: "El examen ha sido reprogramado para el lunes"
 *               archivo:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Nuevos archivos adjuntos (opcional)
 *     responses:
 *       200:
 *         description: Anuncio actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Anuncio actualizado correctamente"
 *       500:
 *         description: Error al actualizar anuncio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al actualizar anuncio"
 */

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



//---------------------------------------------------------------------------------------------------------

/**
 * @swagger
 * components:
 *   schemas:
 *     Comentario:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID único del comentario
 *         Descripcion:
 *           type: string
 *           description: Contenido del comentario
 *         Fecha:
 *           type: string
 *           format: date
 *           description: Fecha de creación del comentario
 *         Nombre_Usuario:
 *           type: string
 *           description: Nombre completo del usuario que hizo el comentario
 *         RutaFoto:
 *           type: string
 *           description: Ruta de la foto de perfil del usuario
 * 
 *     ComentarioInput:
 *       type: object
 *       required:
 *         - descripcion
 *         - usuario_id
 *       properties:
 *         descripcion:
 *           type: string
 *           description: Contenido del comentario
 *         trabajo_id:
 *           type: integer
 *           nullable: true
 *           description: ID del trabajo (si es comentario de trabajo)
 *         anuncio_id:
 *           type: integer
 *           nullable: true
 *           description: ID del anuncio (si es comentario de anuncio)
 *         usuario_id:
 *           type: integer
 *           description: ID del usuario que crea el comentario
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha del comentario (opcional, usa fecha actual si no se proporciona)
 * 
 *     Usuario:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID único del usuario
 *         Primer_Nombre:
 *           type: string
 *           description: Primer nombre del usuario
 *         Segundo_Nombre:
 *           type: string
 *           nullable: true
 *           description: Segundo nombre del usuario
 *         Primer_Apellido:
 *           type: string
 *           description: Primer apellido del usuario
 *         Segundo_Apellido:
 *           type: string
 *           nullable: true
 *           description: Segundo apellido del usuario
 * 
 *     Trabajo:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID único del trabajo
 *         Titulo_Trabajo:
 *           type: string
 *           description: Título del trabajo
 *         Descripcion_Trabajo:
 *           type: string
 *           description: Descripción detallada del trabajo
 *         Fecha_Trabajo:
 *           type: string
 *           format: date
 *           description: Fecha de entrega o creación del trabajo
 * 
 *     TrabajoArchivo:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID único del archivo
 *         trabajo_id:
 *           type: integer
 *           description: ID del trabajo asociado
 *         ruta_archivo:
 *           type: string
 *           description: Ruta donde está almacenado el archivo
 *         nombre_original:
 *           type: string
 *           description: Nombre original del archivo subido
 * 
 *     ApiResponse:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *           description: Mensaje de respuesta de la API
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Descripción del error
 */

/**
 * @swagger
 * tags:
 *   - name: Comentarios
 *     description: Operaciones CRUD para la gestión de comentarios del sistema
 *   - name: Aulas
 *     description: Operaciones para la gestión de aulas del sistema
 *   - name: Trabajos
 *     description: Operaciones CRUD para la gestión de trabajos del sistema
 */

// ============================================================================
// SECCIÓN: COMENTARIOS
// ============================================================================

/**
 * @swagger
 * /Comentarios/Anuncio/{anuncio_id}:
 *   get:
 *     summary: Obtener comentarios por anuncio
 *     description: Recupera todos los comentarios asociados a un anuncio específico, incluyendo información del usuario que los creó
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: anuncio_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del anuncio
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *             example:
 *               - ID: 1
 *                 Descripcion: "Excelente anuncio, muy informativo"
 *                 Fecha: "2024-01-15"
 *                 Nombre_Usuario: "Juan Pérez"
 *                 RutaFoto: "/uploads/profile1.jpg"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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

/**
 * @swagger
 * /Comentarios:
 *   post:
 *     summary: Crear un nuevo comentario
 *     description: Crea un comentario para un trabajo o anuncio específico
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComentarioInput'
 *           examples:
 *             comentario_anuncio:
 *               summary: Comentario para anuncio
 *               value:
 *                 descripcion: "Me parece muy interesante este anuncio"
 *                 anuncio_id: 1
 *                 usuario_id: 5
 *                 fecha: "2024-01-20"
 *             comentario_trabajo:
 *               summary: Comentario para trabajo
 *               value:
 *                 descripcion: "Excelente trabajo, muy completo"
 *                 trabajo_id: 3
 *                 usuario_id: 2
 *     responses:
 *       200:
 *         description: Comentario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               mensaje: "Comentario creado correctamente"
 *       500:
 *         description: Error al crear el comentario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

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

/**
 * @swagger
 * /Comentarios/{id}:
 *   delete:
 *     summary: Eliminar comentario
 *     description: Elimina un comentario específico por su ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del comentario a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               mensaje: "Comentario eliminado correctamente"
 *       500:
 *         description: Error al eliminar el comentario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

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

// ============================================================================
// SECCIÓN: AULAS
// ============================================================================

/**
 * @swagger
 * /Aulas/{id}/integrantes:
 *   get:
 *     summary: Obtener integrantes del aula
 *     description: Recupera la lista de todos los usuarios que forman parte de un aula específica
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del aula
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de integrantes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *             example:
 *               - ID: 1
 *                 Primer_Nombre: "Juan"
 *                 Segundo_Nombre: "Carlos"
 *                 Primer_Apellido: "Pérez"
 *                 Segundo_Apellido: "González"
 *               - ID: 2
 *                 Primer_Nombre: "María"
 *                 Segundo_Nombre: null
 *                 Primer_Apellido: "López"
 *                 Segundo_Apellido: "Martínez"
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

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

// ============================================================================
// SECCIÓN: TRABAJOS
// ============================================================================

/**
 * @swagger
 * /Trabajos/Aula/{id}:
 *   get:
 *     summary: Obtener trabajos por aula
 *     description: Recupera todos los trabajos asignados a un aula específica
 *     tags: [Trabajos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del aula
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de trabajos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trabajo'
 *             example:
 *               - ID: 1
 *                 Titulo_Trabajo: "Ensayo sobre Literatura"
 *                 Descripcion_Trabajo: "Análisis de obras literarias del siglo XX"
 *                 Fecha_Trabajo: "2024-02-15"
 *               - ID: 2
 *                 Titulo_Trabajo: "Proyecto de Matemáticas"
 *                 Descripcion_Trabajo: "Resolución de problemas de cálculo"
 *                 Fecha_Trabajo: "2024-02-20"
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

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

/**
 * @swagger
 * /CrearTrabajo:
 *   post:
 *     summary: Crear un nuevo trabajo
 *     description: Crea un trabajo con archivos adjuntos opcionales
 *     tags: [Trabajos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - fecha
 *               - aula_id
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título del trabajo
 *                 example: "Proyecto Final de Historia"
 *               descripcion:
 *                 type: string
 *                 description: Descripción detallada del trabajo
 *                 example: "Investigación sobre la Segunda Guerra Mundial"
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de entrega del trabajo
 *                 example: "2024-03-15"
 *               aula_id:
 *                 type: integer
 *                 description: ID del aula donde se asigna
 *                 example: 1
 *               archivos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Archivos adjuntos al trabajo
 *     responses:
 *       200:
 *         description: Trabajo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             examples:
 *               con_archivos:
 *                 summary: Trabajo con archivos
 *                 value:
 *                   mensaje: "Trabajo y archivos guardados"
 *               sin_archivos:
 *                 summary: Trabajo sin archivos
 *                 value:
 *                   mensaje: "Trabajo guardado sin archivos"
 *       500:
 *         description: Error al guardar el trabajo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

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

/**
 * @swagger
 * /Trabajo/{id}:
 *   get:
 *     summary: Obtener datos de un trabajo
 *     description: Recupera la información completa de un trabajo específico, incluyendo sus archivos adjuntos
 *     tags: [Trabajos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del trabajo
 *         example: 1
 *     responses:
 *       200:
 *         description: Datos del trabajo obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trabajo:
 *                   $ref: '#/components/schemas/Trabajo'
 *                 archivos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TrabajoArchivo'
 *             example:
 *               trabajo:
 *                 ID: 1
 *                 Titulo_Trabajo: "Proyecto Final de Historia"
 *                 Descripcion_Trabajo: "Investigación sobre la Segunda Guerra Mundial"
 *                 Fecha_Trabajo: "2024-03-15"
 *                 aula_id: 1
 *               archivos:
 *                 - ID: 1
 *                   trabajo_id: 1
 *                   ruta_archivo: "documento1.pdf"
 *                   nombre_original: "Investigación_WWII.pdf"
 *       404:
 *         description: Trabajo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error al obtener archivos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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

/**
 * @swagger
 * /ActualizarTrabajo:
 *   post:
 *     summary: Actualizar trabajo existente
 *     description: Actualiza los datos de un trabajo existente, permite eliminar archivos antiguos y agregar nuevos
 *     tags: [Trabajos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - trabajo_id
 *               - titulo
 *               - descripcion
 *               - fecha
 *               - aula_id
 *             properties:
 *               trabajo_id:
 *                 type: integer
 *                 description: ID del trabajo a actualizar
 *                 example: 1
 *               titulo:
 *                 type: string
 *                 description: Nuevo título del trabajo
 *                 example: "Proyecto Final de Historia - Actualizado"
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción del trabajo
 *                 example: "Investigación completa sobre la Segunda Guerra Mundial con análisis adicional"
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Nueva fecha de entrega
 *                 example: "2024-03-20"
 *               aula_id:
 *                 type: integer
 *                 description: ID del aula
 *                 example: 1
 *               eliminar_archivos:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: IDs de archivos a eliminar
 *                 example: [1, 3]
 *               archivos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Nuevos archivos a agregar
 *     responses:
 *       200:
 *         description: Trabajo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               mensaje: "Trabajo actualizado correctamente"
 *       500:
 *         description: Error al actualizar el trabajo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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

/**
 * @swagger
 * /Trabajo/{id}:
 *   delete:
 *     summary: Eliminar trabajo
 *     description: Elimina un trabajo específico junto con todos sus archivos asociados
 *     tags: [Trabajos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del trabajo a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Trabajo eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               mensaje: "Trabajo eliminado correctamente"
 *       500:
 *         description: Error al eliminar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               error_archivos:
 *                 summary: Error al eliminar archivos
 *                 value:
 *                   error: "Error al eliminar archivos"
 *               error_trabajo:
 *                 summary: Error al eliminar trabajo
 *                 value:
 *                   error: "Error al eliminar el trabajo"
 */

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



//---------------------------------------------------------------------------------------------------------

// ACA VAMOS 

/**
 * @swagger
 * components:
 *   schemas:
 *     Comentario:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID único del comentario
 *         Descripcion:
 *           type: string
 *           description: Contenido del comentario
 *         Fecha:
 *           type: string
 *           format: date
 *           description: Fecha de creación del comentario
 *         Nombre_Usuario:
 *           type: string
 *           description: Nombre completo del usuario que hizo el comentario
 *         RutaFoto:
 *           type: string
 *           description: Ruta de la foto de perfil del usuario
 * 
 *     ComentarioInput:
 *       type: object
 *       required:
 *         - descripcion
 *         - usuario_id
 *       properties:
 *         descripcion:
 *           type: string
 *           description: Contenido del comentario
 *         trabajo_id:
 *           type: integer
 *           nullable: true
 *           description: ID del trabajo (si es comentario de trabajo)
 *         anuncio_id:
 *           type: integer
 *           nullable: true
 *           description: ID del anuncio (si es comentario de anuncio)
 *         usuario_id:
 *           type: integer
 *           description: ID del usuario que crea el comentario
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha del comentario (opcional, usa fecha actual si no se proporciona)
 * 
 *     Usuario:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID único del usuario
 *         Primer_Nombre:
 *           type: string
 *           description: Primer nombre del usuario
 *         Segundo_Nombre:
 *           type: string
 *           nullable: true
 *           description: Segundo nombre del usuario
 *         Primer_Apellido:
 *           type: string
 *           description: Primer apellido del usuario
 *         Segundo_Apellido:
 *           type: string
 *           nullable: true
 *           description: Segundo apellido del usuario
 * 
 *     Trabajo:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID único del trabajo
 *         Titulo_Trabajo:
 *           type: string
 *           description: Título del trabajo
 *         Descripcion_Trabajo:
 *           type: string
 *           description: Descripción detallada del trabajo
 *         Fecha_Trabajo:
 *           type: string
 *           format: date
 *           description: Fecha de entrega o creación del trabajo
 * 
 *     TrabajoArchivo:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID único del archivo
 *         trabajo_id:
 *           type: integer
 *           description: ID del trabajo asociado
 *         ruta_archivo:
 *           type: string
 *           description: Ruta donde está almacenado el archivo
 *         nombre_original:
 *           type: string
 *           description: Nombre original del archivo subido
 * 
 *     ApiResponse:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *           description: Mensaje de respuesta de la API
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Descripción del error
 */

/**
 * @swagger
 * tags:
 *   - name: Comentarios
 *     description: Operaciones CRUD para la gestión de comentarios del sistema
 *   - name: Aulas
 *     description: Operaciones para la gestión de aulas del sistema
 *   - name: Trabajos
 *     description: Operaciones CRUD para la gestión de trabajos del sistema
 */

// ============================================================================
// SECCIÓN: COMENTARIOS
// ============================================================================

/**
 * @swagger
 * /Comentarios/Anuncio/{anuncio_id}:
 *   get:
 *     summary: Obtener comentarios por anuncio
 *     description: Recupera todos los comentarios asociados a un anuncio específico, incluyendo información del usuario que los creó
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: anuncio_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del anuncio
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *             example:
 *               - ID: 1
 *                 Descripcion: "Excelente anuncio, muy informativo"
 *                 Fecha: "2024-01-15"
 *                 Nombre_Usuario: "Juan Pérez"
 *                 RutaFoto: "/uploads/profile1.jpg"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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

/**
 * @swagger
 * /Comentarios:
 *   post:
 *     summary: Crear un nuevo comentario
 *     description: Crea un comentario para un trabajo o anuncio específico
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComentarioInput'
 *           examples:
 *             comentario_anuncio:
 *               summary: Comentario para anuncio
 *               value:
 *                 descripcion: "Me parece muy interesante este anuncio"
 *                 anuncio_id: 1
 *                 usuario_id: 5
 *                 fecha: "2024-01-20"
 *             comentario_trabajo:
 *               summary: Comentario para trabajo
 *               value:
 *                 descripcion: "Excelente trabajo, muy completo"
 *                 trabajo_id: 3
 *                 usuario_id: 2
 *     responses:
 *       200:
 *         description: Comentario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               mensaje: "Comentario creado correctamente"
 *       500:
 *         description: Error al crear el comentario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

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

/**
 * @swagger
 * /Comentarios/{id}:
 *   delete:
 *     summary: Eliminar comentario
 *     description: Elimina un comentario específico por su ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del comentario a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               mensaje: "Comentario eliminado correctamente"
 *       500:
 *         description: Error al eliminar el comentario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

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

// ============================================================================
// SECCIÓN: AULAS
// ============================================================================

/**
 * @swagger
 * /Aulas/{id}/integrantes:
 *   get:
 *     summary: Obtener integrantes del aula
 *     description: Recupera la lista de todos los usuarios que forman parte de un aula específica
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del aula
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de integrantes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *             example:
 *               - ID: 1
 *                 Primer_Nombre: "Juan"
 *                 Segundo_Nombre: "Carlos"
 *                 Primer_Apellido: "Pérez"
 *                 Segundo_Apellido: "González"
 *               - ID: 2
 *                 Primer_Nombre: "María"
 *                 Segundo_Nombre: null
 *                 Primer_Apellido: "López"
 *                 Segundo_Apellido: "Martínez"
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

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

// ============================================================================
// SECCIÓN: TRABAJOS
// ============================================================================

/**
 * @swagger
 * /Trabajos/Aula/{id}:
 *   get:
 *     summary: Obtener trabajos por aula
 *     description: Recupera todos los trabajos asignados a un aula específica
 *     tags: [Trabajos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del aula
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de trabajos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trabajo'
 *             example:
 *               - ID: 1
 *                 Titulo_Trabajo: "Ensayo sobre Literatura"
 *                 Descripcion_Trabajo: "Análisis de obras literarias del siglo XX"
 *                 Fecha_Trabajo: "2024-02-15"
 *               - ID: 2
 *                 Titulo_Trabajo: "Proyecto de Matemáticas"
 *                 Descripcion_Trabajo: "Resolución de problemas de cálculo"
 *                 Fecha_Trabajo: "2024-02-20"
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

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

/**
 * @swagger
 * /CrearTrabajo:
 *   post:
 *     summary: Crear un nuevo trabajo
 *     description: Crea un trabajo con archivos adjuntos opcionales
 *     tags: [Trabajos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - fecha
 *               - aula_id
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título del trabajo
 *                 example: "Proyecto Final de Historia"
 *               descripcion:
 *                 type: string
 *                 description: Descripción detallada del trabajo
 *                 example: "Investigación sobre la Segunda Guerra Mundial"
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de entrega del trabajo
 *                 example: "2024-03-15"
 *               aula_id:
 *                 type: integer
 *                 description: ID del aula donde se asigna
 *                 example: 1
 *               archivos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Archivos adjuntos al trabajo
 *     responses:
 *       200:
 *         description: Trabajo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             examples:
 *               con_archivos:
 *                 summary: Trabajo con archivos
 *                 value:
 *                   mensaje: "Trabajo y archivos guardados"
 *               sin_archivos:
 *                 summary: Trabajo sin archivos
 *                 value:
 *                   mensaje: "Trabajo guardado sin archivos"
 *       500:
 *         description: Error al guardar el trabajo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

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

/**
 * @swagger
 * /Trabajo/{id}:
 *   get:
 *     summary: Obtener datos de un trabajo
 *     description: Recupera la información completa de un trabajo específico, incluyendo sus archivos adjuntos
 *     tags: [Trabajos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del trabajo
 *         example: 1
 *     responses:
 *       200:
 *         description: Datos del trabajo obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trabajo:
 *                   $ref: '#/components/schemas/Trabajo'
 *                 archivos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TrabajoArchivo'
 *             example:
 *               trabajo:
 *                 ID: 1
 *                 Titulo_Trabajo: "Proyecto Final de Historia"
 *                 Descripcion_Trabajo: "Investigación sobre la Segunda Guerra Mundial"
 *                 Fecha_Trabajo: "2024-03-15"
 *                 aula_id: 1
 *               archivos:
 *                 - ID: 1
 *                   trabajo_id: 1
 *                   ruta_archivo: "documento1.pdf"
 *                   nombre_original: "Investigación_WWII.pdf"
 *       404:
 *         description: Trabajo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error al obtener archivos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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

/**
 * @swagger
 * /ActualizarTrabajo:
 *   post:
 *     summary: Actualizar trabajo existente
 *     description: Actualiza los datos de un trabajo existente, permite eliminar archivos antiguos y agregar nuevos
 *     tags: [Trabajos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - trabajo_id
 *               - titulo
 *               - descripcion
 *               - fecha
 *               - aula_id
 *             properties:
 *               trabajo_id:
 *                 type: integer
 *                 description: ID del trabajo a actualizar
 *                 example: 1
 *               titulo:
 *                 type: string
 *                 description: Nuevo título del trabajo
 *                 example: "Proyecto Final de Historia - Actualizado"
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción del trabajo
 *                 example: "Investigación completa sobre la Segunda Guerra Mundial con análisis adicional"
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Nueva fecha de entrega
 *                 example: "2024-03-20"
 *               aula_id:
 *                 type: integer
 *                 description: ID del aula
 *                 example: 1
 *               eliminar_archivos:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: IDs de archivos a eliminar
 *                 example: [1, 3]
 *               archivos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Nuevos archivos a agregar
 *     responses:
 *       200:
 *         description: Trabajo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               mensaje: "Trabajo actualizado correctamente"
 *       500:
 *         description: Error al actualizar el trabajo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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

/**
 * @swagger
 * /Trabajo/{id}:
 *   delete:
 *     summary: Eliminar trabajo
 *     description: Elimina un trabajo específico junto con todos sus archivos asociados
 *     tags: [Trabajos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del trabajo a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Trabajo eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               mensaje: "Trabajo eliminado correctamente"
 *       500:
 *         description: Error al eliminar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               error_archivos:
 *                 summary: Error al eliminar archivos
 *                 value:
 *                   error: "Error al eliminar archivos"
 *               error_trabajo:
 *                 summary: Error al eliminar trabajo
 *                 value:
 *                   error: "Error al eliminar el trabajo"
 */

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

// ============================================================================
// SECCIÓN: COMENTARIOS DE TRABAJOS
// ============================================================================

/**
 * @swagger
 * /Comentarios/Trabajo/{trabajo_id}:
 *   get:
 *     summary: Obtener comentarios por trabajo
 *     description: Recupera todos los comentarios asociados a un trabajo específico, incluyendo información del usuario que los creó
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: trabajo_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del trabajo
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *             example:
 *               - ID: 1
 *                 Descripcion: "Excelente trabajo, muy completo"
 *                 Fecha: "2024-01-15"
 *                 Nombre_Usuario: "Juan Pérez"
 *                 RutaFoto: "/uploads/profile1.jpg"
 *               - ID: 2
 *                 Descripcion: "Necesita mejorar algunos aspectos"
 *                 Fecha: "2024-01-16"
 *                 Nombre_Usuario: "María González"
 *                 RutaFoto: "/uploads/profile2.jpg"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Error al obtener comentarios"
 */

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

// ============================================================================
// SECCIÓN: TRABAJOS ENTREGADOS
// ============================================================================

/**
 * @swagger
 * components:
 *   schemas:
 *     TrabajoEntregado:
 *       type: object
 *       properties:
 *         trabajo_entregado_id:
 *           type: integer
 *           description: ID único del trabajo entregado
 *         Fecha_Trabajo:
 *           type: string
 *           format: date
 *           description: Fecha de entrega del trabajo
 *         Nota:
 *           type: number
 *           nullable: true
 *           description: Calificación asignada al trabajo
 *         usuario_id:
 *           type: integer
 *           description: ID del usuario que entregó el trabajo
 *         nombre_completo:
 *           type: string
 *           description: Nombre completo del estudiante
 * 
 *     TrabajoEntregadoArchivo:
 *       type: object
 *       properties:
 *         ruta_archivo:
 *           type: string
 *           description: Ruta donde está almacenado el archivo entregado
 *         nombre_original:
 *           type: string
 *           description: Nombre original del archivo entregado
 * 
 *     TablaNotas:
 *       type: object
 *       properties:
 *         trabajos:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de títulos de trabajos
 *         tabla_notas:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre completo del estudiante
 *               notas:
 *                 type: object
 *                 additionalProperties:
 *                   oneOf:
 *                     - type: number
 *                     - type: string
 *                       enum: ["sin nota"]
 *                 description: Objeto con las notas por trabajo
 */

/**
 * @swagger
 * /Trabajos/{id}/Entregados:
 *   get:
 *     summary: Obtener estudiantes que entregaron un trabajo
 *     description: Recupera la lista de estudiantes que han entregado un trabajo específico con sus datos y calificaciones
 *     tags: [Trabajos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del trabajo
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de entregas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrabajoEntregado'
 *             example:
 *               - trabajo_entregado_id: 1
 *                 Fecha_Trabajo: "2024-03-15"
 *                 Nota: 85
 *                 usuario_id: 5
 *                 nombre_completo: "Juan Carlos Pérez González"
 *               - trabajo_entregado_id: 2
 *                 Fecha_Trabajo: "2024-03-16"
 *                 Nota: null
 *                 usuario_id: 8
 *                 nombre_completo: "María José López Martínez"
 *       500:
 *         description: Error al consultar las entregas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               mensaje: "Error al consultar las entregas"
 */

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

/**
 * @swagger
 * /Trabajos/Entregado/{id}/Nota:
 *   put:
 *     summary: Asignar nota a trabajo entregado
 *     description: Actualiza la calificación de un trabajo entregado específico
 *     tags: [Trabajos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del trabajo entregado
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nota
 *             properties:
 *               nota:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *                 description: Calificación del trabajo (0-100)
 *                 example: 85
 *     responses:
 *       200:
 *         description: Nota asignada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               mensaje: "Nota asignada correctamente"
 *       500:
 *         description: Error al actualizar la nota
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               mensaje: "Error al actualizar nota"
 */

router.put("/Trabajos/Entregado/:id/Nota", (req, res) => {
    const id = req.params.id;
    const { nota } = req.body;
    const sql = `UPDATE TrabajoEntregado SET Nota = ? WHERE ID = ?`;

    conexion.query(sql, [nota, id], (error) => {
        if (error) return res.status(500).json({ mensaje: "Error al actualizar nota" });
        res.json({ mensaje: "Nota asignada correctamente" });
    });
});

/**
 * @swagger
 * /TrabajoEntregado/{id}/Archivos:
 *   get:
 *     summary: Obtener archivos de trabajo entregado
 *     description: Recupera la lista de archivos adjuntos de un trabajo entregado específico
 *     tags: [Trabajos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del trabajo entregado
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de archivos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrabajoEntregadoArchivo'
 *             example:
 *               - ruta_archivo: "entregas/archivo1_12345.pdf"
 *                 nombre_original: "Ensayo_Historia.pdf"
 *               - ruta_archivo: "entregas/imagen1_67890.jpg"
 *                 nombre_original: "grafico_poblacion.jpg"
 *       500:
 *         description: Error al consultar los archivos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               mensaje: "Error al consultar los archivos"
 */

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

// ============================================================================
// SECCIÓN: NOTAS Y CALIFICACIONES
// ============================================================================

/**
 * @swagger
 * /Aulas/{id}/Notas:
 *   get:
 *     summary: Obtener tabla de notas del aula
 *     description: Recupera una tabla completa con las notas de todos los estudiantes del aula para todos los trabajos asignados
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del aula
 *         example: 1
 *     responses:
 *       200:
 *         description: Tabla de notas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TablaNotas'
 *             example:
 *               trabajos:
 *                 - "Ensayo sobre Literatura"
 *                 - "Proyecto de Matemáticas"
 *                 - "Investigación de Historia"
 *               tabla_notas:
 *                 - nombre: "Juan Carlos Pérez González"
 *                   notas:
 *                     "Ensayo sobre Literatura": 85
 *                     "Proyecto de Matemáticas": 90
 *                     "Investigación de Historia": "sin nota"
 *                 - nombre: "María José López Martínez"
 *                   notas:
 *                     "Ensayo sobre Literatura": 92
 *                     "Proyecto de Matemáticas": "sin nota"
 *                     "Investigación de Historia": 88
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               mensaje: "Error en la base de datos"
 */

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


// ACA VAMOS 
//---------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------
//Alumno y Profesor --------------------------------------------------------------------- Alumno y Profesor


/**
 * @swagger
 * /Noticias:
 *   get:
 *     summary: Obtener todas las noticias
 *     description: Recupera una lista de todas las noticias del sistema con su tipo correspondiente
 *     tags:
 *       - Noticias
 *     responses:
 *       200:
 *         description: Lista de noticias obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                     example: 1
 *                   Titulo_Noticia:
 *                     type: string
 *                     example: "Inicio del nuevo semestre académico"
 *                   Tipo:
 *                     type: string
 *                     example: "Noticia Principal 1"
 *       500:
 *         description: Error en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /Noticias/{id}:
 *   delete:
 *     summary: Eliminar una noticia
 *     description: Elimina una noticia específica del sistema mediante su ID
 *     tags:
 *       - Noticias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la noticia a eliminar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Noticia eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 *       500:
 *         description: Error al eliminar la noticia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 */
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

/**
 * @swagger
 * /Noticias:
 *   post:
 *     summary: Crear una nueva noticia
 *     description: Crea una nueva noticia en el sistema con imágenes opcionales. Solo se permite una noticia por tipo.
 *     tags:
 *       - Noticias
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - encabezado
 *               - descripcion1
 *               - fecha
 *               - tipo_noticia_id
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título de la noticia
 *                 example: "Inicio del nuevo semestre académico"
 *               encabezado:
 *                 type: string
 *                 description: Encabezado de la noticia
 *                 example: "El próximo lunes inician las clases"
 *               descripcion1:
 *                 type: string
 *                 description: Descripción principal de la noticia
 *                 example: "Los estudiantes deberán presentarse en sus respectivas aulas..."
 *               descripcion2:
 *                 type: string
 *                 description: Segunda descripción (opcional)
 *                 example: "Información adicional sobre horarios"
 *               descripcion3:
 *                 type: string
 *                 description: Tercera descripción (opcional)
 *                 example: "Información complementaria"
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la noticia
 *                 example: "2024-01-15"
 *               tipo_noticia_id:
 *                 type: integer
 *                 description: ID del tipo de noticia
 *                 example: 1
 *               imagen1:
 *                 type: string
 *                 format: binary
 *                 description: Primera imagen de la noticia
 *               imagen2:
 *                 type: string
 *                 format: binary
 *                 description: Segunda imagen de la noticia
 *               imagen3:
 *                 type: string
 *                 format: binary
 *                 description: Tercera imagen de la noticia
 *     responses:
 *       200:
 *         description: Noticia creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 *       400:
 *         description: Ya existe una noticia con este tipo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al crear la noticia o validar tipo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /TiposNoticia:
 *   get:
 *     summary: Obtener tipos de noticia
 *     description: Recupera todos los tipos de noticia disponibles en el sistema
 *     tags:
 *       - Tipos de Noticia
 *     responses:
 *       200:
 *         description: Lista de tipos de noticia obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoNoticia'
 *       500:
 *         description: Error al obtener tipos de noticia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /Noticias/{id}:
 *   put:
 *     summary: Actualizar una noticia
 *     description: Actualiza una noticia existente con nuevos datos e imágenes opcionales. Valida que no haya duplicados de tipo.
 *     tags:
 *       - Noticias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la noticia a actualizar
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - encabezado
 *               - descripcion1
 *               - fecha
 *               - tipo_noticia_id
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título actualizado de la noticia
 *                 example: "Inicio del nuevo semestre académico - Actualizado"
 *               encabezado:
 *                 type: string
 *                 description: Encabezado actualizado
 *                 example: "El próximo lunes inician las clases - Nueva información"
 *               descripcion1:
 *                 type: string
 *                 description: Descripción principal actualizada
 *                 example: "Los estudiantes deberán presentarse..."
 *               descripcion2:
 *                 type: string
 *                 description: Segunda descripción actualizada (opcional)
 *                 example: "Información adicional actualizada"
 *               descripcion3:
 *                 type: string
 *                 description: Tercera descripción actualizada (opcional)
 *                 example: "Información complementaria actualizada"
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha actualizada de la noticia
 *                 example: "2024-01-20"
 *               tipo_noticia_id:
 *                 type: integer
 *                 description: ID del tipo de noticia actualizado
 *                 example: 2
 *               imagen1:
 *                 type: string
 *                 format: binary
 *                 description: Nueva primera imagen (opcional)
 *               imagen2:
 *                 type: string
 *                 format: binary
 *                 description: Nueva segunda imagen (opcional)
 *               imagen3:
 *                 type: string
 *                 format: binary
 *                 description: Nueva tercera imagen (opcional)
 *     responses:
 *       200:
 *         description: Noticia actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 *       400:
 *         description: Otra noticia ya tiene este tipo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al actualizar la noticia o validar tipo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /Noticias/{id}:
 *   get:
 *     summary: Obtener una noticia por ID
 *     description: Recupera los detalles completos de una noticia específica mediante su ID
 *     tags:
 *       - Noticias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la noticia
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Noticia encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Noticia'
 *       404:
 *         description: Noticia no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al obtener la noticia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /NoticiasPrincipales:
 *   get:
 *     summary: Obtener noticias principales para vista de Alumno y Profesor
 *     description: Recupera las tres noticias principales organizadas por tipo para mostrar en la interfaz de alumnos y profesores
 *     tags:
 *       - Noticias Principales
 *     responses:
 *       200:
 *         description: Noticias principales obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 noticia1:
 *                   type: object
 *                   nullable: true
 *                   description: Noticia Principal 1
 *                   properties:
 *                     ID:
 *                       type: integer
 *                       example: 1
 *                     Titulo_Noticia:
 *                       type: string
 *                       example: "Inicio del nuevo semestre"
 *                     Encabezado:
 *                       type: string
 *                       example: "Información importante para estudiantes"
 *                     Imagen1:
 *                       type: string
 *                       example: "noticia1.jpg"
 *                     Tipo:
 *                       type: string
 *                       example: "Noticia Principal 1"
 *                 noticia2:
 *                   type: object
 *                   nullable: true
 *                   description: Noticia Principal 2
 *                   properties:
 *                     ID:
 *                       type: integer
 *                       example: 2
 *                     Titulo_Noticia:
 *                       type: string
 *                       example: "Eventos académicos"
 *                     Encabezado:
 *                       type: string
 *                       example: "Próximos eventos del mes"
 *                     Imagen1:
 *                       type: string
 *                       example: "noticia2.jpg"
 *                     Tipo:
 *                       type: string
 *                       example: "Noticia Principal 2"
 *                 noticia3:
 *                   type: object
 *                   nullable: true
 *                   description: Noticia Principal 3
 *                   properties:
 *                     ID:
 *                       type: integer
 *                       example: 3
 *                     Titulo_Noticia:
 *                       type: string
 *                       example: "Anuncios importantes"
 *                     Encabezado:
 *                       type: string
 *                       example: "Comunicados oficiales"
 *                     Imagen1:
 *                       type: string
 *                       example: "noticia3.jpg"
 *                     Tipo:
 *                       type: string
 *                       example: "Noticia Principal 3"
 *       500:
 *         description: Error al obtener noticias principales
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Llamar Noticias A vista Alumno y profesor
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


//---------------------------------------------------------------------------------------------------------

// aca vamos










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
