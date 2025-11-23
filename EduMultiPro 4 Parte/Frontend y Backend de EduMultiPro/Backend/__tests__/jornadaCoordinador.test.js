const request = require("supertest");
const app = require("../index");

describe("Pruebas de integración - CRUD Jornada", () => {

  let jornadaIdCreado = null;

  const JornadaOriginal = {
    Jornada_Nombre: "Jornada Test",
    Descripcion_Jornada: "Estado creado desde pruebas Jest"
  };

  const jornadaModificado = {
    Jornada_Nombre: "Jornada Actualizado Test",
    Descripcion_Jornada: "Descripción actualizada desde pruebas Jest",
  };

  // 1. CREAR
  test("POST /Jornadas debe crear una jornada", async () => {
    const res = await request(app)
      .post("/api/edumultipro/Jornadas")
      .set("Content-Type", "application/json")
      .send(JornadaOriginal);

    console.log("🔥 RESPUESTA CREAR:", res.body);

    expect(res.status).toBe(201);
    expect(res.body.mensaje).toBe("Jornada creada correctamente");
    expect(res.body.insertId).toBeDefined();

    jornadaIdCreado = res.body.insertId;
  });
  
  // 3. MODIFICAR
  test("PUT /Jornadas/:id debe modificar la jornada creada", async () => {
    const res = await request(app)
      .put(`/api/edumultipro/Jornadas/${jornadaIdCreado}`)
      .set("Content-Type", "application/json")
      .send(jornadaModificado);

    console.log("🛠️ RESPUESTA MODIFICAR:", res.body);

    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe("Jornada actualizada correctamente");
  });

  // 4. ELIMINAR
  test("DELETE /Jornadas/:id debe eliminar la jornada creada", async () => {
    const res = await request(app)
      .delete(`/api/edumultipro/Jornadas/${jornadaIdCreado}`);

    console.log("❌ RESPUESTA ELIMINAR:", res.body);

    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe("Jornada eliminada exitosamente");
  });

});
