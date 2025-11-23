const request = require("supertest");
const app = require("../index");

describe("Pruebas de integración - CRUD Grados", () => {

  let gradoIdCreado = null;

  const gradoOriginal = {
    Grado_Nombre: "Grado Test",
    Descripcion_Grado: "Estado creado desde pruebas Jest"
  };

  const gradoModificado = {
    Grado_Nombre: "Grado Actualizado Test",
    Descripcion_Grado: "Descripción actualizada desde pruebas Jest",
  };

  // 1. CREAR
  test("POST /Grados debe crear un grado", async () => {
    const res = await request(app)
      .post("/api/edumultipro/Grados")
      .set("Content-Type", "application/json")
      .send(gradoOriginal);

    console.log("🔥 RESPUESTA CREAR:", res.body);

    expect(res.status).toBe(201);
    expect(res.body.mensaje).toBe("Grado creado correctamente");
    expect(res.body.insertId).toBeDefined();

    gradoIdCreado = res.body.insertId;
  });
  
  // 3. MODIFICAR
  test("PUT /Grados/:id debe modificar el grado creado", async () => {
    const res = await request(app)
      .put(`/api/edumultipro/Grados/${gradoIdCreado}`)
      .set("Content-Type", "application/json")
      .send(gradoModificado);

    console.log("🛠️ RESPUESTA MODIFICAR:", res.body);

    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe("Grado actualizado correctamente");
  });

  // 4. ELIMINAR
  test("DELETE /Grados/:id debe eliminar el grado creado", async () => {
    const res = await request(app)
      .delete(`/api/edumultipro/Grados/${gradoIdCreado}`);

    console.log("❌ RESPUESTA ELIMINAR:", res.body);

    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe("Grado eliminado exitosamente");
  });

});
