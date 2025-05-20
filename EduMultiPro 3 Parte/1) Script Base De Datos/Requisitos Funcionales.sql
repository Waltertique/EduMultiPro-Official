--  ---------------------------------Requisitos Funcionales--------------------------------------

-- ---------- Usuarios ----------

-- Crear Usuario

INSERT INTO Usuario(ID, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Correo1, Contraseña, Correo2, Contacto1, Contacto2, Fecha_Nacimiento, RutaFoto, rol_id, documento_id) Values
	("42","johan","sneider","madrigal","tique", "johan@gmail.com", "johan123", 'johan.alt01@gmail.com', '3123111111', '3201111341', '2008-01-15', null, "R001","D001"),
    ("43","Zoe","Sofia","Sanches",NULL, "Zoe@gmail.com", "Zoe123", 'Zoe.alt01@gmail.com', '3113211111', '3245111111', '1990-01-15',null, "R002","D002");
    
-- Modificar Usuario
UPDATE Usuario SET Primer_Nombre = "sara" WHERE ID = "32";
UPDATE Usuario SET Correo2 = "Sara.alt01@gmail.com" WHERE ID = "32";

UPDATE Usuario SET Segundo_Nombre = "steven" WHERE ID = "31";
UPDATE Usuario SET Fecha_Nacimiento = "2006-06-10" WHERE ID = "31";

-- Eliminar Usuario
DELETE FROM Usuario WHERE ID = "11";
DELETE FROM Usuario WHERE ID = "3";

-- Consultar Usuario
SELECT Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Correo1, Contraseña, Correo2, Contacto1, Contacto2, Fecha_Nacimiento, RutaFoto, Nombre_Rol, Tipo_Documento
FROM Usuario u
INNER JOIN Rol r ON u.rol_id = r.ID
INNER JOIN Documento d ON u.documento_id = d.ID;

select * from Usuario;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Cursos ----------

-- Crear Curso
INSERT INTO Curso(ID, Curso_Nombre, grado_id, jornada_id) Values
	('9', '1102', '11','2'),
	('10', '1104', '11','2');
   
-- Modificar Curso
UPDATE Curso SET Curso_Nombre = "nuvo primero" WHERE ID = "1";
UPDATE Curso SET grado_id = "7" WHERE ID = "2";

-- Eliminar Curso
DELETE FROM Curso WHERE ID = "5";
DELETE FROM Curso WHERE ID = "4";

-- Consultar Curso
SELECT * FROM Curso;

SELECT Curso_Nombre, Grado_Nombre, Jornada_Nombre, Primer_Nombre, Primer_Apellido
FROM Curso
LEFT JOIN Grado ON Curso.grado_id = Grado.ID
LEFT JOIN Jornada ON Curso.jornada_id = Jornada.ID
LEFT JOIN Miembros_Curso ON Curso.ID = Miembros_Curso.curso_id
INNER JOIN Usuario ON Miembros_Curso.usuario_id = Usuario.ID;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Materias ----------

-- Crear Materia
INSERT INTO Materia(ID, Materia_Nombre, Descripcion_Materia) Values
	('11', 'Tecnologia', 'estudio de la tecnologia'),
	('12', 'Prototipos', 'Diseño y construccion de prototipos tecnologicos');
    
-- Modificar Materia
UPDATE Materia SET Materia_Nombre = "Mecanica" WHERE ID = "7";
UPDATE Materia SET Materia_Nombre = "Fisica" WHERE ID = "3";

-- Eliminar Materia
DELETE FROM Materia WHERE ID = "8";
DELETE FROM Materia WHERE ID = "9";

-- Consultar Notas
SELECT * FROM Materia;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Grados ----------

-- Crear Grados
INSERT INTO Grado(ID, Grado_Nombre, Descripcion_Grado) Values
	('12', 'doce', 'grado doce'),
	('13', 'trece', 'grado trece');

-- Modificar Grados
UPDATE Grado SET Grado_Nombre = "quince" WHERE ID = "1";
UPDATE Grado SET Grado_Nombre = "catorce" WHERE ID = "2";

-- Eliminar Grados
DELETE FROM Grado WHERE ID = "4";
DELETE FROM Grado WHERE ID = "5";

-- Consultar Grados
SELECT * FROM Grado;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Jornada ----------

-- Crear Jornada
INSERT INTO Jornada(ID, Jornada_Nombre,Descripcion_Jornada) Values
	('4', 'noche', 'jornada noche'),
	('5', 'madrugada', 'jornada madri¿ugada');

-- Modificar Jornada
UPDATE Jornada SET Jornada_Nombre = "hola" WHERE ID = "1";
UPDATE Jornada SET Jornada_Nombre = "hola2" WHERE ID = "2";

-- Eliminar Jornada
DELETE FROM Jornada WHERE ID = "1";
DELETE FROM Jornada WHERE ID = "2";

-- Consultar Jornada
SELECT * FROM Jornada;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Horarios ----------

-- Crear Horario
INSERT INTO Horario(ID, Titulo_Horario, Imagen_Horario, Descripcion_Horario, profesor_id, curso_id) Values
	('9', 'Horario Profesor 1', 'imagenes/horario_primero.png', 'Horario para la profesor David Castro', "9", NULL),
	('10', 'Horario Profesor 2', 'imagenes/horario_tercero.png', 'Horario para la profesora Pula Mendoza', "10", NULL);
    
-- Modificar Horario
UPDATE Horario SET Titulo_Horario = "horario curso 101" WHERE ID= "1";
UPDATE Horario SET Descripcion_Horario = "horario para el curso 301 de tercero" WHERE ID= "2";

-- Eliminar Horario
DELETE FROM Horario WHERE ID = "5";
DELETE FROM Horario WHERE ID = "6";

-- Consultar Horario
SELECT Titulo_Horario, Imagen_Horario, Descripcion_Horario, Curso_Nombre, Primer_Nombre, Primer_Apellido
FROM Horario
LEFT JOIN Usuario ON Horario.profesor_id = Usuario.ID
LEFT JOIN Curso ON Horario.curso_id = Curso.ID;

SELECT * FROM Horario;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Aula ----------

-- Crear Aula
INSERT INTO Aula(ID, Aula_Nombre, materia_id, usuario_id, curso_id) Values
	('17', 'Aula creada 1', '7', '9', '7'),
    ('18', 'Aula creada 2', '6', '10', '8');

-- Modificar Aula
UPDATE Aula SET Aula_Nombre = "aula modificada" WHERE ID = "1";
UPDATE Aula SET materia_id = "10" WHERE ID = "2";
    
-- Eliminar Aula
DELETE FROM Aula WHERE ID = "3";
DELETE FROM Aula WHERE ID = "4";

-- Consultar Aula
SELECT Aula_Nombre, Materia_Nombre, Primer_Nombre, Curso_Nombre
FROM Aula
LEFT JOIN Materia ON Aula.materia_id = Materia.ID
LEFT JOIN Usuario ON Aula.usuario_id = Usuario.ID
LEFT JOIN Curso ON Aula.curso_id = Curso.ID;

select * from Aula;


-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Tareas ----------

-- Crear Tarea
INSERT INTO Trabajo(ID, Titulo_Trabajo, Descripcion_Trabajo, Fecha_Trabajo, Archivo_Trabajo, aula_id) Values
	('33', 'Ejercicios de filosofia', 'Resuelve la guia de filosofia.', '2025-04-10', 'archivos/filosofia.pdf','17'),
	('34', 'Construcción de Figuras mecanicas', 'Dibuja las piezas mecanicas.', '2025-04-15', 'archivos/mecanica.pdf','17');
    
-- Modificar Tarea
UPDATE Trabajo SET Titulo_Trabajo = "trabajo de algebra" WHERE ID = "1";
UPDATE Trabajo SET Descripcion_Trabajo = "Figuras Geometricas" WHERE ID = "2";

-- Eliminar Tarea
DELETE FROM Trabajo WHERE ID = "4";
DELETE FROM Trabajo WHERE ID = "5";

-- Consultar Tarea
Select Titulo_Trabajo, Descripcion_Trabajo, Fecha_Trabajo, Archivo_Trabajo, Aula_Nombre
FROM Trabajo 
INNER JOIN Aula ON Trabajo.aula_id = Aula.ID;

select * from Trabajo;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Anuncio ----------

-- Crear Anuncio
INSERT INTO Anuncio(ID, Titulo_Anuncio, Descripcion_Anuncio, Enlace_Anuncio, Fecha_Anuncio, aula_id, usuario_id) Values
	('33', 'nuevo trabajo de matenmaticas', 'nuevo trabajo, porfavor realizarlo', 'https://colegio.edu/anuncios/matematicas1', '2025-03-20','17','9'),
	('34', 'notas entregadas', 'se hace la entrega de las notas de los trabajos realizados.', 'https://colegio.edu/guias/matematicas1', '2025-03-18','17','9');
    
-- Modificar Anuncio
UPDATE Anuncio SET Titulo_Anuncio = "Realizar el examen" WHERE ID = "1";
UPDATE Anuncio SET Descripcion_Anuncio = "porfavor estudiar el siguiente documento" WHERE ID = "2";

-- Eliminar Anuncio
DELETE FROM Anuncio WHERE ID = "4";
DELETE FROM Anuncio WHERE ID = "5";

-- Consultar Anuncio
SELECT Titulo_Anuncio, Descripcion_Anuncio, Enlace_Anuncio, Fecha_Anuncio, Aula_Nombre
FROM Anuncio
INNER JOIN Aula ON Anuncio.aula_id = Aula.ID;

select * from Anuncio;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Comentarios ----------

-- Crear Comentarios
INSERT INTO Comentario(ID, Descripcion, Fecha, trabajo_id, anuncio_id, usuario_id) Values
	('5', 'hola k hace', '2025-04-21', '25', null, '13'),
	('6', 'k onda', '2025-04-26', null, '25', '14');
    
-- Modificar Comentarios
UPDATE Comentario SET Descripcion = "Realizar el examen" WHERE ID = "1";
UPDATE Comentario SET Descripcion = "porfavor estudiar el siguiente documento" WHERE ID = "2";

-- Eliminar Comentarios
DELETE FROM Comentario WHERE ID = "1";
DELETE FROM Comentario WHERE ID = "2";

-- Consultar Comentarios
SELECT Titulo_Anuncio, Descripcion_Anuncio, Enlace_Anuncio, Fecha_Anuncio, Aula_Nombre
FROM Anuncio
INNER JOIN Aula ON Anuncio.aula_id = Aula.ID;

select * from Comentario;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Noticias ----------

-- Crear Noticia
INSERT INTO Noticia (ID, Titulo_Noticia, Encabezado, Descripcion1, Descripcion2, Descripcion3, Fecha_Notica, Imagen1, Imagen2, Imagen3, tipo_noticia_id) VALUES
	('7', 'El Mundial 2026', 'La gran fiesta del fútbol se acerca.','La FIFA ha anunciado oficialmente que el Mundial de Fútbol se celebrará en 2026.',
	'Se espera una participación histórica de selecciones y millones de espectadores.','El evento se llevará a cabo en varias ciudades de Estados Unidos, México y Canadá.','2025-03-20', 'img1.jpg', 'img2.jpg', 'img3.jpg', '5'),
	('8', 'El dólar subió', 'Nueva alza del dólar genera impacto en la economía.','El mercado cambiario reportó un aumento significativo en el valor del dólar.',
	'Esto podría influir en los precios de productos importados y servicios financieros.','Expertos recomiendan cautela en transacciones internacionales.','2025-05-14', 'mercaplus1.jpg', NULL, NULL, '6');
    
-- Modificar Noticia
UPDATE Noticia SET Titulo_Noticia = "la nueva plataforma" WHERE ID = "1";
UPDATE Noticia SET Descripcion1 = "la plataforma se encuentra en desarrollo" WHERE ID = "1";

UPDATE Noticia SET Titulo_Noticia = "la aplicacion para su inventario" WHERE ID = "2";
UPDATE Noticia SET Descripcion1 = "haga un buen uso de su inventario con mercaplus" WHERE ID = "2";

-- Eliminar Noticia
	DELETE FROM Noticia WHERE ID = "3";
    DELETE FROM Noticia WHERE ID = "4";
    
-- Consultar Noticia
SELECT 
    Titulo_Noticia,Encabezado,Descripcion1,Descripcion2,Descripcion3,Fecha_Notica,Imagen1,Imagen2,Imagen3,Tipo
FROM Noticia
LEFT JOIN Tipo_Noticia ON Noticia.tipo_noticia_id = Tipo_Noticia.ID;






