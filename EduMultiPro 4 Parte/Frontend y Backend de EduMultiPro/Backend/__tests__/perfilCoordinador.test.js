const request = require("supertest");
const app = require("../index");

describe("GET /verUsuario/:id", () => {

  test("Debe retornar EXACTAMENTE la información completa del usuario, roles y documentos", async () => {
    
    const res = await request(app).get("/api/edumultipro/verUsuario/1");

    console.log("📌 RESPUESTA verUsuario:", res.status, res.body);

    expect(res.status).toBe(200);

    // ---------------- VALIDAR USUARIO COMPLETO ----------------
    expect(res.body.usuario).toEqual({
      ID: 1,
      documento_id: "D002",
      Documento: "Cedula",
      Primer_Nombre: "Juanmodificado",
      Segundo_Nombre: "Alberto2",
      Primer_Apellido: "Pérezmodificado",
      Segundo_Apellido: "Gómez2",
      Correo1: "juan01@gmail.com",
      rol_id: "R003",
      Rol: "Coordinador",
      Correo2: "juan.alt01@gmail.com",
      Contacto1: "3111111111",
      Contacto2: "3201111111",
      Fecha_Nacimiento: "1990-01-15",
      RutaFoto: "h6.png"
    });

    // ---------------- VALIDAR ROLES COMPLETOS ----------------
    expect(res.body.roles).toEqual([
      { ID: "R001", Nombre_Rol: "Alumno" },
      { ID: "R002", Nombre_Rol: "Profesor" },
      { ID: "R003", Nombre_Rol: "Coordinador" },
      { ID: "R004", Nombre_Rol: "Administrador" }
    ]);

    // ---------------- VALIDAR DOCUMENTOS COMPLETOS ----------------
    expect(res.body.documentos).toEqual([
      { ID: "D001", Tipo_Documento: "T.Identidad" },
      { ID: "D002", Tipo_Documento: "Cedula" },
      { ID: "D003", Tipo_Documento: "Cedula de extangeria" }
    ]);

  });

});
