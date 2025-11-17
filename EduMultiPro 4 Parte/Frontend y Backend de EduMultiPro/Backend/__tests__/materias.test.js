const request = require("supertest");
const app = require("../index"); 
const conexion = require("../db/conexion");

describe("Pruebas de integración - Materias", () => {

    afterAll(() => {
        conexion.end();
    });

    test("GET /Materias debe devolver lista de materias", async () => {
        const res = await request(app)
            .get("/api/edumultipro/Materias")
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /Materias debe crear una materia", async () => {
        const nuevaMateria = {
            Materia_Nombre: "Materia Test",
            Descripcion_Materia: "Descripción de prueba"
        };

        const res = await request(app)
            .post("/api/edumultipro/Materias")
            .send(nuevaMateria)
            .expect(201);

        expect(res.body.mensaje).toBe("Materia creada correctamente");
        expect(res.body.insertId).toBeDefined();
    });

    test("PUT /Materias/:id debe actualizar una materia", async () => {

        // Crear materia temporal
        const insert = await request(app)
            .post("/api/edumultipro/Materias")
            .send({
                Materia_Nombre: "Materia Original",
                Descripcion_Materia: "Desc original"
            });

        const id = insert.body.insertId;

        // Actualizar
        const res = await request(app)
            .put(`/api/edumultipro/Materias/${id}`)
            .send({
                Materia_Nombre: "Materia Modificada",
                Descripcion_Materia: "Descripcion modificada"
            })
            .expect(200);

        expect(res.body.mensaje).toBe("Materia actualizada correctamente");
    });

    test("DELETE /Materias/:id debe eliminar una materia", async () => {

        // Crear materia temporal
        const insert = await request(app)
            .post("/api/edumultipro/Materias")
            .send({
                Materia_Nombre: "Materia Eliminar",
                Descripcion_Materia: "Temporal"
            });

        const materiaId = insert.body.insertId;

        expect(materiaId).toBeDefined();

        // Eliminar
        const res = await request(app)
            .delete(`/api/edumultipro/Materias/${materiaId}`)
            .expect(200);

        expect(res.body.mensaje).toBe("Materias eliminado exitosamente");
    });

});
