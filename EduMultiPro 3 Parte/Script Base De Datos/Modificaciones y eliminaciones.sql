-- Modificaciones

UPDATE Curso
SET Curso_Nombre = '102'
WHERE ID = 'Q0101M';

UPDATE Usuario
SET rol_id = 'R002'
WHERE ID = '3';

UPDATE Curso
SET grado_id = 'G02'
WHERE ID = 'Q0501M';

UPDATE Materia
SET Materia_Nombre = 'Matemáticas Avanzadas'
WHERE ID = 'M001';

UPDATE Informacion
SET Correo2 = 'secundario@email.com'
WHERE ID = '5';

UPDATE Informacion
SET Contacto2 = '555-9876'
WHERE ID = '6';

UPDATE Periodo
SET Nombre_Periodo = 'Segundo Periodo 2025'
WHERE ID = '2';

UPDATE Anuncio
SET Titulo_Anuncio = 'Examen Final de Física'
WHERE ID = '4';

UPDATE Nota_Final
SET Nota_Final = 4.5
WHERE ID = '3';

UPDATE Tipo_Noticia
SET Tipo = 'Deportes'
WHERE ID = '3';

SELECT * FROM Curso;
SELECT * FROM Usuario;
SELECT * FROM Materia;
SELECT * FROM Informacion;
SELECT * FROM Periodo;
SELECT * FROM Anuncio;
SELECT * FROM Nota_Final;
SELECT * FROM Tipo_Noticia;

-- Eliminaciones

DELETE FROM Curso
WHERE ID = 'Q0101M';

DELETE FROM Usuario
WHERE ID = '8';

DELETE FROM Materia
WHERE ID = 'M004';

DELETE FROM Anuncio
WHERE ID = '6';

DELETE FROM Trabajo
WHERE ID = '7';

DELETE FROM Nota_Trabajo
WHERE ID = '5';

DELETE FROM Boletin
WHERE ID = '2';

DELETE FROM Boletin_Detalle
WHERE ID = '3';

DELETE FROM Valoracion
WHERE ID = '5';

DELETE FROM Noticia
WHERE ID = '4';

SELECT * FROM Curso;
SELECT * FROM Usuario;
SELECT * FROM Materia;
SELECT * FROM Anuncio;
SELECT * FROM Trabajo;
SELECT * FROM Nota_Trabajo;
SELECT * FROM Boletin;
SELECT * FROM Boletin_Detalle;
SELECT * FROM Valoracion;
SELECT * FROM Noticia;