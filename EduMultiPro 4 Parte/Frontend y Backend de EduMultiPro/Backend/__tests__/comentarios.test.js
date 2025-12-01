const request = require("supertest");
const app = require("../index");
const conexion = require("../db/conexion");

describe("Pruebas de integración - Comentarios", () => {
  let usuarioId = null;
  let anuncioId = null;
  let trabajoId = null;
  let comentarioId = null;

  beforeAll(async () => {
    // Obtener usuarios
    const resUsuarios = await request(app)
      .get("/api/edumultipro/Usuarios")
      .expect(200);

    if (!Array.isArray(resUsuarios.body) || resUsuarios.body.length === 0) {
      throw new Error("No existen usuarios en la base de datos.");
    }
    usuarioId = resUsuarios.body[0].ID;

    // Obtener aulas (necesarias para trabajos y anuncios)
    const resAulas = await request(app)
      .get("/api/edumultipro/Aulas")
      .expect(200);

    if (!Array.isArray(resAulas.body) || resAulas.body.length === 0) {
      throw new Error("No existen aulas en la base de datos.");
    }
    const aulaId = resAulas.body[0].ID;

    // Obtener trabajos del aula
    const resTrabajos = await request(app)
      .get(`/api/edumultipro/Trabajos/Aula/${aulaId}`)
      .expect(200);

    if (!Array.isArray(resTrabajos.body) || resTrabajos.body.length === 0) {
      throw new Error("No existen trabajos en la base de datos.");
    }
    trabajoId = resTrabajos.body[0].ID;

    // Obtener anuncios del aula
    const resAnuncios = await request(app)
      .get(`/api/edumultipro/Anuncios/Aula/${aulaId}`)
      .expect(200);

    if (!Array.isArray(resAnuncios.body) || resAnuncios.body.length === 0) {
      throw new Error("No existen anuncios en la base de datos.");
    }
    anuncioId = resAnuncios.body[0].ID;
  });

  afterAll(() => {
    conexion.end();
  });

  // GET comentarios por anuncio
  test("GET /Comentarios/Anuncio/:id debe retornar lista de comentarios", async () => {
    const res = await request(app)
      .get(`/api/edumultipro/Comentarios/Anuncio/${anuncioId}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  // POST crear comentario
  test("POST /Comentarios debe crear un comentario", async () => {
    const nuevoComentario = {
      descripcion: "Comentario de prueba",
      anuncio_id: anuncioId,
      usuario_id: usuarioId
    };

    const res = await request(app)
      .post("/api/edumultipro/Comentarios")
      .send(nuevoComentario)
      .expect(200);

    expect(res.body.mensaje).toBe("Comentario creado correctamente");
    expect(res.body.insertId).toBeDefined();

    comentarioId = res.body.insertId;
  });

  // GET comentarios por trabajo
  test("GET /Comentarios/Trabajo/:id debe retornar lista de comentarios", async () => {
    const res = await request(app)
      .get(`/api/edumultipro/Comentarios/Trabajo/${trabajoId}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  // DELETE eliminar comentario
  test("DELETE /Comentarios/:id debe eliminar un comentario", async () => {
    const res = await request(app)
      .delete(`/api/edumultipro/Comentarios/${comentarioId}`)
      .expect(200);

    expect(res.body.mensaje).toBe("Comentario eliminado correctamente");
  });
});