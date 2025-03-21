-- SUB CONSULTAS

-- 1) Mostrar el nombre del curso y la cantidad de usuarios que tiene cada curso
	SELECT Curso_Nombre,
    (SELECT COUNT(*) 
     FROM Usuario 
     WHERE Usuario.curso_id = Curso.ID) AS Total_Usuarios
	FROM Curso;

-- 2) Mostrar el nombre de cada usuario y su nota final más alta
	SELECT Primer_Nombre, Primer_Apellido,
    (SELECT MAX(Nota_Final)
     FROM Nota_Final
     WHERE Nota_Final.usuario_id = Usuario.ID) AS Mejor_Nota_Final
	FROM Usuario;

--  3) Mostrar los usuarios que tienen al menos un boletín
	SELECT Primer_Nombre, Primer_Apellido
	FROM Usuario
	WHERE ID IN (
	SELECT alumno_id
    FROM Boletin);

--  4) Listar los cursos que tienen aulas 
	SELECT Curso_Nombre
	FROM Curso
	WHERE EXISTS (
    SELECT 1
    FROM Aula
    WHERE Aula.curso_id = Curso.ID);
    
-- 5) curso con el ID más alto
	SELECT Curso_Nombre
	FROM Curso
	WHERE ID = (
    SELECT MAX(ID)
    FROM Curso);
    
-- 6) nombres de los anuncios donde esta el trabajo T001
	SELECT Titulo_Anuncio
	FROM Anuncio
	WHERE aula_id = (
    SELECT aula_id
    FROM Trabajo
    WHERE ID = 'T001');
    
-- 7) materias que están asignadas a la misma aula que el anuncio AN002
	SELECT Materia_Nombre
	FROM Materia
	WHERE ID = (
    SELECT materia_id
    FROM Aula
    WHERE ID = (
        SELECT aula_id
        FROM Anuncio
        WHERE ID = 'AN002'));

-- 8) nombres de los usuarios que tienen notas finales superiores a 4.0
	SELECT Primer_Nombre, Primer_Apellido
	FROM Usuario
	WHERE ID IN (
    SELECT usuario_id
    FROM Nota_Final
    WHERE Nota_Final > 4.0);

-- 9) nombre del usuario que tiene la calificación más baja 
	SELECT Primer_Nombre, Primer_Apellido
	FROM Usuario
	WHERE ID = (
    SELECT usuario_id
    FROM Nota_Final
    ORDER BY Nota_Final ASC
    LIMIT 1);
    
-- 10) títulos de los trabajos que pertenecen al aula con el nombre: Aula Educación Física 501
	SELECT Titulo_Trabajo
    FROM Trabajo
	WHERE aula_id = (
    SELECT ID
    FROM Aula
    WHERE Aula_Nombre = 'Aula Educación Física 501');
    
    -- Consultas con Joins

-- 1) Usuario con su Informacion

SELECT Primer_Nombre, Primer_Apellido, Correo1, Correo2, Contacto1, Contacto2, Fecha_Nacimiento
FROM Usuario
INNER JOIN Informacion ON informacion_id = 	Informacion.ID;

-- 2) Curso y su Horario

SELECT Curso_Nombre, Titulo_Horario, Imagen_Horario, Descripcion_Horario
FROM Curso 
INNER JOIN Horario_Curso ON Curso.ID = Horario_Curso.curso_id
INNER JOIN Horario ON Horario_Curso.horario_id = Horario.ID;

-- 3) Curso y sus Integrantes

SELECT Curso_Nombre, Primer_Nombre, Primer_Apellido
FROM Curso
INNER JOIN Miembros_Curso ON Curso.ID = Miembros_Curso.curso_id
INNER JOIN Usuario ON Miembros_Curso.usuario_id = Usuario.ID;

-- 4) Aulas con sus Anuncios y Trabajos

SELECT DISTINCT Aula_Nombre, Titulo_Trabajo, Descripcion_Trabajo, Titulo_Anuncio, Descripcion_Anuncio
FROM Aula
INNER JOIN Trabajo ON Aula.ID = Trabajo.aula_id
INNER JOIN Anuncio ON Aula.ID = Anuncio.aula_id;


-- 5) Usuario sus materias vistas y sus Nota Final

SELECT Primer_Nombre, Primer_Apellido, Materia_Nombre,  Nota_Final
FROM Usuario
INNER JOIN Nota_Final ON Usuario.ID = Nota_Final.usuario_id
INNER JOIN Materia ON Nota_Final.materia_id = Materia.ID
ORDER BY Primer_Nombre ASC;

-- 6) Planillas y los integrantes que la conforman

SELECT DISTINCT Planilla_Nombre, Primer_Nombre, Primer_Apellido
FROM Planilla
INNER JOIN Nota_Planilla ON Planilla.ID = Nota_Planilla.planilla_id
INNER JOIN Nota_Final ON Nota_Planilla.nota_final_id = Nota_Final.ID
INNER JOIN Usuario ON Nota_Final.usuario_id = Usuario.ID;

-- 7) Usuario Boletin y su Periodo

SELECT Primer_Nombre, Primer_Apellido, Titulo_Boletin, Nombre_Periodo
FROM Usuario
INNER JOIN Boletin ON Usuario.ID = Boletin.alumno_id
INNER JOIN Periodo ON Boletin.periodo_id = Periodo.ID;

-- 8) Usuario y su Rol

SELECT Primer_Nombre, Primer_Apellido, Nombre_Rol
FROM Usuario
INNER JOIN Rol ON Usuario.rol_id = Rol.ID;

-- 9) Boletin y Boletin Detalles

SELECT Titulo_Boletin, Sede, Anio, Resolucion, Institucion, Primer_Nombre, Primer_Apellido, Puesto, Comportamiento, Observaciones
FROM Boletin 
INNER JOIN Usuario ON Boletin.alumno_id = Usuario.ID
INNER JOIN Boletin_Detalle ON Boletin.ID = Boletin_Detalle.boletin_id;

-- 10) Noticia y su Tipo

SELECT Titulo_Noticia, Descripcion, Fecha_Notica, Imagen1, Imagen2, Imagen3, Tipo
FROM Noticia 
INNER JOIN Tipo_Noticia ON Noticia.tipo_noticia_id = Tipo_Noticia.ID;

