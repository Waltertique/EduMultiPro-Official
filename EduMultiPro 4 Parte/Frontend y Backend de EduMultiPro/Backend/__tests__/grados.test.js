const request = require("supertest"); 
const app = require("../index");
const conexion = require("../db/conexion");

describe("Pruebas de integración - Grados", () => {

    afterAll(() => {
        conexion.end();
    });

    // Obtener todos los grados
    test("GET /Grados debe devolver lista de grados", async () => {
        const res = await request(app)
            .get("/api/edumultipro/Grados")
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
    });

    // Crear Grado
    test("POST /Grados debe crear un grado", async () => {
        const nuevoGrado = {
            Grado_Nombre: "Grado Test",
            Descripcion_Grado: "Descripción de prueba"
        };

        const res = await request(app)
            .post("/api/edumultipro/Grados")
            .send(nuevoGrado)
            .expect(201);

        expect(res.body.mensaje).toBe("Grado creada correctamente");
        expect(res.body.insertId).toBeDefined();
    });

    // Modificar Grado
    test("PUT /Grados/:id debe actualizar un grado", async () => {

        // Crear grado temporal
        const insert = await request(app)
            .post("/api/edumultipro/Grados")
            .send({
                Grado_Nombre: "Grado Original",
                Descripcion_Grado: "Desc original"
            })
            .expect(201);

        const id = insert.body.insertId;

        // Actualizar
        const res = await request(app)
            .put(`/api/edumultipro/Grados/${id}`)
            .send({
                Grado_Nombre: "Grado Modificado",
                Descripcion_Grado: "Descripción modificada"
            })
            .expect(200);

        expect(res.body.mensaje).toBe("Grado actualizado correctamente");
    });

    // Eliminar Grado
    test("DELETE /Grados/:id debe eliminar un grado", async () => {

        // Crear grado temporal
        const insert = await request(app)
            .post("/api/edumultipro/Grados")
            .send({
                Grado_Nombre: "Grado Eliminar",
                Descripcion_Grado: "Temporal"
            })
            .expect(201);

        const gradoId = insert.body.insertId;

        expect(gradoId).toBeDefined();

        // Eliminar
        const res = await request(app)
            .delete(`/api/edumultipro/Grados/${gradoId}`)
            .expect(200);

        expect(res.body.mensaje).toBe("Grado eliminado exitosamente");
    });

});