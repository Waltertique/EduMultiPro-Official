--  ---------------------------------Requisitos Funcionales--------------------------------------

-- ---------- Usuarios ----------

-- Crear Usuario
INSERT INTO Informacion(ID, Correo2, Contacto1, Contacto2, Fecha_Nacimiento) Values
	('I041', 'johan.alt01@gmail.com', '3123111111', '3201111341', '2008-01-15'),
    ('I042', 'Zoe.alt01@gmail.com', '3113211111', '3245111111', '1990-01-15');
    
INSERT INTO Usuario(ID, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Correo1, Contraseña, rol_id, documento_id, curso_id, informacion_id) Values
	("E031","johan","sneider","madrigal","tique", "johan@gmail.com", "johan123","R001","D001","Q1101X","I041"),
    ("P032","Zoe","Sofia","Sanches",NULL, "Zoe@gmail.com", "Zoe123", "R002","D002","Q1101X","I042");

-- Modificar Usuario
UPDATE Usuario SET Primer_Nombre = "sara" WHERE ID = "P032";
UPDATE Informacion SET Correo2 = "Sara.alt01@gmail.com" WHERE ID = "P032";

UPDATE Usuario SET Segundo_Nombre = "steven" WHERE ID = "E031";
UPDATE Informacion SET Fecha_Nacimiento = "2006-06-10" WHERE ID = "E031";

-- Eliminar Usuario
DELETE FROM Usuario WHERE ID = "E001";
DELETE FROM Usuario WHERE ID = "P001";

-- Consultar Usuario
SELECT Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Nombre_Rol, Tipo_Documento, Curso_Nombre, Correo1, Correo2, Contacto1, Contacto2, Fecha_Nacimiento, RutaFoto
FROM Usuario
INNER JOIN Rol ON rol_id = Rol.ID
INNER JOIN Documento ON documento_id = Documento.ID
LEFT JOIN Curso ON curso_id = Curso.ID
INNER JOIN Informacion ON informacion_id = Informacion.ID;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Noticias ----------

-- Crear Noticia
INSERT INTO Noticia(ID, Titulo_Noticia, Descripcion, Fecha_Notica, Imagen1, Imagen2, Imagen3, tipo_noticia_id) Values
	('NC007', 'El mundial 2026', 'Se anuncia el mundial de futbol el cual se realizara en el año 2026', '2025-03-20', 'img1.jpg', 'img2.jpg', 'img3.jpg', 'NT005'),
	('NC008', 'el dolar subio', 'nuevamente se anuncia la subida del dolar', '2025-05-14', 'mercaplus1.jpg', NULL, NULL, 'NT006');
    
-- Modificar Noticia
UPDATE Noticia SET Titulo_Noticia = "la nueva plataforma" WHERE ID = "NC001";
UPDATE Noticia SET Descripcion = "la plataforma se encuentra en desarrollo" WHERE ID = "NC001";

UPDATE Noticia SET Titulo_Noticia = "la aplicacion para su inventario" WHERE ID = "NC002";
UPDATE Noticia SET Descripcion = "haga un buen uso de su inventario con mercaplus" WHERE ID = "NC002";

-- Eliminar Noticia
	DELETE FROM Noticia WHERE ID = "NC003";
    DELETE FROM Noticia WHERE ID = "NC004";
    
-- Consultar Noticia
SELECT Titulo_Noticia, Descripcion, Fecha_Notica, Imagen1, Imagen2, Imagen3, Tipo
FROM Noticia
LEFT JOIN Tipo_Noticia ON tipo_noticia_id = Tipo_Noticia.ID;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Horarios ----------

-- Crear Horario
INSERT INTO Horario(ID, Titulo_Horario, Imagen_Horario, Descripcion_Horario) Values
	('H009', 'Horario Profesor 1', 'imagenes/horario_primero.png', 'Horario para la profesor David Castro'),
	('H010', 'Horario Profesor 2', 'imagenes/horario_tercero.png', 'Horario para la profesora Pula Mendoza');
    
INSERT INTO Horario_Curso(ID, horario_id, profesor_id, curso_id) Values
	('HC009','H009', "P007", NULL),
	('HC010','H010', "P008", NULL);
    
-- Modificar Horario
UPDATE Horario SET Titulo_Horario = "horario curso 101" WHERE ID= "H001";
UPDATE Horario SET Descripcion_Horario = "horario para el curso 301 de tercero" WHERE ID= "H002";

-- Eliminar Horario
DELETE FROM Horario WHERE ID = "H005";
DELETE FROM Horario WHERE ID = "H006";

-- Consultar Horario
SELECT horario_id, profesor_id, Primer_Nombre, Primer_Apellido, Curso_Nombre, Titulo_Horario, Imagen_Horario, Descripcion_Horario
FROM Horario_Curso
LEFT JOIN Horario ON Horario_Curso.horario_id = Horario.ID
LEFT JOIN Usuario ON Horario_Curso.profesor_id = Usuario.ID
LEFT JOIN Curso ON Horario_Curso.curso_id = Curso.ID;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Cursos ----------

-- Crear Curso
INSERT INTO Curso(ID, Curso_Nombre, grado_id, jornada_id) Values
	('Q1102T', '1102', 'G11','J02'),
	('Q1104T', '1104', 'G11','J02');
   
-- Modificar Curso
UPDATE Curso SET Curso_Nombre = "nuvo primero" WHERE ID = "Q0101M";
UPDATE Curso SET grado_id = "G07" WHERE ID = "Q0301M";

-- Eliminar Curso
DELETE FROM Curso WHERE ID = "Q0701T";
DELETE FROM Curso WHERE ID = "Q0601T";

-- Consultar Curso
SELECT * FROM Curso;

SELECT Curso_Nombre, Grado_Nombre, Jornada_Nombre, Primer_Nombre, Primer_Apellido
FROM Curso
LEFT JOIN Grado ON Curso.grado_id = Grado.ID
LEFT JOIN Jornada ON Curso.jornada_id = Jornada.ID
LEFT JOIN Miembros_Curso ON Curso.ID = Miembros_Curso.curso_id
INNER JOIN Usuario ON Miembros_Curso.usuario_id = Usuario.ID;


-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Aula ----------

-- Crear Aula
INSERT INTO Aula(ID, Aula_Nombre, materia_id, usuario_id, curso_id) Values
	('A017', 'Aula creada 1', 'M009', 'P007', 'Q0301M'),
    ('A018', 'Aula creada 2', 'M010', 'P008', 'Q0301M');

-- Modificar Aula
UPDATE Aula SET Aula_Nombre = "aula modificada" WHERE ID = "A001";
UPDATE Aula SET materia_id = "M010" WHERE ID = "A002";
    
-- Eliminar Aula
DELETE FROM Aula WHERE ID = "A003";
DELETE FROM Aula WHERE ID = "A004";

-- Consultar Aula
SELECT Aula_Nombre, Materia_Nombre, Primer_Nombre, Curso_Nombre
FROM Aula
LEFT JOIN Materia ON Aula.materia_id = Materia.ID
LEFT JOIN Usuario ON Aula.usuario_id = Usuario.ID
LEFT JOIN Curso ON Aula.curso_id = Curso.ID;


-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Tareas ----------

-- Crear Tarea
INSERT INTO Trabajo(ID, Tema_Trabajo, Titulo_Trabajo, Descripcion_Trabajo, Fecha_Trabajo, Archivo_Trabajo, aula_id) Values
	('T033', 'Filosofia', 'Ejercicios de filosofia', 'Resuelve la guia de filosofia.', '2025-04-10', 'archivos/filosofia.pdf','A006'),
	('T034', 'Mecanica', 'Construcción de Figuras mecanicas', 'Dibuja las piezas mecanicas.', '2025-04-15', 'archivos/mecanica.pdf','A006');
    
-- Modificar Tarea
UPDATE Trabajo SET Titulo_Trabajo = "trabajo de algebra" WHERE ID = "T001";
UPDATE Trabajo SET Tema_Trabajo = "Figuras Geometricas" WHERE ID = "T002";

-- Eliminar Tarea
DELETE FROM Trabajo WHERE ID = "T004";
DELETE FROM Trabajo WHERE ID = "T005";

-- Consultar Tarea
Select Tema_Trabajo, Titulo_Trabajo, Descripcion_Trabajo, Fecha_Trabajo, Archivo_Trabajo, Aula_Nombre
FROM Trabajo 
INNER JOIN Aula ON Trabajo.aula_id = Aula.ID;


-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Anuncio ----------

-- Crear Anuncio
INSERT INTO Anuncio(ID, Titulo_Anuncio, Descripcion_Anuncio, Enlace_Anuncio, Fecha_Anuncio, aula_id, usuario_id) Values
	('AN033', 'nuevo trabajo de matenmaticas', 'nuevo trabajo, porfavor realizarlo', 'https://colegio.edu/anuncios/matematicas1', '2025-03-20','A006','P007'),
	('AN034', 'notas entregadas', 'se hace la entrega de las notas de los trabajos realizados.', 'https://colegio.edu/guias/matematicas1', '2025-03-18','A006','P007');
    
-- Modificar Anuncio
UPDATE Anuncio SET Titulo_Anuncio = "Realizar el examen" WHERE ID = "AN001";
UPDATE Anuncio SET Descripcion_Anuncio = "porfavor estudiar el siguiente documento" WHERE ID = "AN002";

-- Eliminar Anuncio
DELETE FROM Anuncio WHERE ID = "AN004";
DELETE FROM Anuncio WHERE ID = "AN005";

-- Consultar Anuncio
SELECT Titulo_Anuncio, Descripcion_Anuncio, Enlace_Anuncio, Fecha_Anuncio, Aula_Nombre
FROM Anuncio
INNER JOIN Aula ON Anuncio.aula_id = Aula.ID;


-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Boletin ----------

-- Crear Boletin
INSERT INTO Boletin(ID, Titulo_Boletin, Sede, Anio, Resolucion, Institucion, alumno_id, periodo_id) Values
    ('B031', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-001', 'Colegio San Martín', 'E020', 'PR004'),
	('B032', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-001', 'Colegio San Martín', 'E021', 'PR003');
    
INSERT INTO Boletin_Nota(ID, nota_Final_id, valoracion_id, boletin_id) Values
    ('BN061', 'CF003', 'V001','B031'),
    ('BN062', 'CF004', 'V002','B032');
    
INSERT INTO Boletin_Detalle(ID, Puesto, Comportamiento, Observaciones, profesor_id, boletin_id) Values
	('BD031',1, 'Excelente', 'Buen desempeño académico.', 	'P008','B031'),
	('BD032',2, 'Bueno', 'Debe mejorar la participación.', 	'P007','B032');

-- Modificar Boletin
UPDATE Boletin SET Titulo_Boletin = "boletin modificado" WHERE ID = "B031";
UPDATE Boletin SET Institucion = "colegio modificado" WHERE ID = "B032";

-- Eliminar Boletin
DELETE FROM Boletin WHERE ID = "B004";
DELETE FROM Boletin WHERE ID = "B005";

-- Consultar Boletin
SELECT Titulo_Boletin, Sede, Anio, Resolucion, Institucion, periodo_id, Usuario.Primer_Nombre AS Alumno_Nombre, Usuario.Segundo_Nombre AS Alumno_Segundo_Nombre, Nota_Final, Nombre_Valoracion, Puesto, Comportamiento, Observaciones, a.Primer_Nombre AS Profesor_Nombre, a.Segundo_Nombre AS Profesor_Segundo_Nombre, Boletin.ID AS boletin_id
FROM Boletin
INNER JOIN Usuario ON Boletin.alumno_id = Usuario.ID
INNER JOIN Periodo ON Boletin.periodo_id = Periodo.ID
INNER JOIN Boletin_Nota ON Boletin.ID = Boletin_Nota.boletin_id
INNER JOIN Nota_Final ON Boletin_Nota.nota_Final_id = Nota_Final.ID
INNER JOIN Valoracion ON Boletin_Nota.valoracion_id = Valoracion.ID
INNER JOIN Boletin_Detalle ON Boletin.ID = Boletin_Detalle.boletin_id
INNER JOIN Usuario a ON Boletin_Detalle.profesor_id = a.ID;


-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Notas ----------

-- Crear Notas 
INSERT INTO Nota_Trabajo(ID, Nota, trabajo_id, usuario_id) Values
	('CT121', 4.5, 'T031', 'E030'),
    ('CT122', 3.8, 'T032', 'E030');
    
INSERT INTO Nota_Final(ID, Nota_Final, Inasistencias, materia_id, logro_id, usuario_id) Values
	('CF061', 4.50, 2, 'M005', 'LG001', 'E006'),
	('CF062', 3.80, 1, 'M006', 'LG002', 'E006');
    
-- Modificar Notas
UPDATE Nota_Trabajo SET Nota = 4.44 WHERE ID = "CT001";
UPDATE Nota_Trabajo SET Nota = 2.34 WHERE ID = "CT002";

UPDATE Nota_Final SET Nota_Final = 5.0 WHERE ID = "CF001";
UPDATE Nota_Final SET Inasistencias = 3 WHERE ID = "CF002";

-- Eliminar Notas
DELETE FROM Nota_Trabajo WHERE ID = "CT004";
DELETE FROM Nota_Trabajo WHERE ID = "CT006";

DELETE FROM Nota_Trabajo WHERE ID = "CF007";
DELETE FROM Nota_Trabajo WHERE ID = "CF008";

-- Consultar Notas
SELECT Primer_Nombre, Primer_Apellido, Nota, trabajo_id
FROM Nota_Trabajo
LEFT JOIN Usuario ON Nota_Trabajo.usuario_id = Usuario.ID
LEFT JOIN Trabajo ON Nota_Trabajo.trabajo_id = Trabajo.ID;

SELECT Primer_Nombre, Primer_Apellido, Nota_Final, Inasistencias, materia_id, logro_id
FROM Nota_Final
LEFT JOIN Usuario ON Nota_Final.usuario_id = Usuario.ID
LEFT JOIN Materia ON Nota_Final.materia_id = Materia.ID
LEFT JOIN Logro ON Nota_Final.logro_id = Logro.ID;


-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Materias ----------

-- Crear Materia
INSERT INTO Materia(ID, Materia_Nombre, Descripcion_Materia) Values
	('M011', 'Tecnologia', 'estudio de la tecnologia'),
	('M012', 'Prototipos', 'Diseño y construccion de prototipos tecnologicos');
    
-- Modificar Materia
UPDATE Materia SET Materia_Nombre = "Mecanica" WHERE ID = "M007";
UPDATE Materia SET Materia_Nombre = "Fisica" WHERE ID = "M003";

-- Eliminar Materia
DELETE FROM Materia WHERE ID = "M008";
DELETE FROM Materia WHERE ID = "M009";

-- Consultar Notas
SELECT * FROM Materia;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Grados ----------

-- Crear Grados
INSERT INTO Grado(ID, Grado_Nombre) Values
	('G12', 'doce'),
	('G13', 'trece');

-- Modificar Materia
UPDATE Grado SET Grado_Nombre = "quince" WHERE ID = "G01";
UPDATE Grado SET Grado_Nombre = "catorce" WHERE ID = "G02";

-- Eliminar Materia
DELETE FROM Grado WHERE ID = "G04";
DELETE FROM Grado WHERE ID = "G05";

-- Consultar Notas
SELECT * FROM Grado;


-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ---------- Planillas ----------

-- Crear Planilla
INSERT INTO Planilla(ID, Planilla_Nombre, periodo_id) Values
	('PL009', 'Planilla curso 101', 'PR001'),
    ('PL010', 'Planilla curso 301', 'PR002');
    
INSERT INTO Nota_Planilla(ID, nota_final_id, curso_id, planilla_id) Values
	('N061', 'CF059', 'Q0101M', 'PL009'),
	('N062', 'CF060', 'Q0101M', 'PL010');
    
-- Modificar Planilla
UPDATE Planilla SET Planilla_Nombre = "101 planilla" WHERE ID = "PL001";
UPDATE Planilla SET Planilla_Nombre = "301 planilla" WHERE ID = "PL002";

-- Eliminar Planilla
DELETE FROM Planilla WHERE ID = "PL006";
DELETE FROM Planilla WHERE ID = "PL007";

-- Consultar Planilla
SELECT Planilla_Nombre, periodo_id, Primer_Nombre, Primer_Apellido, Nota_Final, Materia_Nombre, Curso_Nombre, planilla_id
FROM Planilla
LEFT JOIN Periodo ON Planilla.periodo_id = Periodo.ID
LEFT JOIN Nota_Planilla ON Planilla.ID = Nota_Planilla.planilla_id
LEFT JOIN Nota_final ON Nota_Planilla.nota_final_id = Nota_final.ID
LEFT JOIN Curso ON Nota_Planilla.curso_id = Curso.ID
LEFT JOIN Usuario ON Nota_final.usuario_id = Usuario.ID
LEFT JOIN Materia ON Nota_final.materia_id = Materia.ID

