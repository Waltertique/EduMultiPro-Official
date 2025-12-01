-- 1) Obtener los nombres de los estudiantes que pertenecen a un curso específico
SELECT Primer_Nombre, Primer_Apellido FROM Usuario 
WHERE curso_id = 'C001';

-- 2) Mostrar los trabajos asignados a un aula específica
SELECT Titulo_Trabajo, Fecha_Trabajo 
FROM Trabajo 
WHERE aula_id = 'A001';

-- 3) Obtener los nombres de los estudiantes que han recibido una evaluación específica
SELECT Primer_Nombre, Primer_Apellido FROM Usuario 
WHERE ID IN (SELECT usuario_id FROM Nota_Final WHERE logro_id = 'L002');

-- 4) Obtener la lista de los usuarios ordenados alfabéticamente por apellido
SELECT Primer_Nombre, Primer_Apellido 
FROM Usuario 
ORDER BY Primer_Apellido ASC;

-- 5) Contar cuántos alumnos hay por cada curso
SELECT curso_id, COUNT(*) AS Total_Alumnos 
FROM Miembros_Curso 
GROUP BY curso_id;

-- 6) Mostrar las fechas de los trabajos más recientes
SELECT Titulo_Trabajo, Fecha_Trabajo 
FROM Trabajo 
ORDER BY Fecha_Trabajo DESC 
LIMIT 5;

-- 7) Mostrar el promedio de notas finales por materia
SELECT materia_id, AVG(Nota_Final) AS Promedio_Notas 
FROM Nota_Final 
GROUP BY materia_id;

-- 8) Obtener los estudiantes con la menor cantidad de insistencias
SELECT usuario_id, Inasistencias 
FROM Nota_Final 
ORDER BY Inasistencias ASC 
LIMIT 5;

-- 9)  Obtener la lista de los usuarios ordenados alfabéticamente por apellido
SELECT Primer_Nombre, Primer_Apellido 
FROM Usuario 
ORDER BY Primer_Apellido ASC;

-- 10) Obtener la cantidad de anuncios publicados en cada aula
SELECT aula_id, COUNT(*) AS Total_Anuncios 
FROM Anuncio 
GROUP BY aula_id;