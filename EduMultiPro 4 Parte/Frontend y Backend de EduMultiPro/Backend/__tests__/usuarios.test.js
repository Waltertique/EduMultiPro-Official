const request = require("supertest");
const app = require("../index");
const conexion = require("../db/conexion");

describe("Pruebas de integracion - Usuarios", () => {
    let documentoId = null;
    let rolId = null;

    beforeAll(async () => {

        // buscar los documentos existentes
        const resDocumento = await request(app)
            .get("/api/edumultipro/documentos")
            .expect(200);
        
        if (!Array.isArray(resDocumento.body) || resDocumento.body.length === 0) {
            throw new Error("No existen documentos en la base de datos. Crea al menos uno antes de ejecutar los tests.");
        }
        documentoId = resDocumento.body[0].ID;

        // buscar los roles existentes
        const resRol = await request(app)
            .get("/api/edumultipro/roles")
            .expect(200);
        
        if (!Array.isArray(resRol.body) || resRol.body.length === 0) {
            throw new Error("No existen roles en la base de datos. Crea al menos uno antes de ejecutar los tests.");
        }
        rolId = resRol.body[0].ID;
    })
    afterAll(() => {
        // Cerrar conexión al terminar todos los tests
        conexion.end();
    });

    // obtener usuarios
    test("GET /Usuarios debe devolver lista de cursos", async () => {
        const res = await request(app)
        .get("/api/edumultipro/Usuarios")
        .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
    });

    // crear Usuarios
    test("POST /Usuarios debe crear un usuario", async () => {
        const nuevoUsuario = {
            id: Math.floor(Math.random() * 999999),
            primer_nombre: "usuarioTest",
            segundo_nombre: "segundoNombre",
            primer_apellido: "apellidoTest",
            segundo_apellido: "apellido2Test",
            correo1: "correo1test@gmail.com",
            contrasena: "12345",
            correo2: "correo2test@gmail.com",
            contacto1: "321654987",
            contacto2: "987654321",
            fecha_nacimiento: "2000-01-01",
            rol_id: rolId,
            documento_id: documentoId
        };

        const res = await request(app)
            .post("/api/edumultipro/crearUsuario")
            .send(nuevoUsuario)
            .expect(200); 

        expect(res.body.mensaje).toBe("✅ Usuario creado correctamente");
        expect(res.body.id || res.body.insertId).toBeDefined();
    });

    // Actualizar usuario
    test("POST /actualizarUsuario debe actualizar un usuario", async () => {
    
        // Primero creamos un usuario temporal
        const usuarioTemp = {
            id: Math.floor(Math.random() * 999999),
            primer_nombre: "Actualizar",
            segundo_nombre: "Test",
            primer_apellido: "Usuario",
            segundo_apellido: "Temp",
            correo1: "update@gmail.com",
            correo2: "otro@gmail.com",
            contrasena: "12345",
            contacto1: "111111111",
            contacto2: "222222222",
            fecha_nacimiento: "2001-01-01",
            rol_id: rolId,
            documento_id: documentoId
        };

        await request(app)
            .post("/api/edumultipro/crearUsuario")
            .field(usuarioTemp)
            .expect(200);

        const usuarioActualizado = {
            usuario_id: usuarioTemp.id,
            Primer_Nombre: "NombreActualizado",
            Contacto1: "999999999"
        };

        const res = await request(app)
            .post("/api/edumultipro/actualizarUsuario")
            .field(usuarioActualizado)
            .expect(200);

        expect(res.body.mensaje).toBe("✅ Usuario actualizado correctamente");
    });

    // Eliminar usuario
    test("DELETE /usuarios/:id debe eliminar usuario", async () => {

        // Primero creamos uno temporal
        const usuarioTemp = {
            id: Math.floor(Math.random() * 999999),
            primer_nombre: "Eliminar",
            primer_apellido: "Prueba",
            correo1: "delete@gmail.com",
            contrasena: "12345",
            contacto1: "111111111",
            fecha_nacimiento: "2001-01-01",
            rol_id: rolId,
            documento_id: documentoId
        };

        const crear = await request(app)
            .post("/api/edumultipro/crearUsuario")
            .field(usuarioTemp)
            .expect(200);

        const idCreado = usuarioTemp.id;

        const res = await request(app)
            .delete(`/api/edumultipro/usuarios/${idCreado}`)
            .expect(200);

        expect(res.body.mensaje).toBe("Usuario eliminado exitosamente");
    });

});