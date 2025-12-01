const request = require("supertest");
const app = require("../index");
const conexion = require("../db/conexion");
const path = require("path");
const fs = require("fs");

describe("Pruebas de integración - Noticias", () => {
  let noticiaId = null;
  let tipoNoticia = 4; // “Ninguna de las anteriores”

  beforeAll(async () => {
    // Obtener tipos de noticia
    const resTipos = await request(app)
      .get("/api/edumultipro/TiposNoticia")
      .expect(200);

    if (!Array.isArray(resTipos.body) || resTipos.body.length === 0) {
      throw new Error("No existen tipos de noticia en la base de datos.");
    }
  });

  afterAll(() => {
    conexion.end();
  });

  // GET todas las noticias
  test("GET /Noticias debe retornar lista de noticias", async () => {
    const res = await request(app)
      .get("/api/edumultipro/Noticias")
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  // Crear noticia SIN archivos
  test("POST /Noticias debe crear una noticia sin archivos", async () => {
    const data = {
      titulo: "Noticia de prueba",
      encabezado: "Encabezado prueba",
      descripcion1: "Descripción principal",
      descripcion2: "Descripción extra 2",
      descripcion3: "Descripción extra 3",
      fecha: "2025-01-01",
      tipo_noticia_id: tipoNoticia.toString()
    };

    const res = await request(app)
      .post("/api/edumultipro/Noticias")
      .field("titulo", data.titulo)
      .field("encabezado", data.encabezado)
      .field("descripcion1", data.descripcion1)
      .field("descripcion2", data.descripcion2)
      .field("descripcion3", data.descripcion3)
      .field("fecha", data.fecha)
      .field("tipo_noticia_id", data.tipo_noticia_id)
      .expect(200);

    expect(res.body.mensaje).toBe("Noticia creada exitosamente");

    // Obtener la noticia recién creada
    const todas = await request(app)
      .get("/api/edumultipro/Noticias")
      .expect(200);

    noticiaId = todas.body[todas.body.length - 1].ID;
  });

  // Crear noticia CON archivos
  test("POST /Noticias debe crear una noticia con archivos", async () => {
    const temp1 = path.join(__dirname, "img_test1.txt");
    const temp2 = path.join(__dirname, "img_test2.txt");
    const temp3 = path.join(__dirname, "img_test3.txt");

    fs.writeFileSync(temp1, "archivo 1");
    fs.writeFileSync(temp2, "archivo 2");
    fs.writeFileSync(temp3, "archivo 3");

    const res = await request(app)
      .post("/api/edumultipro/Noticias")
      .field("titulo", "Noticia con imágenes")
      .field("encabezado", "Encabezado imágenes")
      .field("descripcion1", "Texto principal")
      .field("descripcion2", "extra 2")
      .field("descripcion3", "extra 3")
      .field("fecha", "2025-01-01")
      .field("tipo_noticia_id", tipoNoticia.toString())
      .attach("imagen1", temp1)
      .attach("imagen2", temp2)
      .attach("imagen3", temp3)
      .expect(200);

    expect(res.body.mensaje).toBe("Noticia creada exitosamente");

    fs.unlinkSync(temp1);
    fs.unlinkSync(temp2);
    fs.unlinkSync(temp3);
  });

  // EDITAR noticia (solo texto)
  test("PUT /Noticias/:id debe actualizar noticia sin archivos", async () => {
    const res = await request(app)
      .put(`/api/edumultipro/Noticias/${noticiaId}`)
      .field("titulo", "Noticia Modificada")
      .field("encabezado", "Encabezado cambiado")
      .field("descripcion1", "Nueva descripción principal")
      .field("descripcion2", "Nueva descripción 2")
      .field("descripcion3", "Nueva descripción 3")
      .field("fecha", "2025-02-01")
      .field("tipo_noticia_id", tipoNoticia.toString())
      .expect(200);

    expect(res.body.mensaje).toBe("Noticia actualizada correctamente");
  });

  // EDITAR noticia CON archivos
  test("PUT /Noticias/:id debe actualizar noticia con archivos", async () => {
    const temp = path.join(__dirname, "update_img.txt");
    fs.writeFileSync(temp, "update imagen");

    const res = await request(app)
      .put(`/api/edumultipro/Noticias/${noticiaId}`)
      .field("titulo", "Noticia Actualizada con Archivo")
      .field("encabezado", "Encabezado actualizado")
      .field("descripcion1", "Texto editado")
      .field("descripcion2", "extra editado 2")
      .field("descripcion3", "extra editado 3")
      .field("fecha", "2025-02-02")
      .field("tipo_noticia_id", tipoNoticia.toString())
      .attach("imagen1", temp)
      .expect(200);

    expect(res.body.mensaje).toBe("Noticia actualizada correctamente");

    fs.unlinkSync(temp);
  });

  // ELIMINAR noticia
  test("DELETE /Noticias/:id debe eliminar noticia", async () => {
    const res = await request(app)
      .delete(`/api/edumultipro/Noticias/${noticiaId}`)
      .expect(200);

    expect(res.body.mensaje).toBe("Noticia eliminado exitosamente");
  });
});