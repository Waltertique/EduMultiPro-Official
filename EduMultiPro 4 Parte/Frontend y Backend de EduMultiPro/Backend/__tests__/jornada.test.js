const request = require("supertest");
const app = require("../index");
const conexion = require("../db/conexion");

describe("Pruebas de integración - Jornadas", () => {

    afterAll(() => {
        conexion.end();
    });

    // Obtener todas las jornadas
    test("GET /Jornadas debe devolver lista de jornadas", async () => {
        const res = await request(app)
            .get("/api/edumultipro/Jornadas")
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
    });

    // Crear Jornada
    test("POST /Jornadas debe crear una jornada", async () => {
        const nuevaJornada = {
            Jornada_Nombre: "Jornada Test",
            Descripcion_Jornada: "Descripción de prueba"
        };

        const res = await request(app)
            .post("/api/edumultipro/Jornadas")
            .send(nuevaJornada)
            .expect(201);

        expect(res.body.mensaje).toBe("Jornada creada correctamente");
        expect(res.body.insertId).toBeDefined();
    });

    // Modificar Jornada
    test("PUT /Jornadas/:id debe actualizar una jornada", async () => {

        // Crear jornada temporal
        const insert = await request(app)
            .post("/api/edumultipro/Jornadas")
            .send({
                Jornada_Nombre: "Jornada Original",
                Descripcion_Jornada: "Desc original"
            })
            .expect(201);

        const id = insert.body.insertId;

        // Actualizar jornada
        const res = await request(app)
            .put(`/api/edumultipro/Jornadas/${id}`)
            .send({
                Jornada_Nombre: "Jornada Modificada",
                Descripcion_Jornada: "Descripción modificada"
            })
            .expect(200);

        expect(res.body.mensaje).toBe("jornada actualizado correctamente");
    });

    // Eliminar Jornada
    test("DELETE /Jornadas/:id debe eliminar una jornada", async () => {

        // Crear jornada temporal
        const insert = await request(app)
            .post("/api/edumultipro/Jornadas")
            .send({
                Jornada_Nombre: "Jornada Eliminar",
                Descripcion_Jornada: "Temporal"
            })
            .expect(201);

        const jornadaId = insert.body.insertId;

        expect(jornadaId).toBeDefined();

        // Eliminar jornada
        const res = await request(app)
            .delete(`/api/edumultipro/Jornadas/${jornadaId}`)
            .expect(200);

        expect(res.body.mensaje).toBe("Jornada eliminado exitosamente");
    });

});