const request = require("supertest");
const app = require("../index");

describe("Pruebas de integración - CRUD Horarios", () => {

  let horarioIdCreado = null;

  const horarioOriginal = {
    titulo: "Horario Test",
    descripcion: "Horario creado desde pruebas Jest",
    profesor_id: 4,
    curso_id: null,
    imagen_base64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  };

  const horarioModificado = {
    titulo: "Horario Actualizado Test",
    descripcion: "Horario modificado desde pruebas",
    profesor_id: 4,
    curso_id: null,
    imagen_base64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  };

  // 1. CREAR
  test("POST /Horarios debe crear un horario", async () => {
    const res = await request(app)
      .post("/api/edumultipro/Horarios")
      .set("Content-Type", "application/json")
      .send(horarioOriginal);

    console.log("🔥 RESPUESTA CREAR:", res.body);

    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe("Horario creado exitosamente");
    expect(res.body.id).toBeDefined();

    horarioIdCreado = res.body.id;
  });

  // 2. VER POR ID
  test("GET /Horarios/:id debe traer el horario creado", async () => {
    const res = await request(app)
      .get(`/api/edumultipro/Horarios/${horarioIdCreado}`);

    console.log("📌 RESPUESTA OBTENER:", res.body);

    expect(res.status).toBe(200);
    expect(res.body.ID).toBe(horarioIdCreado); // ← CORREGIDO
  });

  // 3. MODIFICAR
  test("PUT /Horarios/:id debe modificar el horario creado", async () => {
    const res = await request(app)
      .put(`/api/edumultipro/Horarios/${horarioIdCreado}`)
      .set("Content-Type", "application/json")
      .send(horarioModificado);

    console.log("🛠️ RESPUESTA MODIFICAR:", res.body);

    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe("Horario actualizado correctamente");
  });

  // 4. ELIMINAR
  test("DELETE /Horarios/:id debe eliminar el horario creado", async () => {
    const res = await request(app)
      .delete(`/api/edumultipro/Horarios/${horarioIdCreado}`);

    console.log("❌ RESPUESTA ELIMINAR:", res.body);

    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe("Horario eliminado exitosamente"); // ← CORREGIDO
  });

});
