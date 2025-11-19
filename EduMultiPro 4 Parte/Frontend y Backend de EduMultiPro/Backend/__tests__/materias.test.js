const request = require("supertest"); //librería que permite hacer peticiones HTTP a tu servidor en los tests
const app = require("../index"); 
const conexion = require("../db/conexion");

describe("Pruebas de integración - Materias", () => { //agrupa un conjunto de tests relacionados

    afterAll(() => { //es una función de Jest que se ejecuta una vez después de todos los tests dentro del describe
        conexion.end();
    });

    test("GET /Materias debe devolver lista de materias", async () => { //define una prueba. El nombre describe lo que se espera.
        const res = await request(app)
            .get("/api/edumultipro/Materias") //Hace una petición GET a la ruta /api/edumultipro/Materias
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true); //la API devuelve una lista de materias.
    });

    // Crear Materia
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

    // Modificar Materia
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
    
    // Eliminar Materia
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
