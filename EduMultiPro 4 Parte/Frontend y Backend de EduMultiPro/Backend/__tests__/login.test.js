const request = require("supertest");
const app = require("../index");

describe("Pruebas de integración - Login usando usuario existente", () => {

    const usuarioExistente = {
        correo: "maradona@gmail.com",    
        contrasena: "12345"         
    };

    let tokenGlobal = "";

    // 1. LOGIN EXITOSO
    test("POST /login debe autenticar usuario existente", async () => {
        const res = await request(app)
            .post("/api/edumultipro/login")
            .send(usuarioExistente)
            .expect(200);

        expect(res.body.mensaje).toBe("Login exitoso");
        expect(res.body.token).toBeDefined();
        expect(res.body.usuario).toBeDefined();
        
        tokenGlobal = res.body.token;
    });

    // 2. CORREO INEXISTENTE
    test("POST /login debe fallar con correo no registrado", async () => {
        const res = await request(app)
            .post("/api/edumultipro/login")
            .send({ correo: "noexiste@gmail.com", contrasena: "12345" })
            .expect(401);

        expect(res.body.mensaje).toBe("Correo no registrado");
    });

    // 3. CONTRASEÑA INCORRECTA
    test("POST /login debe fallar con contraseña incorrecta", async () => {
        const res = await request(app)
            .post("/api/edumultipro/login")
            .send({ correo: usuarioExistente.correo, contrasena: "incorrecta" })
            .expect(401);

        expect(res.body.mensaje).toBe("Contraseña incorrecta");
    });

    // 4. ACCESO A PERFIL CON TOKEN
    test("GET /perfil debe permitir acceso con token válido", async () => {
        const res = await request(app)
            .get("/api/edumultipro/perfil")
            .set("Authorization", `Bearer ${tokenGlobal}`)
            .expect(200);

        expect(res.body.mensaje).toBe("Acceso a perfil autorizado");
        expect(res.body.usuario).toBeDefined();
    });

});