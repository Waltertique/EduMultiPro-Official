INSERT INTO Rol(ID, Nombre_Rol) Values
	('R001','Alumno'),
    ('R002','Profesor'),
    ('R003','Coordinador');
    
INSERT INTO Documento(ID, Tipo_Documento) Values
	('D001','T.Identidad'),
    ('D002','Cedula'),
    ('D003','Cedula de extangeria');
    
INSERT INTO Informacion(ID, Correo1, Correo2, Contacto1, Contacto2, Fecha_Nacimiento) Values
	('I001', 'juan01@gmail.com', 'juan.alt01@gmail.com', '3111111111', '3201111111', '1990-01-15'),
	('I002', 'maria02@gmail.com', 'maria.alt02@gmail.com', '3122222222', '3212222222', '1988-05-22'),
	('I003', 'pedro03@gmail.com', 'pedro.alt03@gmail.com', '3133333333', '3223333333', '1995-07-10'),
	('I004', 'laura04@gmail.com', 'laura.alt04@gmail.com', '3144444444', '3234444444', '1992-12-01'),
	('I005', 'carlos05@gmail.com', 'carlos.alt05@gmail.com', '3155555555', '3245555555', '1985-09-18'),
	('I006', 'ana06@gmail.com', 'ana.alt06@gmail.com', '3166666666', '3256666666', '1993-03-12'),
	('I007', 'jose07@gmail.com', 'jose.alt07@gmail.com', '3177777777', '3267777777', '1997-08-27'),
	('I008', 'sofia08@gmail.com', 'sofia.alt08@gmail.com', '3188888888', '3278888888', '1991-11-09'),
	('I009', 'david09@gmail.com', 'david.alt09@gmail.com', '3199999999', '3289999999', '1989-06-14'),
	('I010', 'paula10@gmail.com', 'paula.alt10@gmail.com', '3101010101', '3291010101', '1994-02-20'),

	('I011', 'lucas11@gmail.com', 'lucas.alt11@gmail.com', '3111111112', '3201111112', '2008-04-05'),
	('I012', 'valeria12@gmail.com', 'valeria.alt12@gmail.com', '3122222223', '3212222223', '2010-07-22'),
	('I013', 'diego13@gmail.com', 'diego.alt13@gmail.com', '3133333334', '3223333334', '2009-01-30'),
	('I014', 'camila14@gmail.com', 'camila.alt14@gmail.com', '3144444445', '3234444445', '2011-10-11'),
	('I015', 'andres15@gmail.com', 'andres.alt15@gmail.com', '3155555556', '3245555556', '2012-03-25'),
	('I016', 'natalia16@gmail.com', 'natalia.alt16@gmail.com', '3166666667', '3256666667', '2008-05-18'),
	('I017', 'sergio17@gmail.com', 'sergio.alt17@gmail.com', '3177777778', '3267777778', '2013-09-29'),
	('I018', 'carolina18@gmail.com', 'carolina.alt18@gmail.com', '3188888889', '3278888889', '2010-12-03'),
	('I019', 'felipe19@gmail.com', 'felipe.alt19@gmail.com', '3199999900', '3289999900', '2009-02-28'),
	('I020', 'daniela20@gmail.com', 'daniela.alt20@gmail.com', '3101010111', '3291010111', '2011-08-06'),

	('I021', 'sebastian21@gmail.com', 'sebastian.alt21@gmail.com', '3111111122', '3201111122', '2008-03-17'),
	('I022', 'andrea22@gmail.com', 'andrea.alt22@gmail.com', '3122222233', '3212222233', '2010-06-26'),
	('I023', 'oscar23@gmail.com', 'oscar.alt23@gmail.com', '3133333344', '3223333344', '2011-09-15'),
	('I024', 'alejandra24@gmail.com', 'alejandra.alt24@gmail.com', '3144444455', '3234444455', '2012-04-08'),
	('I025', 'enrique25@gmail.com', 'enrique.alt25@gmail.com', '3155555566', '3245555566', '2013-12-21'),
	('I026', 'karen26@gmail.com', 'karen.alt26@gmail.com', '3166666677', '3256666677', '2014-01-03'),
	('I027', 'manuel27@gmail.com', 'manuel.alt27@gmail.com', '3177777788', '3267777788', '2015-05-12'),
	('I028', 'isabela28@gmail.com', 'isabela.alt28@gmail.com', '3188888899', '3278888899', '2016-07-19'),
	('I029', 'martin29@gmail.com', 'martin.alt29@gmail.com', '3199999000', '3289999000', '2017-11-02'),
	('I030', 'juliana30@gmail.com', 'juliana.alt30@gmail.com', '3101010122', '3291010122', '2018-03-23'),

	('I031', 'leonardo31@gmail.com', 'leonardo.alt31@gmail.com', '3111111133', '3201111133', '2010-06-10'),
	('I032', 'ximena32@gmail.com', 'ximena.alt32@gmail.com', '3122222244', '3212222244', '2011-09-29'),
	('I033', 'brayan33@gmail.com', 'brayan.alt33@gmail.com', '3133333355', '3223333355', '2012-01-14'),
	('I034', 'nataly34@gmail.com', 'nataly.alt34@gmail.com', '3144444466', '3234444466', '2013-08-05'),
	('I035', 'ricardo35@gmail.com', 'ricardo.alt35@gmail.com', '3155555577', '3245555577', '2014-02-17'),
	('I036', 'monica36@gmail.com', 'monica.alt36@gmail.com', '3166666688', '3256666688', '2015-04-24'),
	('I037', 'santiago37@gmail.com', 'santiago.alt37@gmail.com', '3177777799', '3267777799', '2016-11-30'),
	('I038', 'victoria38@gmail.com', 'victoria.alt38@gmail.com', '3188888800', '3278888800', '2017-01-07'),
	('I039', 'hugo39@gmail.com', 'hugo.alt39@gmail.com', '3199999011', '3289999011', '2018-05-13'),
	('I040', 'estefania40@gmail.com', 'estefania.alt40@gmail.com', '3101010133', '3291010133', '2019-12-25');
    
INSERT INTO Grado(ID, Grado_Nombre) Values
	('G01', 'Primero'),
	('G02', 'Segundo'),
    ('G03', 'Tercero'),
    ('G04', 'Cuarto'),
    ('G05', 'Quinto'),
    ('G06', 'Sexto'),
    ('G07', 'Septimo'),
    ('G08', 'Obtavo'),
    ('G09', 'Noveno'),
    ('G10', 'Decimo'),
    ('G11', 'Once');
    
INSERT INTO Jornada(ID, Jornada_Nombre) Values
	('J01', 'Mañana'),
    ('J02', 'Tarde'),
    ('J03', 'Mixto');
    
INSERT INTO Horario(ID, Titulo_Horario, Imagen_Horario, Descripcion_Horario) Values
	('H001', 'Horario Primero', 'imagenes/horario_primero.png', 'Horario académico del grado primero para el año 2025. Incluye materias básicas y actividades lúdicas.'),
	('H002', 'Horario Tercero', 'imagenes/horario_tercero.png', 'Horario académico del grado tercero, con énfasis en lectura comprensiva y matemáticas.'),
	('H003', 'Horario Quinto', 'imagenes/horario_quinto.png', 'Horario académico del grado quinto, con materias de ciencias naturales y sociales reforzadas.'),
	('H004', 'Horario Sexto', 'imagenes/horario_sexto.png', 'Horario académico del grado sexto, inicio de secundaria básica con materias obligatorias y talleres.'),
	('H005', 'Horario Séptimo', 'imagenes/horario_septimo.png', 'Horario académico del grado séptimo, incluye introducción a la tecnología y proyectos colaborativos.'),
	('H006', 'Horario Noveno', 'imagenes/horario_noveno.png', 'Horario académico del grado noveno, incluye asignaturas avanzadas y orientación vocacional.'),
	('H007', 'Horario Décimo', 'imagenes/horario_decimo.png', 'Horario académico del grado décimo, prepara a los estudiantes para pruebas de estado y competencias técnicas.'),
	('H008', 'Horario Once', 'imagenes/horario_once.png', 'Horario académico del grado once, incluye énfasis en formación preuniversitaria y preparación para la vida laboral.');
    
INSERT INTO Materia(ID, Materia_Nombre, Descripcion_Materia) Values
	('M001', 'Matemáticas', 'Estudia los números, las operaciones y las estructuras matemáticas básicas.'),
	('M002', 'Lengua Castellana', 'Desarrolla habilidades en comprensión lectora, ortografía, gramática y redacción.'),
	('M003', 'Ciencias Naturales', 'Explora conceptos fundamentales de la biología, química y física.'),
	('M004', 'Ciencias Sociales', 'Analiza la historia, la geografía y la formación ciudadana.'),
	('M005', 'Inglés', 'Desarrolla la comprensión y comunicación en el idioma inglés.'),
	('M006', 'Educación Física', 'Fomenta la actividad física, el deporte y los hábitos de vida saludable.'),
	('M007', 'Tecnología e Informática', 'Estudia el uso de herramientas tecnológicas y la alfabetización digital.'),
	('M008', 'Ética y Valores', 'Promueve los principios éticos, morales y la convivencia ciudadana.'),
	('M009', 'Religión', 'Aborda el conocimiento de las religiones y el respeto a la diversidad cultural.'),
	('M010', 'Artes', 'Desarrolla la creatividad a través de la música, la danza, la pintura y otras expresiones artísticas.');
    
INSERT INTO Logro(ID, Tipo_Logro) Values
	('LG001', 'Puntualidad Ejemplar'),
	('LG002', 'Respeto Constante'),
	('LG003', 'Actitud Positiva'),
	('LG004', 'Colaborador del Mes'),
	('LG005', 'Trabajo en Equipo'),
	('LG006', 'Responsabilidad Académica'),
	('LG007', 'Resolución Pacífica de Conflictos'),
	('LG008', 'Empatía Destacada'),
	('LG009', 'Liderazgo en el Aula'),
	('LG010', 'Esfuerzo y Superación');
    
INSERT INTO Valoracion(ID, Nombre_Valoracion) Values
	('V001', 'Superior'),
	('V002', 'Alta'),
	('V003', 'Basico'),
	('V004', 'Baja');
    
INSERT INTO Periodo(ID, Nombre_Periodo) Values
	('PR001', 'Primer Periodo'),
	('PR002', 'Segundo Periodo'),
	('PR003', 'Tercer Periodo'),
	('PR004', 'Cuarto Periodo');
    
INSERT INTO Tipo_Noticia(ID, Tipo) Values
	('NT001', 'Noticia Principal 1'),
	('NT002', 'Noticia Principal 2'),
	('NT003', 'Noticia Principal 3'),
	('NT004', 'Noticia Secundaria 1'),
    ('NT005', 'Noticia Secundaria 2'),
    ('NT006', 'Noticia Secundaria 3');
    
INSERT INTO Curso(ID, Curso_Nombre, grado_id, jornada_id) Values
	('Q0101M', '101', 'G01','J01'),
	('Q0301M', '301', 'G03','J01'),
	('Q0501M', '501', 'G05','J01'),
	('Q0601T', '601', 'G06','J02'),
	('Q0701T', '701', 'G07','J02'),
	('Q0901T', '901', 'G09','J02'),
    ('Q1001X', '1001', 'G10','J03'),
    ('Q1101X', '1101', 'G11','J03');

INSERT INTO Usuario(ID, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, rol_id, documento_id, curso_id, informacion_id) Values
	('C001', 'Juan', 'Alberto', 'Pérez', 'Gómez', 'R003', 'D002', NULL, 'I001'),
	('C002', 'Maria', 'Elena', 'Rodríguez', 'López', 'R003', 'D002', null, 'I002'),
	('P001', 'Pedro', 'Antonio', 'García', 'Martínez', 'R002', 'D002', 'Q0101M', 'I003'),
	('P002', 'Laura', 'Isabel', 'Hernández', 'Ramírez', 'R002', 'D002', 'Q0301M', 'I004'),
	('P003', 'Carlos', 'Andrés', 'Torres', 'Moreno', 'R002', 'D002', 'Q0501M', 'I005'),
	('P004', 'Ana', 'Lucía', 'Ruiz', 'Ortiz', 'R002', 'D002', 'Q0601T', 'I006'),
	('P005', 'Jose', 'Manuel', 'Morales', 'Jiménez', 'R002', 'D002', 'Q0701T', 'I007'),
	('P006', 'Sofia', 'Alejandra', 'Suárez', 'Paredes', 'R002', 'D003', 'Q0901T', 'I008'),
	('P007', 'David', 'Enrique', 'Castro', 'Rivas', 'R002', 'D003', 'Q1001X', 'I009'),
	('P008', 'Paula', 'Andrea', 'Mendoza', 'Vargas', 'R002', 'D003', 'Q1101X', 'I010'),

	('E001', 'Lucas', 'Mateo', 'Reyes', 'Córdoba', 'R001', 'D001', 'Q1101X', 'I011'),
	('E002', 'Valeria', 'Sofía', 'Silva', 'Carrillo', 'R001', 'D001', 'Q1001X', 'I012'),
	('E003', 'Diego', 'Esteban', 'Castaño', 'Delgado', 'R001', 'D001', 'Q1001X', 'I013'),
	('E004', 'Camila', 'Gabriela', 'Cruz', 'Salazar', 'R001', 'D001', 'Q0901T', 'I014'),
	('E005', 'Andres', 'Felipe', 'Pineda', 'Barrios', 'R001', 'D001', 'Q0601T', 'I015'),
	('E006', 'Natalia', 'Lorena', 'Rojas', 'Peña', 'R001', 'D001', 'Q1101X', 'I016'),
	('E007', 'Sergio', 'Alejandro', 'Peñaloza', 'Navarro', 'R001', 'D001', 'Q0601T', 'I017'),
	('E008', 'Carolina', 'Fernanda', 'Gómez', 'Quintero', 'R001', 'D001', 'Q0901T', 'I018'),
	('E009', 'Felipe', 'Alonso', 'Vargas', 'Maldonado', 'R001', 'D001', 'Q1001X', 'I019'),
	('E010', 'Daniela', 'Patricia', 'Mejía', 'Castillo', 'R001', 'D001', 'Q0701T', 'I020'),

	('E011', 'Sebastian', 'Iván', 'Ortiz', 'Velásquez', 'R001', 'D001', 'Q1101X', 'I021'),
	('E012', 'Andrea', 'Milena', 'Fernández', 'Rosales', 'R001', 'D001', 'Q0901T', 'I022'),
	('E013', 'Oscar', 'Eduardo', 'Aguilar', 'Padilla', 'R001', 'D001', 'Q0701T', 'I023'),
	('E014', 'Alejandra', 'Juliana', 'Benítez', 'Palacios', 'R001', 'D001', 'Q0701T', 'I024'),
	('E015', 'Enrique', 'Javier', 'León', 'Herrera', 'R001', 'D001', 'Q0601T', 'I025'),
	('E016', 'Karen', 'Tatiana', 'Campos', 'Chávez', 'R001', 'D001', 'Q0501M', 'I026'),
	('E017', 'Manuel', 'Jesús', 'Sánchez', 'Figueroa', 'R001', 'D001', 'Q0501M', 'I027'),
	('E018', 'Isabela', 'María', 'Bautista', 'Gallardo', 'R001', 'D001', 'Q0301M', 'I028'),
	('E019', 'Martin', 'Leandro', 'Arango', 'Bermúdez', 'R001', 'D001', 'Q0301M', 'I029'),
	('E020', 'Juliana', 'Natalia', 'Cárdenas', 'Zapata', 'R001', 'D001', 'Q0101M', 'I030'),

	('E021', 'Leonardo', 'Daniel', 'Valencia', 'Montoya', 'R001', 'D001', 'Q0901T', 'I031'),
	('E022', 'Ximena', 'Carolina', 'Patiño', 'Benavides', 'R001', 'D001', 'Q0701T', 'I032'),
	('E023', 'Brayan', 'Adrián', 'Nieto', 'Escobar', 'R001', 'D001', 'Q0601T', 'I033'),
	('E024', 'Nataly', 'Estefanía', 'Palma', 'Cuellar', 'R001', 'D001', 'Q0501M', 'I034'),
	('E025', 'Ricardo', 'Samuel', 'Barrera', 'Sierra', 'R001', 'D001', 'Q0501M', 'I035'),
	('E026', 'Monica', 'Patricia', 'Delgado', 'Acosta', 'R001', 'D001', 'Q0301M', 'I036'),
	('E027', 'Santiago', 'Emilio', 'Mora', 'Arenas', 'R001', 'D001', 'Q0301M', 'I037'),
	('E028', 'Victoria', 'Luciana', 'Estupiñán', 'Cadavid', 'R001', 'D001', 'Q0101M', 'I038'),
	('E029', 'Hugo', 'Francisco', 'Marín', 'Correa', 'R001', 'D001', 'Q0101M', 'I039'),
	('E030', 'Estefania', 'Paola', 'Guzmán', 'Roldán', 'R001', 'D001', 'Q0101M', 'I040');
    
INSERT INTO Miembros_Curso(usuario_id, curso_id) Values
	('P001', 'Q0101M'),
	('P002', 'Q0301M'),
	('P003', 'Q0501M'),
	('P004', 'Q0601T'),
	('P005', 'Q0701T'),
	('P006', 'Q0901T'),
	('P007', 'Q1001X'),
	('P008', 'Q1101X'),

	('E001', 'Q1101X'),
	('E002', 'Q1001X'),
	('E003', 'Q1001X'),
	('E004', 'Q0901T'),
	('E005', 'Q0601T'),
	('E006', 'Q1101X'),
	('E007', 'Q0601T'),
	('E008', 'Q0901T'),
	('E009', 'Q1001X'),
	('E010', 'Q0701T'),

	('E011', 'Q1101X'),
	('E012', 'Q0901T'),
	('E013', 'Q0701T'),
	('E014', 'Q0701T'),
	('E015', 'Q0601T'),
	('E016', 'Q0501M'),
	('E017', 'Q0501M'),
	('E018', 'Q0301M'),
	('E019', 'Q0301M'),
	('E020', 'Q0101M'),

	('E021', 'Q0901T'),
	('E022', 'Q0701T'),
	('E023', 'Q0601T'),
	('E024', 'Q0501M'),
	('E025', 'Q0501M'),
	('E026', 'Q0301M'),
	('E027', 'Q0301M'),
	('E028', 'Q0101M'),
	('E029', 'Q0101M'),
	('E030', 'Q0101M');
    
INSERT INTO Horario_Curso(ID, horario_id, profesor_id, curso_id) Values

	('HC001','H001', null, 'Q0101M'),
	('HC002','H002', null, 'Q0301M'),
	('HC003','H003', null, 'Q0501M'),
	('HC004','H004', null, 'Q0601T'),
	('HC005','H005', null, 'Q0701T'),
    ('HC006','H006', null, 'Q0901T'),
    ('HC007','H007', null, 'Q1001X'),
    ('HC008','H008', null, 'Q1101X');
    
INSERT INTO Aula(ID, Aula_Nombre, materia_id, usuario_id, curso_id) Values
	('A001', 'Aula Matemáticas 101', 'M001', 'P001', 'Q0101M'),
    ('A002', 'Aula Lengua Castellana 101', 'M002', 'P002', 'Q0101M'),
    ('A003', 'Aula Ciencias Naturales 301', 'M003', 'P003', 'Q0301M'),
    ('A004', 'Aula Ciencias Sociales 301', 'M004', 'P004', 'Q0301M'),
    ('A005', 'Aula Inglés 501', 'M005', 'P005', 'Q0501M'),
    ('A006', 'Aula Educación Física 501', 'M006', 'P006', 'Q0501M'),
    ('A007', 'Aula Tecnología 601', 'M007', 'P007', 'Q0601T'),
    ('A008', 'Aula Ética 601', 'M008', 'P008', 'Q0601T'),
    ('A009', 'Aula Religión 701', 'M009', 'P001', 'Q0701T'),
    ('A010', 'Aula Artes 701', 'M010', 'P002', 'Q0701T'),
    ('A011', 'Aula Matemáticas 901', 'M001', 'P003', 'Q0901T'),
    ('A012', 'Aula Lengua Castellana 901', 'M002', 'P004', 'Q0901T'),
    ('A013', 'Aula Ciencias Naturales 1001', 'M003', 'P005', 'Q1001X'),
    ('A014', 'Aula Ciencias Sociales 1001', 'M004', 'P006', 'Q1001X'),
    ('A015', 'Aula Inglés 1101', 'M005', 'P007', 'Q1101X'),
    ('A016', 'Aula Educación Física 1101', 'M009', 'P008', 'Q1101X');
    
INSERT INTO Anuncio(ID, Titulo_Anuncio, Descripcion_Anuncio, Enlace_Anuncio, Fecha_Anuncio, aula_id) Values
	-- Matemáticas
	('AN001', 'Examen de Matemáticas - Primer Parcial', 'Se realizará el primer examen parcial el día lunes. Temas: álgebra básica.', 'https://colegio.edu/anuncios/matematicas1', '2025-03-20','A001'),
	('AN002', 'Guía de Estudio Matemáticas', 'Disponible la guía de ejercicios para preparar el examen. Descargar aquí.', 'https://colegio.edu/guias/matematicas1', '2025-03-18','A001'),

	-- Lengua Castellana
	('AN003', 'Entrega de Ensayo - Lengua Castellana', 'Recordatorio: el ensayo de literatura debe entregarse el viernes antes de las 5 p.m.', 'https://colegio.edu/anuncios/castellana1', '2025-03-22','A002'),
	('AN004', 'Nueva Lectura Obligatoria', 'Se ha asignado el libro "Cien años de soledad" para el próximo mes.', 'https://colegio.edu/libros/castellana1', '2025-03-19','A002'),

	-- Ciencias Naturales
	('AN005', 'Práctica de Laboratorio - Ciencias Naturales', 'Actividad práctica de biología sobre el sistema digestivo el miércoles.', 'https://colegio.edu/anuncios/naturales1', '2025-03-23','A003'),
	('AN006', 'Resultados del Taller de Química', 'Revisa tus resultados del taller práctico subidos a la plataforma.', 'https://colegio.edu/resultados/naturales1', '2025-03-25','A003'),

	-- Ciencias Sociales
	('AN007', 'Debate sobre Historia Universal', 'Organización del debate sobre las guerras mundiales en el aula 3.', 'https://colegio.edu/anuncios/sociales1', '2025-03-21','A004'),
	('AN008', 'Taller de Geografía', 'Participa en el taller interactivo de geografía este viernes.', 'https://colegio.edu/talleres/sociales1', '2025-03-20','A004'),

	-- Inglés
	('AN009', 'Examen de Inglés - Verbos Irregulares', 'Evaluación escrita sobre los verbos irregulares el próximo jueves.', 'https://colegio.edu/anuncios/ingles1', '2025-03-24','A005'),
	('AN010', 'Club de Conversación en Inglés', 'Únete al club de conversación los sábados a las 10 a.m.', 'https://colegio.edu/clubs/ingles1', '2025-03-26','A005'),

	-- Educación Física
	('AN011', 'Competencia de Atletismo', 'Se convoca a la competencia anual de atletismo. Inscripciones abiertas.', 'https://colegio.edu/eventos/edufisica1', '2025-03-27','A006'),
	('AN012', 'Clase Especial de Yoga', 'Clase de yoga para mejorar la flexibilidad y concentración.', 'https://colegio.edu/clases/edufisica1', '2025-03-29','A006'),

	-- Tecnología e Informática
	('AN013', 'Taller de Programación en Scratch', 'Aprende los conceptos básicos de programación visual.', 'https://colegio.edu/talleres/tecnologia1', '2025-03-28','A007'),
	('AN014', 'Concurso de Robótica', 'Participa en el concurso de robótica intercolegial.', 'https://colegio.edu/concursos/tecnologia1', '2025-04-01','A007'),

	-- Ética y Valores
	('AN015', 'Foro de Valores Humanos', 'Discusión sobre respeto y responsabilidad ciudadana.', 'https://colegio.edu/foros/etica1', '2025-03-30','A008'),
	('AN016', 'Campaña de Solidaridad', 'Jornada para recaudar alimentos no perecederos.', 'https://colegio.edu/campanas/etica1', '2025-04-02','A008'),

	-- Religión
	('AN017', 'Encuentro Ecuménico', 'Invitación al encuentro interreligioso por la paz.', 'https://colegio.edu/eventos/religion1', '2025-04-03','A009'),
	('AN018', 'Reflexión de Semana Santa', 'Actividades de reflexión y espiritualidad en la Semana Santa.', 'https://colegio.edu/actividades/religion1', '2025-04-05','A009'),

	-- Artes
	('AN019', 'Exposición de Pintura', 'Presentación de las obras realizadas en el taller de arte.', 'https://colegio.edu/exposiciones/artes1', '2025-04-06','A010'),
	('AN020', 'Clase Magistral de Música', 'Sesión especial sobre composición y técnica musical.', 'https://colegio.edu/clases/artes1', '2025-04-08','A010'),
    
    -- Matemáticas 2
	('AN021', 'Examen de Matemáticas - Primer Parcial', 'Se realizará el primer examen parcial el día lunes. Temas: álgebra básica.', 'https://colegio.edu/anuncios/matematicas1', '2025-03-20','A011'),
	('AN022', 'Guía de Estudio Matemáticas', 'Disponible la guía de ejercicios para preparar el examen. Descargar aquí.', 'https://colegio.edu/guias/matematicas1', '2025-03-18','A011'),

	-- Lengua Castellana 2
	('AN023', 'Entrega de Ensayo - Lengua Castellana', 'Recordatorio: el ensayo de literatura debe entregarse el viernes antes de las 5 p.m.', 'https://colegio.edu/anuncios/castellana1', '2025-03-22','A012'),
	('AN024', 'Nueva Lectura Obligatoria', 'Se ha asignado el libro "Cien años de soledad" para el próximo mes.', 'https://colegio.edu/libros/castellana1', '2025-03-19','A012'),

	-- Ciencias Naturales 2
	('AN025', 'Práctica de Laboratorio - Ciencias Naturales', 'Actividad práctica de biología sobre el sistema digestivo el miércoles.', 'https://colegio.edu/anuncios/naturales1', '2025-03-23','A013'),
	('AN026', 'Resultados del Taller de Química', 'Revisa tus resultados del taller práctico subidos a la plataforma.', 'https://colegio.edu/resultados/naturales1', '2025-03-25','A013'),

	-- Ciencias Sociales 2
	('AN027', 'Debate sobre Historia Universal', 'Organización del debate sobre las guerras mundiales en el aula 3.', 'https://colegio.edu/anuncios/sociales1', '2025-03-21','A014'),
	('AN028', 'Taller de Geografía', 'Participa en el taller interactivo de geografía este viernes.', 'https://colegio.edu/talleres/sociales1', '2025-03-20','A014'),

	-- Inglés 2
	('AN029', 'Examen de Inglés - Verbos Irregulares', 'Evaluación escrita sobre los verbos irregulares el próximo jueves.', 'https://colegio.edu/anuncios/ingles1', '2025-03-24','A015'),
	('AN030', 'Club de Conversación en Inglés', 'Únete al club de conversación los sábados a las 10 a.m.', 'https://colegio.edu/clubs/ingles1', '2025-03-26','A015'),

	-- Educación Física 2
	('AN031', 'Competencia de Atletismo', 'Se convoca a la competencia anual de atletismo. Inscripciones abiertas.', 'https://colegio.edu/eventos/edufisica1', '2025-03-27','A016'),
	('AN032', 'Clase Especial de Yoga', 'Clase de yoga para mejorar la flexibilidad y concentración.', 'https://colegio.edu/clases/edufisica1', '2025-03-29','A016');
    
INSERT INTO Trabajo(ID, Tema_Trabajo, Titulo_Trabajo, Descripcion_Trabajo, Fecha_Trabajo, Archivo_Trabajo, aula_id) Values
	-- Matemáticas																				
	('T001', 'Álgebra Básica', 'Ejercicios de Ecuaciones', 'Resuelve las ecuaciones lineales planteadas en la guía.', '2025-04-10', 'archivos/matematicas_ecuaciones.pdf','A001'),
	('T002', 'Geometría', 'Construcción de Figuras Geométricas', 'Dibuja y explica las propiedades de las figuras solicitadas.', '2025-04-15', 'archivos/matematicas_geometria.pdf','A001'),

	-- Lengua Castellana
	('T003', 'Ensayo Literario', 'Análisis de Obra', 'Escribe un ensayo sobre el realismo mágico en "Cien años de soledad".', '2025-04-12', 'archivos/castellana_ensayo.docx','A002'),
	('T004', 'Gramática', 'Taller de Ortografía', 'Completa los ejercicios de tildación y puntuación.', '2025-04-18', 'archivos/castellana_ortografia.pdf','A002'),

	-- Ciencias Naturales
	('T005', 'Biología', 'Informe de Laboratorio - Células', 'Redacta un informe del laboratorio sobre observación de células.', '2025-04-20', 'archivos/naturales_celulas.docx','A003'),
	('T006', 'Física', 'Proyecto de Movimiento', 'Expón el proyecto sobre las leyes de Newton en un cartel explicativo.', '2025-04-22', 'archivos/naturales_movimiento.pdf','A003'),

	-- Ciencias Sociales
	('T007', 'Historia', 'Línea de Tiempo de la Segunda Guerra Mundial', 'Elabora una línea de tiempo con los eventos más relevantes.', '2025-04-17', 'archivos/sociales_historia.pdf','A004'),
	('T008', 'Geografía', 'Mapa Político de América', 'Dibuja un mapa político actualizado de América.', '2025-04-24', 'archivos/sociales_geografia.jpg','A004'),

	-- Inglés
	('T009', 'Reading Comprehension', 'Book Report', 'Elabora un reporte sobre el libro leído en inglés.', '2025-04-19', 'archivos/ingles_bookreport.docx','A005'),
	('T010', 'Grammar Practice', 'Taller de Verbos Irregulares', 'Resuelve los ejercicios de verbos irregulares.', '2025-04-23', 'archivos/ingles_verbos.pdf','A005'),

	-- Educación Física
	('T011', 'Aptitud Física', 'Bitácora de Ejercicio', 'Registra tus actividades físicas durante una semana.', '2025-04-21', 'archivos/edufisica_bitacora.docx','A006'),
	('T012', 'Deportes', 'Reglamento del Fútbol', 'Investiga y presenta el reglamento oficial de la FIFA.', '2025-04-26', 'archivos/edufisica_futbol.pdf','A006'),

	-- Tecnología e Informática
	('T013', 'Programación', 'Proyecto en Scratch', 'Crea un videojuego educativo en Scratch y adjunta el archivo.', '2025-04-25', 'archivos/tecnologia_scratch.sb3','A007'),
	('T014', 'Internet Seguro', 'Presentación sobre Ciberseguridad', 'Diseña una presentación sobre cómo proteger la información personal en línea.', '2025-04-28', 'archivos/tecnologia_ciberseguridad.pptx','A007'),

	-- Ética y Valores
	('T015', 'Respeto y Tolerancia', 'Reflexión Personal', 'Escribe un ensayo sobre la importancia del respeto en la convivencia.', '2025-04-27', 'archivos/etica_reflexion.docx','A008'),
	('T016', 'Solidaridad', 'Proyecto Comunitario', 'Presenta una propuesta para realizar una campaña de ayuda social.', '2025-04-30', 'archivos/etica_proyecto.pdf','A008'),

	-- Religión
	('T017', 'Historia de las Religiones', 'Investigación sobre el Cristianismo', 'Investiga el origen y expansión del cristianismo.', '2025-04-29', 'archivos/religion_cristianismo.docx','A009'),
	('T018', 'Valores Espirituales', 'Reflexión sobre la Fe', 'Redacta una reflexión personal sobre la fe en tiempos difíciles.', '2025-05-02', 'archivos/religion_reflexion.docx','A009'),

	-- Artes
	('T019', 'Pintura', 'Obra Inspirada en el Renacimiento', 'Realiza una pintura inspirada en los artistas del Renacimiento.', '2025-05-01', 'archivos/artes_pintura.jpg','A010'),
	('T020', 'Música', 'Composición Musical', 'Compón una melodía corta e incluye la partitura.', '2025-05-03', 'archivos/artes_musica.pdf','A010'),
    
    -- Matemáticas 2
	('T021', 'Álgebra Básica', 'Ejercicios de Ecuaciones', 'Resuelve las ecuaciones lineales planteadas en la guía.', '2025-04-10', 'archivos/matematicas_ecuaciones.pdf','A011'),
	('T022', 'Geometría', 'Construcción de Figuras Geométricas', 'Dibuja y explica las propiedades de las figuras solicitadas.', '2025-04-15', 'archivos/matematicas_geometria.pdf','A011'),

	-- Lengua Castellana 2
	('T023', 'Ensayo Literario', 'Análisis de Obra', 'Escribe un ensayo sobre el realismo mágico en "Cien años de soledad".', '2025-04-12', 'archivos/castellana_ensayo.docx','A012'),
	('T024', 'Gramática', 'Taller de Ortografía', 'Completa los ejercicios de tildación y puntuación.', '2025-04-18', 'archivos/castellana_ortografia.pdf','A012'),

	-- Ciencias Naturales 2
	('T025', 'Biología', 'Informe de Laboratorio - Células', 'Redacta un informe del laboratorio sobre observación de células.', '2025-04-20', 'archivos/naturales_celulas.docx','A013'),
	('T026', 'Física', 'Proyecto de Movimiento', 'Expón el proyecto sobre las leyes de Newton en un cartel explicativo.', '2025-04-22', 'archivos/naturales_movimiento.pdf','A013'),

	-- Ciencias Sociales 2
	('T027', 'Historia', 'Línea de Tiempo de la Segunda Guerra Mundial', 'Elabora una línea de tiempo con los eventos más relevantes.', '2025-04-17', 'archivos/sociales_historia.pdf','A014'),
	('T028', 'Geografía', 'Mapa Político de América', 'Dibuja un mapa político actualizado de América.', '2025-04-24', 'archivos/sociales_geografia.jpg','A014'),

	-- Inglés 2
	('T029', 'Reading Comprehension', 'Book Report', 'Elabora un reporte sobre el libro leído en inglés.', '2025-04-19', 'archivos/ingles_bookreport.docx','A015'),
	('T030', 'Grammar Practice', 'Taller de Verbos Irregulares', 'Resuelve los ejercicios de verbos irregulares.', '2025-04-23', 'archivos/ingles_verbos.pdf','A015'),

	-- Educación Física 2
	('T031', 'Aptitud Física', 'Bitácora de Ejercicio', 'Registra tus actividades físicas durante una semana.', '2025-04-21', 'archivos/edufisica_bitacora.docx','A016'),
	('T032', 'Deportes', 'Reglamento del Fútbol', 'Investiga y presenta el reglamento oficial de la FIFA.', '2025-04-26', 'archivos/edufisica_futbol.pdf','A016');
    
INSERT INTO Nota_Trabajo(ID, Nota, trabajo_id, usuario_id) Values
	
	('CT001', 4.5, 'T001', 'E030'),
    ('CT002', 3.8, 'T002', 'E030'),
    ('CT003', 1.2, 'T003', 'E030'),
    ('CT004', 5.0, 'T004', 'E030'),
    
	('CT005', 4.0, 'T001', 'E029'),
	('CT006', 2.3, 'T002', 'E029'),
	('CT007', 3.7, 'T003', 'E029'),
	('CT008', 4.8, 'T004', 'E029'),

	('CT009', 3.5, 'T001', 'E020'),
	('CT010', 1.6, 'T002', 'E020'),
	('CT011', 5.1, 'T003', 'E020'),
	('CT012', 3.9, 'T004', 'E020'),

	('CT013', 1.7, 'T001', 'E028'),
	('CT014', 3.8, 'T002', 'E028'),
	('CT015', 2.4, 'T003', 'E028'),
	('CT016', 4.0, 'T004', 'E028'),

	('CT017', 3.6, 'T005', 'E019'),
	('CT018', 1.9, 'T006', 'E019'),
	('CT019', 4.2, 'T007', 'E019'),
	('CT020', 5.1, 'T008', 'E019'),

	('CT021', 4.0, 'T005', 'E027'),
	('CT022', 3.7, 'T006', 'E027'),
	('CT023', 1.8, 'T007', 'E027'),
	('CT024', 4.3, 'T008', 'E027'),

	('CT025', 4.4, 'T005', 'E018'),
	('CT026', 2.1, 'T006', 'E018'),
	('CT027', 3.9, 'T007', 'E018'),
	('CT028', 4.5, 'T008', 'E018'),

	('CT029', 3.8, 'T005', 'E026'),
	('CT030', 4.6, 'T006', 'E026'),
	('CT031', 2.0, 'T007', 'E026'),
	('CT032', 5.2, 'T008', 'E026'),

	('CT033', 4.7, 'T009', 'E017'),
	('CT034', 3.9, 'T010', 'E017'),
	('CT035', 1.1, 'T011', 'E017'),
	('CT036', 5.3, 'T012', 'E017'),

	('CT037', 3.6, 'T009', 'E025'),
	('CT038', 4.8, 'T010', 'E025'),
	('CT039', 2.2, 'T011', 'E025'),
	('CT040', 4.0, 'T012', 'E025'),

	('CT041', 1.9, 'T009', 'E016'),
	('CT042', 4.1, 'T010', 'E016'),
	('CT043', 5.3, 'T011', 'E016'),
	('CT044', 4.7, 'T012', 'E016'),

	('CT045', 3.8, 'T009', 'E024'),
	('CT046', 2.4, 'T010', 'E024'),
	('CT047', 3.5, 'T011', 'E024'),
	('CT048', 1.0, 'T012', 'E024'),

	('CT049', 3.9, 'T013', 'E015'),
	('CT050', 4.2, 'T014', 'E015'),
	('CT051', 5.8, 'T015', 'E015'),
	('CT052', 1.1, 'T016', 'E015'),

	('CT053', 2.3, 'T013', 'E007'),
	('CT054', 3.7, 'T014', 'E007'),
	('CT055', 4.9, 'T015', 'E007'),
	('CT056', 1.4, 'T016', 'E007'),

	('CT057', 4.6, 'T013', 'E023'),
	('CT058', 2.0, 'T014', 'E023'),
	('CT059', 3.8, 'T015', 'E023'),
	('CT060', 4.1, 'T016', 'E023'),

	('CT061', 4.7, 'T013', 'E005'),
	('CT062', 3.9, 'T014', 'E005'),
	('CT063', 2.3, 'T015', 'E005'),
	('CT064', 1.5, 'T016', 'E005'),

	('CT065', 4.2, 'T017', 'E014'),
	('CT066', 2.6, 'T018', 'E014'),
	('CT067', 3.8, 'T019', 'E014'),
	('CT068', 1.4, 'T020', 'E014'),

	('CT069', 1.0, 'T017', 'E022'),
	('CT070', 5.1, 'T018', 'E022'),
	('CT071', 4.9, 'T019', 'E022'),
	('CT072', 3.7, 'T020', 'E022'),

	('CT073', 2.5, 'T017', 'E013'),
	('CT074', 4.3, 'T018', 'E013'),
	('CT075', 1.1, 'T019', 'E013'),
	('CT076', 3.8, 'T020', 'E013'),

	('CT077', 2.2, 'T017', 'E010'),
	('CT078', 4.4, 'T018', 'E010'),
	('CT079', 5.0, 'T019', 'E010'),
	('CT080', 4.7, 'T020', 'E010'),

	('CT081', 4.3, 'T001', 'E004'),
	('CT082', 3.9, 'T002', 'E004'),
	('CT083', 4.1, 'T003', 'E004'),
	('CT084', 4.8, 'T004', 'E004'),

	('CT085', 3.7, 'T001', 'E021'),
	('CT086', 4.5, 'T002', 'E021'),
	('CT087', 4.2, 'T003', 'E021'),
	('CT088', 4.6, 'T004', 'E021'),

	('CT089', 4.0, 'T001', 'E012'),
	('CT090', 4.3, 'T002', 'E012'),
	('CT091', 3.8, 'T003', 'E012'),
	('CT092', 4.9, 'T004', 'E012'),

	('CT093', 4.1, 'T001', 'E008'),
	('CT094', 4.4, 'T002', 'E008'),
	('CT095', 3.9, 'T003', 'E008'),
	('CT096', 4.5, 'T004', 'E008'),

	('CT097', 4.6, 'T005', 'E002'),
	('CT098', 2.0, 'T006', 'E002'),
	('CT099', 5.2, 'T007', 'E002'),
	('CT100', 3.8, 'T008', 'E002'),

	('CT101', 1.3, 'T005', 'E009'),
	('CT102', 4.7, 'T006', 'E009'),
	('CT103', 2.1, 'T007', 'E009'),
	('CT104', 3.9, 'T008', 'E009'),

	('CT105', 4.4, 'T005', 'E003'),
	('CT106', 3.5, 'T006', 'E003'),
	('CT107', 5.2, 'T007', 'E003'),
	('CT108', 1.0, 'T008', 'E003'),

	('CT109', 4.8, 'T009', 'E011'),
	('CT110', 3.7, 'T010', 'E011'),
	('CT111', 4.3, 'T011', 'E011'),
	('CT112', 4.1, 'T012', 'E011'),
    
	('CT113', 4.6, 'T009', 'E006'),
	('CT114', 4.2, 'T010', 'E006'),
	('CT115', 3.8, 'T011', 'E006'),
	('CT116', 4.5, 'T012', 'E006'),

	('CT117', 4.9, 'T009', 'E001'),
	('CT118', 4.3, 'T010', 'E001'),
	('CT119', 4.1, 'T011', 'E001'),
	('CT120', 3.9, 'T012', 'E001');
    
INSERT INTO Nota_Final(ID, Nota_Final, Inasistencias, materia_id, logro_id, usuario_id) Values

	('CF001', 4.50, 2, 'M005', 'LG001', 'E001'),
	('CF002', 3.80, 1, 'M006', 'LG002', 'E001'),

	('CF003', 4.20, 0, 'M003', 'LG003', 'E002'),
	('CF004', 3.90, 3, 'M004', 'LG004', 'E002'),

	('CF005', 2.95, 5, 'M003', 'LG005', 'E003'),
	('CF006', 3.40, 2, 'M004', 'LG006', 'E003'),

	('CF007', 4.70, 1, 'M001', 'LG007', 'E004'),
	('CF008', 3.95, 0, 'M002', 'LG008', 'E004'),

	('CF009', 3.60, 4, 'M007', 'LG009', 'E005'),
	('CF010', 4.30, 1, 'M008', 'LG010', 'E005'),

	('CF011', 4.85, 3, 'M005', 'LG001', 'E006'),
	('CF012', 3.70, 0, 'M006', 'LG002', 'E006'),

	('CF013', 2.80, 2, 'M007', 'LG003', 'E007'),
	('CF014', 4.20, 1, 'M008', 'LG004', 'E007'),

	('CF015', 3.95, 4, 'M001', 'LG005', 'E008'),
	('CF016', 3.10, 3, 'M002', 'LG006', 'E008'),

	('CF017', 4.40, 0, 'M003', 'LG007', 'E009'),
	('CF018', 3.85, 1, 'M004', 'LG008', 'E009'),

	('CF019', 3.30, 3, 'M009', 'LG009', 'E010'),
	('CF020', 4.55, 1, 'M010', 'LG010', 'E010'),

	('CF021', 4.90, 0, 'M005', 'LG001', 'E011'),
	('CF022', 4.30, 2, 'M006', 'LG002', 'E011'),
                               
	('CF023', 3.55, 1, 'M001', 'LG003', 'E012'),
	('CF024', 4.00, 3, 'M002', 'LG004', 'E012'),
                               
	('CF025', 2.75, 5, 'M009', 'LG005', 'E013'),
	('CF026', 3.80, 1, 'M010', 'LG006', 'E013'),
                               
	('CF027', 4.50, 2, 'M009', 'LG007', 'E014'),
	('CF028', 4.90, 0, 'M010', 'LG008', 'E014'),
                               
	('CF029', 3.10, 4, 'M007', 'LG009', 'E015'),
	('CF030', 3.00, 2, 'M008', 'LG010', 'E015'),

	('CF031', 4.60, 1, 'M005', 'LG001', 'E016'),
	('CF032', 4.05, 0, 'M006', 'LG002', 'E016'),
                               
	('CF033', 3.80, 3, 'M005', 'LG003', 'E017'),
	('CF034', 3.50, 1, 'M006', 'LG004', 'E017'),
                               
	('CF035', 2.85, 5, 'M003', 'LG005', 'E018'),
	('CF036', 3.65, 2, 'M004', 'LG006', 'E018'),
                               
	('CF037', 4.40, 1, 'M003', 'LG007', 'E019'),
	('CF038', 4.55, 0, 'M004', 'LG008', 'E019'),
                               
	('CF039', 3.35, 3, 'M001', 'LG009', 'E020'),
	('CF040', 4.10, 1, 'M002', 'LG010', 'E020'),

	('CF041', 4.15, 2, 'M001', 'LG001', 'E021'),
	('CF042', 4.00, 3, 'M002', 'LG002', 'E021'),
                               
	('CF043', 3.65, 4, 'M009', 'LG003', 'E022'),
	('CF044', 2.90, 2, 'M010', 'LG004', 'E022'),
                               
	('CF045', 4.95, 0, 'M007', 'LG005', 'E023'),
	('CF046', 4.25, 1, 'M008', 'LG006', 'E023'),
                               
	('CF047', 3.45, 5, 'M005', 'LG007', 'E024'),
	('CF048', 3.80, 2, 'M006', 'LG008', 'E024'),
                               
	('CF049', 4.10, 1, 'M005', 'LG009', 'E025'),
	('CF050', 4.50, 0, 'M006', 'LG010', 'E025'),

	('CF051', 3.95, 2, 'M003', 'LG001', 'E026'),
	('CF052', 4.20, 1, 'M004', 'LG002', 'E026'),
                               
	('CF053', 3.00, 4, 'M003', 'LG003', 'E027'),
	('CF054', 3.85, 3, 'M004', 'LG004', 'E027'),
                               
	('CF055', 4.65, 0, 'M001', 'LG005', 'E028'),
	('CF056', 4.30, 2, 'M002', 'LG006', 'E028'),
                               
	('CF057', 3.75, 3, 'M001', 'LG007', 'E029'),
	('CF058', 3.60, 1, 'M002', 'LG008', 'E029'),
                               
	('CF059', 4.90, 0, 'M001', 'LG009', 'E030'),
	('CF060', 4.10, 2, 'M002', 'LG010', 'E030');
    
INSERT INTO Planilla(ID, Planilla_Nombre, periodo_id) Values

	('PL001', 'Planilla curso 101', 'PR001'),
    ('PL002', 'Planilla curso 301', 'PR002'),
    ('PL003', 'Planilla curso 501', 'PR003'),
    ('PL004', 'Planilla curso 601', 'PR004'),
    ('PL005', 'Planilla curso 701', 'PR001'),
    ('PL006', 'Planilla curso 901', 'PR002'),
    ('PL007', 'Planilla curso 1001', 'PR003'),
    ('PL008', 'Planilla curso 1101', 'PR004');

INSERT INTO Nota_Planilla(ID, nota_final_id, curso_id, planilla_id) Values

	-- Planilla 1
	('N001', 'CF059', 'Q0101M', 'PL001'),
	('N002', 'CF060', 'Q0101M', 'PL001'),
                              
	('N003', 'CF057', 'Q0101M', 'PL001'),
	('N004', 'CF058', 'Q0101M', 'PL001'),
                              
	('N005', 'CF039', 'Q0101M', 'PL001'),
	('N006', 'CF040', 'Q0101M', 'PL001'),
                              
	('N007', 'CF055', 'Q0101M', 'PL001'),
	('N008', 'CF056', 'Q0101M', 'PL001'),
	
    -- Planilla 2
	('N009', 'CF037', 'Q0301M', 'PL002'),
	('N010', 'CF038', 'Q0301M', 'PL002'),
                                 
	('N011', 'CF053', 'Q0301M', 'PL002'),
	('N012', 'CF054', 'Q0301M', 'PL002'),
                                 
	('N013', 'CF035', 'Q0301M', 'PL002'),
	('N014', 'CF036', 'Q0301M', 'PL002'),
                                 
	('N015', 'CF051', 'Q0301M', 'PL002'),
	('N016', 'CF052', 'Q0301M', 'PL002'),
    
	-- Planilla 3
	('N017', 'CF033', 'Q0501M', 'PL003'),
	('N018', 'CF034', 'Q0501M', 'PL003'),
                                 
	('N019', 'CF049', 'Q0501M', 'PL003'),
	('N020', 'CF050', 'Q0501M', 'PL003'),
                                 
	('N021', 'CF031', 'Q0501M', 'PL003'),
	('N022', 'CF032', 'Q0501M', 'PL003'),
                                 
	('N023', 'CF047', 'Q0501M', 'PL003'),
	('N024', 'CF048', 'Q0501M', 'PL003'),
    
	-- Planilla 4
	('N025', 'CF029', 'Q0601T', 'PL004'),
	('N026', 'CF030', 'Q0601T', 'PL004'),
                                 
	('N027', 'CF013', 'Q0601T', 'PL004'),
	('N028', 'CF014', 'Q0601T', 'PL004'),
                                 
	('N029', 'CF045', 'Q0601T', 'PL004'),
	('N030', 'CF046', 'Q0601T', 'PL004'),
                                 
	('N031', 'CF009', 'Q0601T', 'PL004'),
	('N032', 'CF010', 'Q0601T', 'PL004'),

	-- Planilla 5
	('N033', 'CF027', 'Q0701T', 'PL005'),
	('N034', 'CF028', 'Q0701T', 'PL005'),
                                 
	('N035', 'CF043', 'Q0701T', 'PL005'),
	('N036', 'CF044', 'Q0701T', 'PL005'),
                                 
	('N037', 'CF025', 'Q0701T', 'PL005'),
	('N038', 'CF026', 'Q0701T', 'PL005'),
                                 
	('N039', 'CF019', 'Q0701T', 'PL005'),
	('N040', 'CF020', 'Q0701T', 'PL005'),

	-- Planilla 6
	('N041', 'CF007', 'Q0901T', 'PL006'),
	('N042', 'CF008', 'Q0901T', 'PL006'),
                                 
	('N043', 'CF041', 'Q0901T', 'PL006'),
	('N044', 'CF042', 'Q0901T', 'PL006'),
                                 
	('N045', 'CF023', 'Q0901T', 'PL006'),
	('N046', 'CF024', 'Q0901T', 'PL006'),
                                 
	('N047', 'CF015', 'Q0901T', 'PL006'),
	('N048', 'CF016', 'Q0901T', 'PL006'),
    
	-- Planilla 7
	('N049', 'CF003', 'Q1001X', 'PL007'),
	('N050', 'CF004', 'Q1001X', 'PL007'),
                                 
	('N051', 'CF017', 'Q1001X', 'PL007'),
	('N052', 'CF018', 'Q1001X', 'PL007'),
                                 
	('N053', 'CF005', 'Q1001X', 'PL007'),
	('N054', 'CF006', 'Q1001X', 'PL007'),
    
	-- Planilla 8
	('N055', 'CF021', 'Q1101X', 'PL008'),
	('N056', 'CF022', 'Q1101X', 'PL008'),
                                 
	('N057', 'CF011', 'Q1101X', 'PL008'),
	('N058', 'CF012', 'Q1101X', 'PL008'),
                                 
	('N059', 'CF001', 'Q1101X', 'PL008'),
	('N060', 'CF002', 'Q1101X', 'PL008');

INSERT INTO Boletin(ID, Titulo_Boletin, Sede, Anio, Resolucion, Institucion, alumno_id, periodo_id) Values
	
    ('B001', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-001', 'Colegio San Martín', 'E001', 'PR004'),
	('B002', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-001', 'Colegio San Martín', 'E002', 'PR003'),
	('B003', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-001', 'Colegio San Martín', 'E003', 'PR003'),
	('B004', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-001', 'Colegio San Martín', 'E004', 'PR002'),
	('B005', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-002', 'Colegio San Martín', 'E005', 'PR004'),
	('B006', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-002', 'Colegio San Martín', 'E006', 'PR004'),
	('B007', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-002', 'Colegio San Martín', 'E007', 'PR004'),
	('B008', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-002', 'Colegio San Martín', 'E008', 'PR002'),
	('B009', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-003', 'Colegio San Martín', 'E009', 'PR003'),
	('B010', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-003', 'Colegio San Martín', 'E010', 'PR001'),
	('B011', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-003', 'Colegio San Martín', 'E011', 'PR004'),
	('B012', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-003', 'Colegio San Martín', 'E012', 'PR002'),
	('B013', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-004', 'Colegio San Martín', 'E013', 'PR001'),
	('B014', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-004', 'Colegio San Martín', 'E014', 'PR001'),
	('B015', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-004', 'Colegio San Martín', 'E015', 'PR004'),
	('B016', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-004', 'Colegio San Martín', 'E016', 'PR003'),
	('B017', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-005', 'Colegio San Martín', 'E017', 'PR003'),
	('B018', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-005', 'Colegio San Martín', 'E018', 'PR002'),
	('B019', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-005', 'Colegio San Martín', 'E019', 'PR002'),
	('B020', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-005', 'Colegio San Martín', 'E020', 'PR001'),
	('B021', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-006', 'Colegio San Martín', 'E021', 'PR002'),
	('B022', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-006', 'Colegio San Martín', 'E022', 'PR001'),
	('B023', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-006', 'Colegio San Martín', 'E023', 'PR004'),
	('B024', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-006', 'Colegio San Martín', 'E024', 'PR003'),
	('B025', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-007', 'Colegio San Martín', 'E025', 'PR003'),
	('B026', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-007', 'Colegio San Martín', 'E026', 'PR002'),
	('B027', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-007', 'Colegio San Martín', 'E027', 'PR002'),
	('B028', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-007', 'Colegio San Martín', 'E028', 'PR001'),
	('B029', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-008', 'Colegio San Martín', 'E029', 'PR001'),
	('B030', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-008', 'Colegio San Martín', 'E030', 'PR001');
    
INSERT INTO Boletin_Nota(ID, nota_Final_id, valoracion_id, boletin_id) Values
    
    ('BN001', 'CF001', 'V001','B001'),
    ('BN002', 'CF002', 'V002','B001'),

    ('BN003', 'CF003', 'V003','B002'),
    ('BN004', 'CF004', 'V004','B002'),

    ('BN005', 'CF005', 'V001','B003'),
    ('BN006', 'CF006', 'V002','B003'),
                    
    ('BN007', 'CF007', 'V003','B004'),
    ('BN008', 'CF008', 'V004','B004'),

    ('BN009', 'CF009', 'V001','B005'),
    ('BN010', 'CF010', 'V002','B005'),
                    
    ('BN011', 'CF011', 'V003','B006'),
    ('BN012', 'CF012', 'V004','B006'),
 
    ('BN013', 'CF013', 'V001','B007'),
    ('BN014', 'CF014', 'V002','B007'),
                    
    ('BN015', 'CF015', 'V003','B008'),
    ('BN016', 'CF016', 'V004','B008'),

    ('BN017', 'CF017', 'V001','B009'),
    ('BN018', 'CF018', 'V002','B009'),
                    
    ('BN019', 'CF019', 'V003','B010'),
    ('BN020', 'CF020', 'V004','B010'),

    ('BN021', 'CF021', 'V001','B011'),
    ('BN022', 'CF022', 'V002','B011'),
                    
    ('BN023', 'CF023', 'V003','B012'),
    ('BN024', 'CF024', 'V004','B012'),
                  
    ('BN025', 'CF025', 'V001','B013'),
    ('BN026', 'CF026', 'V002','B013'),
                    
    ('BN027', 'CF027', 'V003','B014'),
    ('BN028', 'CF028', 'V004','B014'),
                  
    ('BN029', 'CF029', 'V001','B015'),
    ('BN030', 'CF030', 'V002','B015'),
                    
    ('BN031', 'CF031', 'V003','B016'),
    ('BN032', 'CF032', 'V004','B016'),
                  
    ('BN033', 'CF033', 'V001','B017'),
    ('BN034', 'CF034', 'V002','B017'),
                    
    ('BN035', 'CF035', 'V003','B018'),
    ('BN036', 'CF036', 'V004','B018'),
                  
    ('BN037', 'CF037', 'V001','B019'),
    ('BN038', 'CF038', 'V002','B019'),
                    
    ('BN039', 'CF039', 'V003','B020'),
    ('BN040', 'CF040', 'V004','B020'),
           
    ('BN041', 'CF041', 'V001','B021'),
    ('BN042', 'CF042', 'V002','B021'),
                    
    ('BN043', 'CF043', 'V003','B022'),
    ('BN044', 'CF044', 'V004','B022'),
             
    ('BN045', 'CF045', 'V001','B023'),
    ('BN046', 'CF046', 'V002','B023'),
                    
    ('BN047', 'CF047', 'V003','B024'),
    ('BN048', 'CF048', 'V004','B024'),
             
    ('BN049', 'CF049', 'V001','B025'),
    ('BN050', 'CF050', 'V002','B025'),
                    
    ('BN051', 'CF051', 'V003','B026'),
    ('BN052', 'CF052', 'V004','B026'),
             
    ('BN053', 'CF053', 'V001','B027'),
    ('BN054', 'CF054', 'V002','B027'),
                    
    ('BN055', 'CF055', 'V003','B028'),
    ('BN056', 'CF056', 'V004','B028'),
             
    ('BN057', 'CF057', 'V001','B029'),
    ('BN058', 'CF058', 'V002','B020'),
                    
    ('BN059', 'CF059', 'V003','B030'),
    ('BN060', 'CF060', 'V004','B030');
    
INSERT INTO Boletin_Detalle(ID, Puesto, Comportamiento, Observaciones, profesor_id, boletin_id) Values

	('BD001',1, 'Excelente', 'Buen desempeño académico.', 	'P008','B001'),
	('BD002',2, 'Bueno', 'Debe mejorar la participación.', 	'P007','B002'),
	('BD003',3, 'Regular', 'Necesita reforzar matemáticas.','P007','B003'),
	('BD004',4, 'Excelente', 'Gran avance este periodo.', 	'P006','B004'),
	('BD005',5, 'Bueno', 'Cumple con la mayoría de tareas.','P004','B005'),
	('BD006',6, 'Regular', 'Le falta compromiso.',          'P008','B006'),
	('BD007',7, 'Bueno', 'Participa activamente.',          'P004','B007'),
	('BD008',8, 'Excelente', 'Trabajo destacado.',          'P006','B008'),
	('BD009',9, 'Regular', 'Falta entrega de trabajos.',    'P007','B009'),
	('BD010',10, 'Bueno', 'Buen desempeño en ciencias.',    'P005','B010'),
	('BD011',11, 'Excelente', 'Excelente desempeño.',       'P008','B011'),
	('BD012',12, 'Regular', 'Necesita mejorar conducta.',   'P006','B012'),
	('BD013',13, 'Bueno', 'Buen rendimiento.',              'P005','B013'),
	('BD014',14, 'Regular', 'Podría mejorar participación.','P005','B014'),
	('BD015',15, 'Excelente', 'Alumno destacado.',          'P004','B015'),
	('BD016',16, 'Bueno', 'Cumple con los objetivos.',      'P003','B016'),
	('BD017',17, 'Regular', 'Necesita apoyo en lectura.',   'P003','B017'),
	('BD018',18, 'Excelente', 'Gran desempeño.',            'P002','B018'),
	('BD019',19, 'Bueno', 'Entrega tareas a tiempo.',       'P002','B019'),
	('BD020',20, 'Regular', 'Debe mejorar en ciencias.',    'P001','B020'),
	('BD021',21, 'Bueno', 'Participa en clase.',            'P006','B021'),
	('BD022',22, 'Regular', 'Falta compromiso.',            'P005','B022'),
	('BD023',23, 'Excelente', 'Excelente desempeño.',       'P004','B023'),
	('BD024',24, 'Bueno', 'Buen trabajo en equipo.',        'P003','B024'),
	('BD025',25, 'Regular', 'Debe mejorar lectura.',        'P003','B025'),
	('BD026',26, 'Bueno', 'Responsable con sus tareas.',    'P002','B026'),
	('BD027',27, 'Excelente', 'Gran rendimiento.',          'P002','B027'),	
	('BD028',28, 'Regular', 'Necesita motivación.',         'P001','B028'),
	('BD029',29, 'Bueno', 'Buen desempeño.',                'P001','B029'),
	('BD030',30, 'Excelente', 'Alumno ejemplar.',           'P001','B030');
    
INSERT INTO Noticia(ID, Titulo_Noticia, Descripcion, Fecha_Notica, Imagen1, Imagen2, Imagen3, tipo_noticia_id) Values
	('NC001', 'Lanzamiento de EduMultiPro', 'Se anuncia el lanzamiento de la plataforma EduMultiPro para mejorar la gestión educativa.', '2025-03-15', 'img1.jpg', 'img2.jpg', 'img3.jpg', 'NT001'),
	('NC002', 'Nueva actualización de Mercaplus', 'La plataforma de control de inventarios Mercaplus recibe mejoras en la interfaz.', '2025-03-14', 'mercaplus1.jpg', NULL, NULL, 'NT002'),
	('NC003', 'Conferencia sobre tecnología educativa', 'Expertos hablarán sobre el impacto de la tecnología en la educación.', '2025-03-12', 'conf1.jpg', 'conf2.jpg', NULL, 'NT003'),
	('NC004', 'Taller de desarrollo de software', 'El SENA ofrece un nuevo taller para estudiantes de Análisis y Desarrollo de Software.', '2025-03-10', 'taller1.jpg', NULL, NULL, 'NT004'),
	('NC005', 'Importancia del reciclaje en las instituciones', 'Se promueve una campaña de reciclaje para reducir el impacto ambiental.', '2025-03-08', 'reciclaje1.jpg', 'reciclaje2.jpg', 'reciclaje3.jpg', 'NT005'),
	('NC006', 'Eventos académicos en 2025', 'Calendario con los principales eventos educativos y tecnológicos del año.', '2025-03-05', 'evento1.jpg', NULL, NULL, 'NT006');
    
                               