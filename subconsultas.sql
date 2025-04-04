-- SUBCONSULTAS (10)
-- 1. Obtener la materia con la calificación más alta
SELECT Nombre FROM Materia WHERE idMateria = (SELECT idMateria FROM Calificacion WHERE Nota = (SELECT MAX(Nota) FROM Calificacion));

-- 2. Obtener el nombre del usuario con la nota más baja
SELECT Primer_Nombre FROM Usuario WHERE idUsuario = (SELECT idUsuario FROM Calificacion WHERE Nota = (SELECT MIN(Nota) FROM Calificacion));

-- 3. Obtener el curso de un usuario específico
SELECT GradoJornada FROM Curso WHERE idCurso = (SELECT idCurso FROM Miembros_Curso WHERE idUsuario = 1 LIMIT 1);

-- 4. Obtener la nota de un usuario específico
SELECT Nota FROM Calificacion WHERE idUsuario = (SELECT idUsuario FROM Usuario WHERE Primer_Nombre = 'Juan');

-- 5. Obtener la cantidad de estudiantes en un curso específico
SELECT COUNT(*) FROM Usuario WHERE idUsuario IN (SELECT idUsuario FROM Miembros_Curso WHERE idCurso = 2);

-- 6. Obtener los cursos en los que está inscrito un usuario
SELECT Nombre FROM Curso WHERE idCurso IN (SELECT idCurso FROM Miembros_Curso WHERE idUsuario = 3);

-- 7. Obtener el usuario con la nota promedio más alta
SELECT Primer_Nombre FROM Usuario WHERE idUsuario = (SELECT idUsuario FROM Calificacion GROUP BY idUsuario ORDER BY AVG(Nota) DESC LIMIT 1);

-- 8. Obtener la noticia más reciente
SELECT Titulo FROM Noticia WHERE Fecha = (SELECT MAX(Fecha) FROM Noticia);

-- 9. Obtener la materia con la nota promedio más baja
SELECT Nombre FROM Materia WHERE idMateria = (SELECT idMateria FROM Calificacion GROUP BY idMateria ORDER BY AVG(Nota) ASC LIMIT 1);

-- 10. Obtener el boletín de un usuario específico
SELECT Nombre FROM Boletin WHERE idBoletin = (SELECT idBoletin FROM Boletin_Alumno WHERE idUsuario = 1);
