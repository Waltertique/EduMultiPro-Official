-- 1) Contar la cantidad de alumnos en cada jornada
SELECT Jornada.Jornada_Nombre, COUNT(Usuario.ID) AS Total_Alumnos 
FROM Usuario 
JOIN Curso ON Usuario.curso_id = Curso.ID 
JOIN Jornada ON Curso.jornada_id = Jornada.ID 
GROUP BY Jornada.Jornada_Nombre;

-- 2) Obtener los boletines de un estudiante específico
SELECT Boletin.Titulo_Boletin, Boletin.Anio, Periodo.Nombre_Periodo 
FROM Boletin 
JOIN Periodo ON Boletin.periodo_id = Periodo.ID 
WHERE alumno_id = 'U001';

-- 3) Obtener los nombres de los estudiantes que han presentado trabajos
SELECT DISTINCT Usuario.Primer_Nombre, Usuario.Primer_Apellido 
FROM Usuario 
JOIN Nota_Trabajo ON Usuario.ID = Nota_Trabajo.usuario_id;

-- 4) Obtener los nombres y correos de los estudiantes junto con su curso
SELECT Usuario.Primer_Nombre, Usuario.Primer_Apellido, Informacion.Correo1, Curso.Curso_Nombre
FROM Usuario 
JOIN Informacion ON Usuario.informacion_id = Informacion.ID
JOIN Curso ON Usuario.curso_id = Curso.ID;

-- 5) Listar los nombres de los cursos con su respectivo grado
SELECT Curso.Curso_Nombre, Grado.Grado_Nombre 
FROM Curso 
JOIN Grado ON Curso.grado_id = Grado.ID;

-- 6) Listar los nombres de los profesores y las materias que enseñan
SELECT Usuario.Primer_Nombre, Usuario.Primer_Apellido, Materia.Materia_Nombre 
FROM Usuario 
JOIN Aula ON Usuario.ID = Aula.usuario_id 
JOIN Materia ON Aula.materia_id = Materia.ID;

-- 7)  Listar las materias asignadas a cada curso
SELECT Curso.Curso_Nombre, Materia.Materia_Nombre 
FROM Aula 
JOIN Curso ON Aula.curso_id = Curso.ID 
JOIN Materia ON Aula.materia_id = Materia.ID;

-- 8) Obtener los logros asociados a cada estudiante
SELECT Usuario.Primer_Nombre, Usuario.Primer_Apellido, Logro.Tipo_Logro 
FROM Nota_Final 
JOIN Logro ON Nota_Final.logro_id = Logro.ID 
JOIN Usuario ON Nota_Final.usuario_id = Usuario.ID;

-- 9) Listar los estudiantes que aún no han entregado un trabajo específico
SELECT Usuario.PrimerNombre, Usuario.PrimerApellido
FROM Usuario
JOIN UsuarioCurso ON Usuario.ID = UsuarioCurso.Usuario_ID
LEFT JOIN CalificacionTrabajo ON Usuario.ID = CalificacionTrabajo.Alumno_ID 
    AND CalificacionTrabajo.Trabajo_ID = 2
WHERE Usuario.Rol_ID = 1 
AND CalificacionTrabajo.ID IS NULL;

-- 10)  Obtener los nombres de los estudiantes que han recibido anuncios en su aula
SELECT DISTINCT Usuario.Primer_Nombre, Usuario.Primer_Apellido 
FROM Usuario 
JOIN Aula ON Usuario.ID = Aula.usuario_id
JOIN Anuncio ON Aula.ID = Anuncio.aula_id;