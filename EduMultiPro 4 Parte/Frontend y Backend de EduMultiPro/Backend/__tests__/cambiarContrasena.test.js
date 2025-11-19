const request = require("supertest");
const app = require("../index");

const usuarioExistente = {
    id: "1", 
    correo1: "juan01@gmail.com" 
};

describe("Pruebas de integración - Cambiar Contraseña", () => {

    test("PUT /cambiar-contrasena debe cambiar la contraseña correctamente", async () => {

        const res = await request(app)
            .put("/api/edumultipro/cambiar-contrasena")
            .send({
                id: usuarioExistente.id,
                correo1: usuarioExistente.correo1,
                nuevaContraseña: "clave123",
                confirmarContraseña: "clave123"
            });

        expect(res.status).toBe(200);
        expect(res.body.mensaje).toBe("✅ Contraseña actualizada correctamente");
    });

    test("PUT /cambiar-contrasena debe fallar si las contraseñas no coinciden", async () => {

        const res = await request(app)
            .put("/api/edumultipro/cambiar-contrasena")
            .send({
                id: usuarioExistente.id,
                correo1: usuarioExistente.correo1,
                nuevaContraseña: "12345",
                confirmarContraseña: "11111"
            });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Las contraseñas no coinciden.");
    });

    test("PUT /cambiar-contrasena debe fallar si el usuario no existe", async () => {

        const res = await request(app)
            .put("/api/edumultipro/cambiar-contrasena")
            .send({
                id: "NO_EXISTE",
                correo1: "correo@falso.com",
                nuevaContraseña: "123",
                confirmarContraseña: "123"
            });

        expect(res.status).toBe(404);
        expect(res.body.error).toBe("Usuario no encontrado.");
    });
});
