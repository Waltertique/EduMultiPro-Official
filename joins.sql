-- JOINS (10)
-- 1. Obtener usuarios con su rol
SELECT Usuario.Primer_Nombre, Usuario.Primer_Apellido, Rol.Nombre 
FROM Usuario 
JOIN Rol ON Usuario.idRol = Rol.idRol;

-- 2. Obtener los cursos de cada usuario
SELECT Usuario.Primer_Nombre, Curso.GradoJornada 
FROM Usuario 
JOIN Miembros_Curso ON Usuario.idUsuario = Miembros_Curso.idUsuario 
JOIN Curso ON Miembros_Curso.idCurso = Curso.idCurso;

-- 3. Obtener materias y las notas de los estudiantes
SELECT Materia.Nombre, Calificacion.Nota 
FROM Materia 
JOIN Calificacion ON Materia.idMateria = Calificacion.idMateria;

-- 4. Obtener noticias y su tipo
SELECT Noticia.Titulo, Tipo_Noticia.Tipo 
FROM Noticia 
JOIN Tipo_Noticia ON Noticia.idTipoNoticia = Tipo_Noticia.idTipoNoticia;

-- 5. Obtener horarios y los cursos asignados
SELECT Horario.DiaSemana, Curso.GradoJornada 
FROM Horario 
JOIN Horario_Curso ON Horario.idHorario = Horario_Curso.idHorario 
JOIN Curso ON Horario_Curso.idCurso = Curso.idCurso;

-- 6. Obtener aulas y los trabajos asignados
SELECT Aula.Aula, Trabajo.Titulo 
FROM Aula 
JOIN Aula_Contenido ON Aula.idAula = Aula_Contenido.idAula 
JOIN Trabajo ON Aula_Contenido.idTrabajo = Trabajo.idTrabajo;

-- 7. Obtener boletines y los estudiantes asociados
SELECT Boletin.Nombre, Usuario.Primer_Nombre 
FROM Boletin 
JOIN Boletin_Alumno ON Boletin.idBoletin = Boletin_Alumno.idBoletin 
JOIN Usuario ON Boletin_Alumno.idUsuario = Usuario.idUsuario;

-- 8. Obtener cursos y materias asignadas
SELECT Curso.GradoJornada, Materia.Nombre 
FROM Curso 
JOIN Materia ON Curso.idCurso = Materia.idMateria;

-- 9. Obtener usuarios y los boletines a los que están asociados
SELECT Usuario.Primer_Nombre, Boletin.Nombre 
FROM Usuario 
JOIN Boletin_Alumno ON Usuario.idUsuario = Boletin_Alumno.idUsuario 
JOIN Boletin ON Boletin_Alumno.idBoletin = Boletin.idBoletin;

-- 10. Obtener profesores con los cursos que imparten
SELECT Usuario.Primer_Nombre, Curso.GradoJornada 
FROM Usuario 
JOIN Curso ON Usuario.idUsuario = Curso.idCurso 
WHERE Usuario.idRol = 2;
