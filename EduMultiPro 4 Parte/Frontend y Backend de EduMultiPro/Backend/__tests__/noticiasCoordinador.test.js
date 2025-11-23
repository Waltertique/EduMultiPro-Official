const request = require("supertest");
const app = require("../index");

describe("CRUD Noticias SIN ARCHIVOS (solo fields)", () => {
  let noticiaId = null;

  const noticiaOriginal = {
    titulo: "Test Noticia",
    encabezado: "Encabezado test",
    descripcion1: "Descripción 1",
    descripcion2: "Descripción 2",
    descripcion3: "Descripción 3",
    fecha: "2009-10-12",
    tipo_noticia_id: "4",
    imagen1: "imagen1.jpg",
    imagen2: "imagen2.jpg",
    imagen3: "imagen3.jpg"
  };

  const noticiaModificada = {
    titulo: "Noticia Modificada",
    encabezado: "Encabezado Modificado",
    descripcion1: "Desc1 modificada",
    descripcion2: "Desc2 modificada",
    descripcion3: "Desc3 modificada",
    fecha: "2010-11-01",
    tipo_noticia_id: "4",
    imagen1: "imagen1.jpg",
    imagen2: "imagen2.jpg",
    imagen3: "imagen3.jpg"
  };

  // ---------------- CREAR ----------------
  test("POST crear noticia", async () => {
    let req = request(app)
      .post("/api/edumultipro/Noticias")
      .set("Accept", "application/json")
      .set("Content-Type", "multipart/form-data");

    Object.keys(noticiaOriginal).forEach(key => {
      req = req.field(key, noticiaOriginal[key]);
    });

    const res = await req;

    console.log("🔥 CREAR:", res.status, res.body);

    expect(res.status).toBe(200);
    expect(res.body.id || res.body.insertId).toBeDefined();

    noticiaId = res.body.id || res.body.insertId;
  });

  // ---------------- OBTENER ----------------
  test("GET obtener noticia", async () => {
    const res = await request(app).get(`/api/edumultipro/Noticias/${noticiaId}`);

    console.log("📌 OBTENER:", res.status, res.body);

    expect(res.status).toBe(200);

    expect(res.body.id || res.body.ID).toBe(noticiaId);
  });

  // ---------------- MODIFICAR ----------------
  test("PUT modificar noticia", async () => {
    let req = request(app)
      .put(`/api/edumultipro/Noticias/${noticiaId}`)
      .set("Accept", "application/json")
      .set("Content-Type", "multipart/form-data");

    Object.keys(noticiaModificada).forEach(key => {
      req = req.field(key, noticiaModificada[key]);
    });

    const res = await req;

    console.log("🛠️ MODIFICAR:", res.status, res.body);

    expect(res.status).toBe(200);
  });

  // ---------------- ELIMINAR ----------------
  test("DELETE eliminar noticia", async () => {
    const res = await request(app).delete(`/api/edumultipro/Noticias/${noticiaId}`);

    console.log("❌ ELIMINAR:", res.status, res.body);

    expect(res.status).toBe(200);
  });

});
