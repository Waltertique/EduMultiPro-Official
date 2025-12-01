const request = require("supertest");
const app = require("../index");
const conexion = require("../db/conexion");

describe("Pruebas de integración - Horarios", () => {

  let profesorIdLibre = null; // profesor sin horario
  let profesorIdOtroLibre = null; // para eliminar
  let profesorIdEliminarLibre = null;

  beforeAll(async () => {

    // Obtener profesores
    const resProfesores = await request(app)
      .get("/api/edumultipro/Profesores")
      .expect(200);

    if (!Array.isArray(resProfesores.body) || resProfesores.body.length === 0) {
      throw new Error("No existen profesores (rol R002). Crea uno antes de probar.");
    }

    // Escoger 2 profesores que NO tengan horario
    for (const p of resProfesores.body) {
    const h = await request(app).get(`/api/edumultipro/Horarios?profesor=${p.ID}`);
    const tiene = h.body.some(x => x.profesor_id === p.ID);

    if (!tiene) {
        if (!profesorIdLibre) profesorIdLibre = p.ID;
        else if (!profesorIdOtroLibre) profesorIdOtroLibre = p.ID;
        else if (!profesorIdEliminarLibre) profesorIdEliminarLibre = p.ID;
    }
    }

    if (!profesorIdLibre || !profesorIdOtroLibre || !profesorIdEliminarLibre) {
    throw new Error("Debes tener al menos 3 profesores sin horarios para las pruebas.");
    }
  });

  afterAll(() => {
    conexion.end();
  });

  // GET
  test("GET /Horarios debe devolver lista de horarios", async () => {
    const res = await request(app)
      .get("/api/edumultipro/Horarios")
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  // POST crear horario
  test("POST /Horarios debe crear un horario para profesor", async () => {
    const res = await request(app)
      .post("/api/edumultipro/Horarios")
      .field("titulo", "Horario Test")
      .field("descripcion", "Prueba de creacion")
      .field("profesor_id", profesorIdLibre)
      .expect(200);

    expect(res.body.mensaje).toBe("Horario creado exitosamente");
    expect(res.body.insertId).toBeDefined();
  });

  // PUT actualizar horario
  test("PUT /Horarios/:id debe actualizar un horario", async () => {

    // Crear horario temporal con profesor sin horario
    const insert = await request(app)
      .post("/api/edumultipro/Horarios")
      .field("titulo", "Horario Editable")
      .field("descripcion", "Original")
      .field("profesor_id", profesorIdOtroLibre)
      .expect(200);

    const id = insert.body.insertId;

    // Actualizar SOLO título y descripción (el profesor sigue igual)
    const update = await request(app)
      .put(`/api/edumultipro/Horarios/${id}`)
      .field("titulo", "Horario Editado desde Test")
      .field("descripcion", "Descripcion modificada")
      .field("profesor_id", profesorIdOtroLibre)
      .expect(200);

    expect(update.body.mensaje).toBe("Horario actualizado correctamente");
  });

  // DELETE horario
  test("DELETE /Horarios/:id debe eliminar un horario", async () => {

    // Crear horario temporal
    const insert = await request(app)
      .post("/api/edumultipro/Horarios")
      .field("titulo", "Horario Eliminar Test")
      .field("descripcion", "Eliminar ahora")
      .field("profesor_id", profesorIdEliminarLibre)
      .expect(200);

    const id = insert.body.insertId;

    const res = await request(app)
      .delete(`/api/edumultipro/Horarios/${id}`)
      .expect(200);

    expect(res.body.mensaje).toBe("Horario eliminado exitosamente");
  });

});
