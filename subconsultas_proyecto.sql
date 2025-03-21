-- 1) Obtener el nombre y correo de los usuarios que pertenecen a un curso específico
SELECT u.Primer_Nombre, u.Primer_Apellido, i.Correo1 
FROM Usuario u 
JOIN Informacion i ON u.informacion_id = i.ID
WHERE u.ID IN (
    SELECT usuario_id FROM Miembros_Curso WHERE curso_id = 'C001'
);

-- 2) Obtener los nombres de los alumnos que tienen boletines generados
SELECT Primer_Nombre, Primer_Apellido 
FROM Usuario 
WHERE ID IN (
    SELECT alumno_id FROM Boletin);

-- 3) Obtener los nombres de los cursos en los que está inscrito un alumno específico
SELECT Curso_Nombre 
FROM Curso 
WHERE ID IN (
    SELECT curso_id FROM Miembros_Curso WHERE usuario_id = 'U123'
);

-- 4) Obtener los títulos de trabajos asignados en un aula específica
SELECT Titulo_Trabajo 
FROM Trabajo 
WHERE aula_id = (
    SELECT ID FROM Aula WHERE curso_id = 'C003'
);

-- 5) Obtener el nombre de los profesores que tienen asignado un horario en un curso específico
SELECT Primer_Nombre, Primer_Apellido 
FROM Usuario 
WHERE ID IN (
    SELECT profesor_id FROM Horario_Curso WHERE curso_id = 'C001'
);

-- 6)  Mostrar los alumnos que han presentado trabajos en un aula específica
SELECT Primer_Nombre, Primer_Apellido 
FROM Usuario 
WHERE ID IN (
    SELECT usuario_id FROM Nota_Trabajo WHERE trabajo_id IN (
        SELECT ID FROM Trabajo WHERE aula_id = 'A001'
    )
);

-- 7) Obtener los títulos de los trabajos asignados en un aula donde el profesor es un usuario específico
SELECT Titulo_Trabajo 
FROM Trabajo 
WHERE aula_id IN (
    SELECT ID FROM Aula WHERE usuario_id = 'U001'
);

-- 8) Obtener los nombres de los estudiantes que han sido evaluados en una materia específica
SELECT Primer_Nombre, Primer_Apellido 
FROM Usuario 
WHERE ID IN (
    SELECT usuario_id FROM Nota_Final WHERE materia_id = 'M001'
);

-- 9) Obtener los alumnos que tienen más de un contacto registrado en su información personal
SELECT Primer_Nombre, Primer_Apellido 
FROM Usuario 
WHERE informacion_id IN (
    SELECT ID FROM Informacion WHERE Contacto2 IS NOT NULL
);

-- 10) Obtener los nombres de los alumnos que han sido evaluados en el periodo actual
SELECT Primer_Nombre, Primer_Apellido 
FROM Usuario 
WHERE ID IN (
    SELECT usuario_id FROM Nota_Final WHERE ID IN (
        SELECT nota_final_id FROM Nota_Planilla WHERE planilla_id IN (
            SELECT ID FROM Planilla WHERE periodo_id = 'P001'
        )
    )
);