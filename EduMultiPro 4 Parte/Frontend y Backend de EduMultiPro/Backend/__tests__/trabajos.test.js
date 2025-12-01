const request = require("supertest");
const app = require("../index");
const conexion = require("../db/conexion");

describe("Pruebas de integración - Trabajos", () => {
  let aulaId = null;
  let trabajoId = null;

  // Antes de los tests: obtener un aula válida
  beforeAll(async () => {
    const resAulas = await request(app)
      .get("/api/edumultipro/Aulas")
      .expect(200);

    if (!Array.isArray(resAulas.body) || resAulas.body.length === 0) {
      throw new Error("No existen aulas en la base de datos. Crea al menos una antes de ejecutar los tests.");
    }

    aulaId = resAulas.body[0].ID;
  });

  afterAll(() => {
    conexion.end(); // cerrar conexión
  });

  // GET: Obtener trabajos por aula
  test("GET /Trabajos/Aula/:id debe devolver lista de trabajos", async () => {
    const res = await request(app)
      .get(`/api/edumultipro/Trabajos/Aula/${aulaId}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  // POST: Crear trabajo
  test("POST /CrearTrabajo debe crear un trabajo sin archivos", async () => {
    const nuevoTrabajo = {
      titulo: "Trabajo Test",
      descripcion: "Descripción Test",
      fecha: "2025-01-01",
      aula_id: aulaId
    };

    const res = await request(app)
      .post("/api/edumultipro/CrearTrabajo")
      .field("titulo", nuevoTrabajo.titulo)
      .field("descripcion", nuevoTrabajo.descripcion)
      .field("fecha", nuevoTrabajo.fecha)
      .field("aula_id", nuevoTrabajo.aula_id)
      .expect(200);

    expect(res.body.mensaje).toBe("Trabajo guardado sin archivos");

    // Guardar el ID para los otros tests
    trabajoId = res.body.insertId || res.body.id;

    expect(trabajoId).toBeDefined();
  });

  // POST: Actualizar trabajo
  test("POST /ActualizarTrabajo debe actualizar un trabajo sin archivos nuevos", async () => {
    const res = await request(app)
      .post("/api/edumultipro/ActualizarTrabajo")
      .field("trabajo_id", trabajoId)
      .field("titulo", "Trabajo Modificado")
      .field("descripcion", "Descripción Modificada")
      .field("fecha", "2025-02-01")
      .field("aula_id", aulaId)
      .expect(200);

    expect(res.body.mensaje).toBe("Trabajo actualizado correctamente");
  });

  // DELETE: Eliminar trabajo
  test("DELETE /Trabajo/:id debe eliminar un trabajo", async () => {
    const res = await request(app)
      .delete(`/api/edumultipro/Trabajo/${trabajoId}`)
      .expect(200);

    expect(res.body.mensaje).toBe("Trabajo eliminado correctamente");
  });

});