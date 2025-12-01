const request = require("supertest");
const app = require("../index");
const conexion = require("../db/conexion");

describe("Pruebas de integración - Aulas", () => {

  let materiaId = null;
  let cursoId = null;
  let profesorId = null;

  beforeAll(async () => {

    // Obtener materias
    const resMaterias = await request(app)
      .get("/api/edumultipro/Materias")
      .expect(200);

    if (!Array.isArray(resMaterias.body) || resMaterias.body.length === 0) {
      throw new Error("No existen materias. Debes crear al menos una para ejecutar los tests.");
    }
    materiaId = resMaterias.body[0].ID;

    // Obtener cursos
    const resCursos = await request(app)
      .get("/api/edumultipro/Cursos-jornada")
      .expect(200);

    if (!Array.isArray(resCursos.body) || resCursos.body.length === 0) {
      throw new Error("No existen cursos. Debes crear al menos uno para ejecutar los tests.");
    }
    cursoId = resCursos.body[0].ID;

    // Obtener profesores
    const resProfesores = await request(app)
      .get("/api/edumultipro/Profesores")
      .expect(200);

    if (!Array.isArray(resProfesores.body) || resProfesores.body.length === 0) {
      throw new Error("No existen profesores (R002). Crea uno antes de los tests.");
    }
    profesorId = resProfesores.body[0].ID;
  });

  afterAll(() => {
    conexion.end();
  });

  // GET
  test("GET /Aulas debe devolver lista de aulas", async () => {
    const res = await request(app)
      .get("/api/edumultipro/Aulas")
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  // POST crear aula
  test("POST /Aulas debe crear un aula", async () => {
    const aulaNueva = {
      aula_nombre: "Aula Test",
      materia_id: materiaId,
      curso_id: cursoId,
      usuario_id: profesorId
    };

    const res = await request(app)
      .post("/api/edumultipro/Aulas")
      .send(aulaNueva)
      .expect(200);

    expect(res.body.mensaje).toBe("Aula creada exitosamente");
  });

  // PUT actualizar aula
  test("PUT /Aulas/:id debe actualizar un aula", async () => {

    // Crear aula temporal
    const insert = await request(app)
      .post("/api/edumultipro/Aulas")
      .send({
        aula_nombre: "Aula Editar",
        materia_id: materiaId,
        curso_id: cursoId,
        usuario_id: profesorId
      })
      .expect(200);

    const id = insert.body.insertId || insert.body.id;
    expect(id).toBeDefined();

    // Actualizar el aula
    const res = await request(app)
      .put(`/api/edumultipro/Aulas/${id}`)
      .send({
        Aula_Nombre: "Aula Editada",
        materia_id: materiaId
      })
      .expect(200);

    expect(res.body.mensaje).toBe("Aula actualizada correctamente");
  });

  // DELETE aula
  test("DELETE /Aulas/:id debe eliminar un aula", async () => {

    // Crear aula que se eliminará
    const insert = await request(app)
      .post("/api/edumultipro/Aulas")
      .send({
        aula_nombre: "Aula Eliminar",
        materia_id: materiaId,
        curso_id: cursoId,
        usuario_id: profesorId
      })
      .expect(200);

    const aulaId = insert.body.insertId || insert.body.id;
    expect(aulaId).toBeDefined();

    // Eliminar
    const res = await request(app)
      .delete(`/api/edumultipro/Aulas/${aulaId}`)
      .expect(200);

    expect(res.body.mensaje).toBe("Aula eliminado exitosamente");
  });

});