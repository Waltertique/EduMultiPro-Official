const request = require("supertest");
const app = require("../index");
const conexion = require("../db/conexion");
const path = require("path");
const fs = require("fs");

describe("Pruebas de integración - Anuncios", () => {
  let aulaId = null;
  let usuarioId = null; 
  let anuncioId = null;

  beforeAll(async () => {

    // Buscar aulas
    const resAulas = await request(app)
      .get("/api/edumultipro/Aulas")
      .expect(200);

    if (!Array.isArray(resAulas.body) || resAulas.body.length === 0) {
      throw new Error("No existen aulas en la base de datos. Crea una antes de ejecutar los tests.");
    }
    aulaId = resAulas.body[0].ID;

    // ➤ Buscar usuarios
    const resUsuarios = await request(app)
      .get("/api/edumultipro/Usuarios") 
      .expect(200);

    if (!Array.isArray(resUsuarios.body) || resUsuarios.body.length === 0) {
      throw new Error("No existen usuarios en la base de datos.");
    }
    usuarioId = resUsuarios.body[0].ID;
  });

  afterAll(() => {
    conexion.end();
  });

  // GET anuncios por aula
  test("GET /Anuncios/Aula/:id debe devolver lista de anuncios", async () => {
    const res = await request(app)
      .get(`/api/edumultipro/Anuncios/Aula/${aulaId}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  // Crear anuncio (sin archivo)
  test("POST /Anuncios debe crear un anuncio sin archivo", async () => {
    const data = {
      titulo: "Prueba Anuncio",
      descripcion: "Descripción de prueba",
      aula_id: aulaId,
      usuario_id: usuarioId
    };

    const res = await request(app)
      .post("/api/edumultipro/Anuncios")
      .field("titulo", data.titulo)
      .field("descripcion", data.descripcion)
      .field("aula_id", data.aula_id)
      .field("usuario_id", data.usuario_id)
      .expect(200);

    expect(res.body.mensaje).toBe("Anuncio creado con éxito");
    expect(res.body.insertId).toBeDefined();

    anuncioId = res.body.insertId;
  });

  // Crear anuncio con archivo
  test("POST /Anuncios debe crear un anuncio con archivo", async () => {
    const tempFile = path.join(__dirname, "file_test.txt");
    fs.writeFileSync(tempFile, "archivo de prueba");

    const res = await request(app)
      .post("/api/edumultipro/Anuncios")
      .field("titulo", "Anuncio con archivo")
      .field("descripcion", "Probando archivo")
      .field("aula_id", aulaId)
      .field("usuario_id", usuarioId)
      .attach("archivo", tempFile)
      .expect(200);

    expect(res.body.mensaje).toBe("Anuncio creado con éxito");
    expect(res.body.insertId).toBeDefined();

    fs.unlinkSync(tempFile);
  });

  // Editar anuncio (solo texto)
  test("PUT /Anuncios/:id debe actualizar un anuncio sin archivo", async () => {
    const res = await request(app)
      .put(`/api/edumultipro/Anuncios/${anuncioId}`)
      .field("titulo", "Anuncio Modificado")
      .field("descripcion", "Cambio sin archivo")
      .expect(200);

    expect(res.body.mensaje).toBe("Anuncio actualizado correctamente");
  });

  // Editar anuncio CON archivo nuevo
  test("PUT /Anuncios/:id debe actualizar un anuncio y agregar archivo", async () => {
    const tempFile = path.join(__dirname, "update_test.txt");
    fs.writeFileSync(tempFile, "archivo update");

    const res = await request(app)
      .put(`/api/edumultipro/Anuncios/${anuncioId}`)
      .field("titulo", "Anuncio Actualizado Archivo")
      .field("descripcion", "Descripción con archivo nuevo")
      .attach("archivo", tempFile)
      .expect(200);

    expect(res.body.mensaje).toBe("Anuncio actualizado correctamente");

    fs.unlinkSync(tempFile);
  });

  // Eliminar anuncio
  test("DELETE /Anuncios/:id debe eliminar un anuncio", async () => {
    const res = await request(app)
      .delete(`/api/edumultipro/Anuncios/${anuncioId}`)
      .expect(200);

    expect(res.body.mensaje).toBe("Anuncio eliminado correctamente");
  });
});