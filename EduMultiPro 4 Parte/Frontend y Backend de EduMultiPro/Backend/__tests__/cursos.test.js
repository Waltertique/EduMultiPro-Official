const request = require("supertest");
const app = require("../index");
const conexion = require("../db/conexion");

describe("Pruebas de integración - Cursos", () => {
  let gradoId = null;
  let jornadaId = null;

  // Antes de los tests: verificar que existan grados y jornadas
  beforeAll(async () => {

    // Buscar grados existentes
    const resGrados = await request(app)
      .get("/api/edumultipro/Grados")
      .expect(200);

    if (!Array.isArray(resGrados.body) || resGrados.body.length === 0) {
      throw new Error("No existen grados en la base de datos. Crea al menos uno antes de ejecutar los tests.");
    }

    gradoId = resGrados.body[0].ID;

    // Buscar jornadas existentes
    const resJornadas = await request(app)
      .get("/api/edumultipro/Jornadas")
      .expect(200);

    if (!Array.isArray(resJornadas.body) || resJornadas.body.length === 0) {
      throw new Error("No existen jornadas en la base de datos. Crea al menos una antes de ejecutar los tests.");
    }

    jornadaId = resJornadas.body[0].ID;
  });

  afterAll(() => {
    // Cerrar conexión al terminar todos los tests
    conexion.end();
  });

  // obtener grados
  test("GET /Cursos debe devolver lista de cursos", async () => {
    const res = await request(app)
      .get("/api/edumultipro/Cursos")
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  // crear grados
  test("POST /Cursos debe crear un curso", async () => {
    const nuevoCurso = {
      Curso_Nombre: "Curso Test",
      grado_id: gradoId,
      jornada_id: jornadaId
    };

    const res = await request(app)
      .post("/api/edumultipro/Cursos")
      .send(nuevoCurso)
      .expect(200); 

    expect(res.body.mensaje).toBe("Curso creado correctamente");
    expect(res.body.id || res.body.insertId).toBeDefined();
  });

  // modificar grados
  test("PUT /Cursos/:id debe actualizar un curso", async () => {
    // Crear curso temporal para actualizar
    const insert = await request(app)
      .post("/api/edumultipro/Cursos")
      .send({
        Curso_Nombre: "Curso Original",
        grado_id: gradoId,
        jornada_id: jornadaId
      });

    const id = insert.body.id || insert.body.insertId;
    expect(id).toBeDefined();

    // Actualizar
    const res = await request(app)
      .put(`/api/edumultipro/Cursos/${id}`)
      .send({
        Curso_Nombre: "Curso Modificado",
        grado_id: gradoId,
        jornada_id: jornadaId
      })
      .expect(200);

    expect(res.body.mensaje).toBe("Curso actualizado correctamente");
  });

  // eliminar grados
  test("DELETE /Cursos/:id debe eliminar un curso", async () => {
    // Crear curso temporal para eliminar
    const insert = await request(app)
      .post("/api/edumultipro/Cursos")
      .send({
        Curso_Nombre: "Curso Eliminar",
        grado_id: gradoId,
        jornada_id: jornadaId
      });

    const cursoId = insert.body.id || insert.body.insertId;
    expect(cursoId).toBeDefined();

    // Eliminar
    const res = await request(app)
      .delete(`/api/edumultipro/Cursos/${cursoId}`)
      .expect(200);

    expect(res.body.mensaje).toBe("Curso eliminado exitosamente");
  });
});

