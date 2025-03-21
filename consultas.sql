-- CONSULTAS SIMPLES (10)
-- 1. Obtener todos los usuarios registrados
SELECT * FROM Usuario;

-- 2. Obtener nombres y apellidos de los usuarios que son estudiantes
SELECT Primer_Nombre, Primer_Apellido FROM Usuario WHERE idRol = 1;

-- 3. Obtener todos los cursos disponibles
SELECT * FROM Curso;

-- 4. Obtener todas las materias que comienzan con 'Matem'
SELECT * FROM Materia WHERE Nombre LIKE 'Matem%';

-- 5. Obtener calificaciones mayores a 3.0
SELECT * FROM Calificacion WHERE Nota > 3.0;

-- 6. Obtener noticias publicadas después del 1 de enero de 2025
SELECT * FROM Noticia WHERE Fecha > '2025-01-01';

-- 7. Contar la cantidad total de usuarios registrados
SELECT COUNT(*) AS Total_Usuarios FROM Usuario;

-- 8. Contar la cantidad total de cursos registrados
SELECT COUNT(*) AS Total_Cursos FROM Curso;

-- 9. Obtener los boletines del año 2025
SELECT * FROM Boletin
 WHERE Año = 2025;

-- 10. Obtener trabajos cuyo título contiene la palabra 'Ensayo'
SELECT * FROM Trabajo 
WHERE Titulo LIKE '%Ensayo%';
