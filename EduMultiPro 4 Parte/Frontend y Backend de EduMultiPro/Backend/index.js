const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const app = express();
const PUERTO = 3000;

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Versión de la especificación OpenAPI
    info: {
      title: "API EduMultiPro", // Título de la API
      version: "1.0.0", // Versión de la API
      description: `
        ## Proyecto EduMultiPro

        **Objetivo:**  
        Desarrollar una plataforma educativa digital accesible que permita a colegios con recursos limitados organizar y centralizar sus actividades académicas y la comunicación entre docentes, estudiantes y coordinadores.

        **Presentado por:**  
        - Johan Madrigal  
        - Oscar Cruz
        - Alejandra Villazón  
        - Santiago Moralez  

        **Fecha:** Julio 2024  
        **Ficha:** Ficha-2925960  

        ## Problemática

        Muchos colegios con recursos limitados no cuentan con plataformas digitales para organizar actividades académicas, lo que dificulta la comunicación entre docentes y estudiantes. Esto genera que los procesos sean desordenados y complicados. Además, la falta de herramientas digitales afecta el seguimiento del progreso de los estudiantes y su acceso a materiales importantes.

        **La solución:**  
        EduMultiPro busca centralizar la información académica y mejorar la gestión educativa de forma accesible, adaptada a colegios con infraestructura limitada.

        ## Descripción de la Plataforma

        **EduMultiPro** es una herramienta digital diseñada para colegios con infraestructura limitada, facilitando la gestión de:
        - Usuarios
        - Cursos
        - Materias
        - Grados
        - Jornadas
        - Horarios
        - Aulas
        - Noticias
        
        Su objetivo es mejorar la organización y la comunicación dentro de la comunidad educativa. A través de un diseño intuitivo y ligero, es una solución que se adapta a contextos con recursos tecnológicos limitados.

        ## Justificación

        Este proyecto es necesario para colegios que no tienen plataformas digitales propias y enfrentan dificultades al utilizar múltiples herramientas dispersas. EduMultiPro permite centralizar todas las funciones necesarias para la gestión académica, mejorando la interacción y comunicación entre todos los miembros de la comunidad educativa.

        ## Objetivos

        **Objetivo General:**  
        Desarrollar una plataforma educativa digital accesible para colegios con recursos limitados.

        **Objetivos Específicos:**
        1. Gestionar usuarios, cursos, grados, materias, horarios y noticias de manera sencilla.
        2. Implementar funcionalidades específicas para docentes, estudiantes, coordinadores y administradores.
        3. Facilitar la creación, visualización y entrega de trabajos escolares.
        4. Mejorar la comunicación institucional mediante anuncios y comentarios.
        5. Optimizar el acceso a la información académica de forma centralizada y fácil de usar.

        ## Alcances

        - Mantener información actualizada sobre eventos, horarios, noticias y actividades de la institución.
        - Permitir la asignación, envío y revisión de trabajos entre estudiantes y docentes.
        - Facilitar la comunicación mediante mensajería y anuncios, promoviendo la interacción entre todos los actores educativos.
        - Desarrollar el sistema pensando en colegios con baja infraestructura tecnológica, garantizando que sea fácil de usar y con requerimientos mínimos.

        ## Método de Recolección de Datos

        Se utilizará una encuesta con 10 preguntas para conocer la opinión de los estudiantes sobre la necesidad del proyecto y su impacto. Posteriormente, se analizarán los resultados y se extraerán conclusiones.
      `,
    },
  },
  apis: ["./db/conexion.js", "./routes/*.js"], // Incluir la ruta del archivo de conexión
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);


// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Ruta para la documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta principal
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de EduMultiPro. El servidor está funcionando correctamente.");
});

// Rutas
app.use("/api/edumultipro", require("./routes/usuarios"));

// Ruta para servir imágenes
app.use("/imagenes", express.static(path.join(__dirname, "imagenes")));

// Iniciar servidor
app.listen(PUERTO, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PUERTO}`);
  console.log("🔗 Documentación Swagger disponible en http://localhost:3000/api-docs");
});
