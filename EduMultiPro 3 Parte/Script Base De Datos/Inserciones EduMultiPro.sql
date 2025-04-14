INSERT INTO Rol(ID, Nombre_Rol) Values
	('R001','Alumno'),
    ('R002','Profesor'),
    ('R003','Coordinador');
    
INSERT INTO Documento(ID, Tipo_Documento) Values
	('D001','T.Identidad'),
    ('D002','Cedula'),
    ('D003','Cedula de extangeria');
    
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
	('1', 'Horario Primero', 'imagenes/horario_primero.png', 'Horario académico del grado primero para el año 2025. Incluye materias básicas y actividades lúdicas.'),
	('2', 'Horario Tercero', 'imagenes/horario_tercero.png', 'Horario académico del grado tercero, con énfasis en lectura comprensiva y matemáticas.'),
	('3', 'Horario Quinto', 'imagenes/horario_quinto.png', 'Horario académico del grado quinto, con materias de ciencias naturales y sociales reforzadas.'),
	('4', 'Horario Sexto', 'imagenes/horario_sexto.png', 'Horario académico del grado sexto, inicio de secundaria básica con materias obligatorias y talleres.'),
	('5', 'Horario Séptimo', 'imagenes/horario_septimo.png', 'Horario académico del grado séptimo, incluye introducción a la tecnología y proyectos colaborativos.'),
	('6', 'Horario Noveno', 'imagenes/horario_noveno.png', 'Horario académico del grado noveno, incluye asignaturas avanzadas y orientación vocacional.'),
	('7', 'Horario Décimo', 'imagenes/horario_decimo.png', 'Horario académico del grado décimo, prepara a los estudiantes para pruebas de estado y competencias técnicas.'),
	('8', 'Horario Once', 'imagenes/horario_once.png', 'Horario académico del grado once, incluye énfasis en formación preuniversitaria y preparación para la vida laboral.');
    
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
	('1', 'Noticia Principal 1'),
	('2', 'Noticia Principal 2'),
	('3', 'Noticia Principal 3'),
	('4', 'Noticia Secundaria 1'),
    ('5', 'Noticia Secundaria 2'),
    ('6', 'Noticia Secundaria 3');
    
INSERT INTO Curso(ID, Curso_Nombre, grado_id, jornada_id) Values
	('Q0101M', '101', 'G01','J01'),
	('Q0301M', '301', 'G03','J01'),
	('Q0501M', '501', 'G05','J01'),
	('Q0601T', '601', 'G06','J02'),
	('Q0701T', '701', 'G07','J02'),
	('Q0901T', '901', 'G09','J02'),
    ('Q1001X', '1001', 'G10','J03'),
    ('Q1101X', '1101', 'G11','J03');

INSERT INTO Usuario(ID, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Correo1, Contraseña, rol_id, documento_id) Values
	('1', 'Juan', 'Alberto', 'Pérez', 'Gómez',          'juan01@gmail.com', 'pepito123',    'R003', 'D002'),
	('2', 'Maria', 'Elena', 'Rodríguez', 'López',       'maria02@gmail.com', 'pepito123',   'R003', 'D002'),
	('3', 'Pedro', 'Antonio', 'García', 'Martínez',     'pedro03@gmail.com', 'pepito123',   'R002', 'D002'),
	('4', 'Laura', 'Isabel', 'Hernández', 'Ramírez',    'laura04@gmail.com', 'pepito123',   'R002', 'D002'),
	('5', 'Carlos', 'Andrés', 'Torres', 'Moreno',       'carlos05@gmail.com', 'pepito123',  'R002', 'D002'),
	('6', 'Ana', 'Lucía', 'Ruiz', 'Ortiz',              'ana06@gmail.com', 'pepito123',     'R002', 'D002'),
	('7', 'Jose', 'Manuel', 'Morales', 'Jiménez',       'jose07@gmail.com', 'pepito123',    'R002', 'D002'),
	('8', 'Sofia', 'Alejandra', 'Suárez', 'Paredes',    'sofia08@gmail.com', 'pepito123',    'R002', 'D003'),
	('9', 'David', 'Enrique', 'Castro', 'Rivas',        'david09@gmail.com', 'pepito123',   'R002', 'D003'),
	('10', 'Paula', 'Andrea', 'Mendoza', 'Vargas',       'paula10@gmail.com', 'pepito123',   'R002', 'D003'),
                                                           
	('11', 'Lucas', 'Mateo', 'Reyes', 'Córdoba',         'lucas11@gmail.com', 'pepito123',   'R001', 'D001'),
	('12', 'Valeria', 'Sofía', 'Silva', 'Carrillo',      'valeria12@gmail.com', 'pepito123', 'R001', 'D001'),
	('13', 'Diego', 'Esteban', 'Castaño', 'Delgado',     'diego13@gmail.com', 'pepito123',  'R001', 'D001'),
	('14', 'Camila', 'Gabriela', 'Cruz', 'Salazar',      'camila14@gmail.com', 'pepito123',  'R001', 'D001'),
	('15', 'Andres', 'Felipe', 'Pineda', 'Barrios',      'andres15@gmail.com', 'pepito123',   'R001', 'D001'),
	('16', 'Natalia', 'Lorena', 'Rojas', 'Peña',         'natalia16@gmail.com', 'pepito123', 'R001', 'D001'),
	('17', 'Sergio', 'Alejandro', 'Peñaloza', 'Navarro', 'sergio17@gmail.com', 'pepito123',  'R001', 'D001'),
	('18', 'Carolina', 'Fernanda', 'Gómez', 'Quintero',  'carolina18@gmail.com', 'pepito123', 'R001', 'D001'),
	('19', 'Felipe', 'Alonso', 'Vargas', 'Maldonado',    'felipe19@gmail.com', 'pepito123',  'R001', 'D001'),
	('20', 'Daniela', 'Patricia', 'Mejía', 'Castillo',   'daniela20@gmail.com', 'pepito123',  'R001', 'D001'),
												
	('21', 'Sebastian', 'Iván', 'Ortiz', 'Velásquez',    'sebastian21@gmail.com', 'pepito123', 'R001', 'D001'),
	('22', 'Andrea', 'Milena', 'Fernández', 'Rosales',   'andrea22@gmail.com', 'pepito123',  'R001', 'D001'),
	('23', 'Oscar', 'Eduardo', 'Aguilar', 'Padilla',     'oscar23@gmail.com', 'pepito123',   'R001', 'D001'),
	('24', 'Alejandra', 'Juliana', 'Benítez', 'Palacios','alejandra24@gmail.com', 'pepito123', 'R001', 'D001'),
	('25', 'Enrique', 'Javier', 'León', 'Herrera',       'enrique25@gmail.com', 'pepito123', 'R001', 'D001'),
	('26', 'Karen', 'Tatiana', 'Campos', 'Chávez',       'karen26@gmail.com', 'pepito123',   'R001', 'D001'),
	('27', 'Manuel', 'Jesús', 'Sánchez', 'Figueroa',     'manuel27@gmail.com', 'pepito123',  'R001', 'D001'),
	('28', 'Isabela', 'María', 'Bautista', 'Gallardo',   'isabela28@gmail.com', 'pepito123', 'R001', 'D001'),
	('29', 'Martin', 'Leandro', 'Arango', 'Bermúdez',    'martin29@gmail.com', 'pepito123',  'R001', 'D001'),
	('30', 'Juliana', 'Natalia', 'Cárdenas', 'Zapata',   'juliana30@gmail.com', 'pepito123', 'R001', 'D001'),
                                                       
	('31', 'Leonardo', 'Daniel', 'Valencia', 'Montoya',  'leonardo31@gmail.com', 'pepito123', 'R001', 'D001'),
	('32', 'Ximena', 'Carolina', 'Patiño', 'Benavides',  'ximena32@gmail.com', 'pepito123',  'R001', 'D001'),
	('33', 'Brayan', 'Adrián', 'Nieto', 'Escobar',       'brayan33@gmail.com', 'pepito123',  'R001', 'D001'),
	('34', 'Nataly', 'Estefanía', 'Palma', 'Cuellar',    'nataly34@gmail.com', 'pepito123',  'R001', 'D001'),
	('35', 'Ricardo', 'Samuel', 'Barrera', 'Sierra',     'ricardo35@gmail.com', 'pepito123', 'R001', 'D001'),
	('36', 'Monica', 'Patricia', 'Delgado', 'Acosta',    'monica36@gmail.com', 'pepito123',  'R001', 'D001'),
	('37', 'Santiago', 'Emilio', 'Mora', 'Arenas',       'santiago37@gmail.com', 'pepito123', 'R001', 'D001'),
	('38', 'Victoria', 'Luciana', 'Estupiñán', 'Cadavid','victoria38@gmail.com', 'pepito123', 'R001', 'D001'),
	('39', 'Hugo', 'Francisco', 'Marín', 'Correa',       'hugo39@gmail.com', 'pepito123',    'R001', 'D001'),
	('40', 'Estefania', 'Paola', 'Guzmán', 'Roldán',     'estefania40@gmail.com', 'pepito123', 'R001', 'D001');
    
INSERT INTO Informacion(ID, Correo2, Contacto1, Contacto2, Fecha_Nacimiento, RutaFoto, usuario_id) Values
	('1', 'juan.alt01@gmail.com', '3111111111', '3201111111', '1990-01-15',null      ,'1'),
	('2', 'maria.alt02@gmail.com', '3122222222', '3212222222', '1988-05-22',null     ,'2'),
	('3', 'pedro.alt03@gmail.com', '3133333333', '3223333333', '1995-07-10',null     ,'3'),
	('4', 'laura.alt04@gmail.com', '3144444444', '3234444444', '1992-12-01',null     ,'4'),
	('5', 'carlos.alt05@gmail.com', '3155555555', '3245555555', '1985-09-18',null    ,'5'),
	('6', 'ana.alt06@gmail.com', '3166666666', '3256666666', '1993-03-12',null       ,'6'),
	('7', 'jose.alt07@gmail.com', '3177777777', '3267777777', '1997-08-27',null      ,'7'),
	('8', 'sofia.alt08@gmail.com', '3188888888', '3278888888', '1991-11-09',null     ,'8'),
	('9', 'david.alt09@gmail.com', '3199999999', '3289999999', '1989-06-14',null     ,'9'),
	('10', 'paula.alt10@gmail.com', '3101010101', '3291010101', '1994-02-20',null    ,'10'),
                                                                                              
	('11', 'lucas.alt11@gmail.com', '3111111112', '3201111112', '2008-04-05',null    ,'11'),
	('12', 'valeria.alt12@gmail.com', '3122222223', '3212222223', '2010-07-22',null  ,'12'),
	('13', 'diego.alt13@gmail.com', '3133333334', '3223333334', '2009-01-30',null    ,'13'),
	('14', 'camila.alt14@gmail.com', '3144444445', '3234444445', '2011-10-11',null   ,'14'),
	('15', 'andres.alt15@gmail.com', '3155555556', '3245555556', '2012-03-25',null   ,'15'),
	('16', 'natalia.alt16@gmail.com', '3166666667', '3256666667', '2008-05-18',null  ,'16'),
	('17', 'sergio.alt17@gmail.com', '3177777778', '3267777778', '2013-09-29',null   ,'17'),
	('18', 'carolina.alt18@gmail.com', '3188888889', '3278888889', '2010-12-03',null ,'18'),
	('19', 'felipe.alt19@gmail.com', '3199999900', '3289999900', '2009-02-28',null   ,'19'),
	('20', 'daniela.alt20@gmail.com', '3101010111', '3291010111', '2011-08-06',null  ,'20'),
																						
	('21', 'sebastian.alt21@gmail.com', '3111111122', '3201111122', '2008-03-17',null,'21'),
	('22', 'andrea.alt22@gmail.com', '3122222233', '3212222233', '2010-06-26',null   ,'22'),
	('23', 'oscar.alt23@gmail.com', '3133333344', '3223333344', '2011-09-15',null    ,'23'),
	('24', 'alejandra.alt24@gmail.com', '3144444455', '3234444455', '2012-04-08',null,'24'),
	('25', 'enrique.alt25@gmail.com', '3155555566', '3245555566', '2013-12-21',null  ,'25'),
	('26', 'karen.alt26@gmail.com', '3166666677', '3256666677', '2014-01-03',null    ,'26'),
	('27', 'manuel.alt27@gmail.com', '3177777788', '3267777788', '2015-05-12',null   ,'27'),
	('28', 'isabela.alt28@gmail.com', '3188888899', '3278888899', '2016-07-19',null  ,'28'),
	('29', 'martin.alt29@gmail.com', '3199999000', '3289999000', '2017-11-02',null   ,'29'),
	('30', 'juliana.alt30@gmail.com', '3101010122', '3291010122', '2018-03-23',null  ,'30'),
																						
	('31', 'leonardo.alt31@gmail.com', '3111111133', '3201111133', '2010-06-10',null ,'31'),
	('32', 'ximena.alt32@gmail.com', '3122222244', '3212222244', '2011-09-29',null   ,'32'),
	('33', 'brayan.alt33@gmail.com', '3133333355', '3223333355', '2012-01-14',null   ,'33'),
	('34', 'nataly.alt34@gmail.com', '3144444466', '3234444466', '2013-08-05',null   ,'34'),
	('35', 'ricardo.alt35@gmail.com', '3155555577', '3245555577', '2014-02-17',null  ,'35'),
	('36', 'monica.alt36@gmail.com', '3166666688', '3256666688', '2015-04-24',null   ,'36'),
	('37', 'santiago.alt37@gmail.com', '3177777799', '3267777799', '2016-11-30',null ,'37'),
	('38', 'victoria.alt38@gmail.com', '3188888800', '3278888800', '2017-01-07',null ,'38'),
	('39', 'hugo.alt39@gmail.com', '3199999011', '3289999011', '2018-05-13',null     ,'39'),
	('40', 'estefania.alt40@gmail.com', '3101010133', '3291010133', '2019-12-25',null,'40');
    
INSERT INTO Miembros_Curso(usuario_id, curso_id) Values
	('3', 'Q0101M'),
	('4', 'Q0301M'),
	('5', 'Q0501M'),
	('6', 'Q0601T'),
	('7', 'Q0701T'),
	('8', 'Q0901T'),
	('9', 'Q1001X'),
	('10', 'Q1101X'),

	('11', 'Q1101X'),
	('12', 'Q1001X'),
	('13', 'Q1001X'),
	('14', 'Q0901T'),
	('15', 'Q0601T'),
	('16', 'Q1101X'),
	('17', 'Q0601T'),
	('18', 'Q0901T'),
	('19', 'Q1001X'),
	('20', 'Q0701T'),
      
	('21', 'Q1101X'),
	('22', 'Q0901T'),
	('23', 'Q0701T'),
	('24', 'Q0701T'),
	('25', 'Q0601T'),
	('26', 'Q0501M'),
	('27', 'Q0501M'),
	('28', 'Q0301M'),
	('29', 'Q0301M'),
	('30', 'Q0101M'),
      
	('31', 'Q0901T'),
	('32', 'Q0701T'),
	('33', 'Q0601T'),
	('34', 'Q0501M'),
	('35', 'Q0501M'),
	('36', 'Q0301M'),
	('37', 'Q0301M'),
	('38', 'Q0101M'),
	('39', 'Q0101M'),
	('40', 'Q0101M');
    
INSERT INTO Horario_Curso(ID, horario_id, profesor_id, curso_id) Values

	('1','1', null, 'Q0101M'),
	('2','2', null, 'Q0301M'),
	('3','3', null, 'Q0501M'),
	('4','4', null, 'Q0601T'),
	('5','5', null, 'Q0701T'),
    ('6','6', null, 'Q0901T'),
    ('7','7', null, 'Q1001X'),
    ('8','8', null, 'Q1101X');
    
INSERT INTO Aula(ID, Aula_Nombre, materia_id, usuario_id, curso_id) Values
	('A001', 'Aula Matemáticas 101', 'M001', '2', 'Q0101M'),
    ('A002', 'Aula Lengua Castellana 101', 'M002', '3', 'Q0101M'),
    ('A003', 'Aula Ciencias Naturales 301', 'M003', '4', 'Q0301M'),
    ('A004', 'Aula Ciencias Sociales 301', 'M004', '5', 'Q0301M'),
    ('A005', 'Aula Inglés 501', 'M005', '6', 'Q0501M'),
    ('A006', 'Aula Educación Física 501', 'M006', '7', 'Q0501M'),
    ('A007', 'Aula Tecnología 601', 'M007', '8', 'Q0601T'),
    ('A008', 'Aula Ética 601', 'M008', '9', 'Q0601T'),
    ('A009', 'Aula Religión 701', 'M009', '10', 'Q0701T'),
    ('A010', 'Aula Artes 701', 'M010', '3', 'Q0701T'),
    ('A011', 'Aula Matemáticas 901', 'M001', '4', 'Q0901T'),
    ('A012', 'Aula Lengua Castellana 901', 'M002', '5', 'Q0901T'),
    ('A013', 'Aula Ciencias Naturales 1001', 'M003', '6', 'Q1001X'),
    ('A014', 'Aula Ciencias Sociales 1001', 'M004', '7', 'Q1001X'),
    ('A015', 'Aula Inglés 1101', 'M005', '8', 'Q1101X'),
    ('A016', 'Aula Educación Física 1101', 'M009', '9', 'Q1101X');
    
INSERT INTO Anuncio(ID, Titulo_Anuncio, Descripcion_Anuncio, Enlace_Anuncio, Fecha_Anuncio, aula_id, usuario_id) Values
	-- Matemáticas
	('AN001', 'Examen de Matemáticas - Primer Parcial', 'Se realizará el primer examen parcial el día lunes. Temas: álgebra básica.', 'https://colegio.edu/anuncios/matematicas1', '2025-03-20','A001','3'),
	('AN002', 'Guía de Estudio Matemáticas', 'Disponible la guía de ejercicios para preparar el examen. Descargar aquí.', 'https://colegio.edu/guias/matematicas1', '2025-03-18','A001','3'),

	-- Lengua Castellana
	('AN003', 'Entrega de Ensayo - Lengua Castellana', 'Recordatorio: el ensayo de literatura debe entregarse el viernes antes de las 5 p.m.', 'https://colegio.edu/anuncios/castellana1', '2025-03-22','A002','4'),
	('AN004', 'Nueva Lectura Obligatoria', 'Se ha asignado el libro "Cien años de soledad" para el próximo mes.', 'https://colegio.edu/libros/castellana1', '2025-03-19','A002','4'),

	-- Ciencias Naturales
	('AN005', 'Práctica de Laboratorio - Ciencias Naturales', 'Actividad práctica de biología sobre el sistema digestivo el miércoles.', 'https://colegio.edu/anuncios/naturales1', '2025-03-23','A003','5'),
	('AN006', 'Resultados del Taller de Química', 'Revisa tus resultados del taller práctico subidos a la plataforma.', 'https://colegio.edu/resultados/naturales1', '2025-03-25','A003','5'),

	-- Ciencias Sociales
	('AN007', 'Debate sobre Historia Universal', 'Organización del debate sobre las guerras mundiales en el aula 3.', 'https://colegio.edu/anuncios/sociales1', '2025-03-21','A004','6'),
	('AN008', 'Taller de Geografía', 'Participa en el taller interactivo de geografía este viernes.', 'https://colegio.edu/talleres/sociales1', '2025-03-20','A004','6'),

	-- Inglés
	('AN009', 'Examen de Inglés - Verbos Irregulares', 'Evaluación escrita sobre los verbos irregulares el próximo jueves.', 'https://colegio.edu/anuncios/ingles1', '2025-03-24','A005','7'),
	('AN010', 'Club de Conversación en Inglés', 'Únete al club de conversación los sábados a las 10 a.m.', 'https://colegio.edu/clubs/ingles1', '2025-03-26','A005','7'),

	-- Educación Física
	('AN011', 'Competencia de Atletismo', 'Se convoca a la competencia anual de atletismo. Inscripciones abiertas.', 'https://colegio.edu/eventos/edufisica1', '2025-03-27','A006','8'),
	('AN012', 'Clase Especial de Yoga', 'Clase de yoga para mejorar la flexibilidad y concentración.', 'https://colegio.edu/clases/edufisica1', '2025-03-29','A006','8'),

	-- Tecnología e Informática
	('AN013', 'Taller de Programación en Scratch', 'Aprende los conceptos básicos de programación visual.', 'https://colegio.edu/talleres/tecnologia1', '2025-03-28','A007','9'),
	('AN014', 'Concurso de Robótica', 'Participa en el concurso de robótica intercolegial.', 'https://colegio.edu/concursos/tecnologia1', '2025-04-01','A007','9'),

	-- Ética y Valores
	('AN015', 'Foro de Valores Humanos', 'Discusión sobre respeto y responsabilidad ciudadana.', 'https://colegio.edu/foros/etica1', '2025-03-30','A008','10'),
	('AN016', 'Campaña de Solidaridad', 'Jornada para recaudar alimentos no perecederos.', 'https://colegio.edu/campanas/etica1', '2025-04-02','A008','10'),

	-- Religión
	('AN017', 'Encuentro Ecuménico', 'Invitación al encuentro interreligioso por la paz.', 'https://colegio.edu/eventos/religion1', '2025-04-03','A009','3'),
	('AN018', 'Reflexión de Semana Santa', 'Actividades de reflexión y espiritualidad en la Semana Santa.', 'https://colegio.edu/actividades/religion1', '2025-04-05','A009','3'),

	-- Artes
	('AN019', 'Exposición de Pintura', 'Presentación de las obras realizadas en el taller de arte.', 'https://colegio.edu/exposiciones/artes1', '2025-04-06','A010','4'),
	('AN020', 'Clase Magistral de Música', 'Sesión especial sobre composición y técnica musical.', 'https://colegio.edu/clases/artes1', '2025-04-08','A010','4'),
    
    -- Matemáticas 2
	('AN021', 'Examen de Matemáticas - Primer Parcial', 'Se realizará el primer examen parcial el día lunes. Temas: álgebra básica.', 'https://colegio.edu/anuncios/matematicas1', '2025-03-20','A011','5'),
	('AN022', 'Guía de Estudio Matemáticas', 'Disponible la guía de ejercicios para preparar el examen. Descargar aquí.', 'https://colegio.edu/guias/matematicas1', '2025-03-18','A011','5'),

	-- Lengua Castellana 2
	('AN023', 'Entrega de Ensayo - Lengua Castellana', 'Recordatorio: el ensayo de literatura debe entregarse el viernes antes de las 5 p.m.', 'https://colegio.edu/anuncios/castellana1', '2025-03-22','A012','6'),
	('AN024', 'Nueva Lectura Obligatoria', 'Se ha asignado el libro "Cien años de soledad" para el próximo mes.', 'https://colegio.edu/libros/castellana1', '2025-03-19','A012','6'),

	-- Ciencias Naturales 2
	('AN025', 'Práctica de Laboratorio - Ciencias Naturales', 'Actividad práctica de biología sobre el sistema digestivo el miércoles.', 'https://colegio.edu/anuncios/naturales1', '2025-03-23','A013','7'),
	('AN026', 'Resultados del Taller de Química', 'Revisa tus resultados del taller práctico subidos a la plataforma.', 'https://colegio.edu/resultados/naturales1', '2025-03-25','A013','7'),

	-- Ciencias Sociales 2
	('AN027', 'Debate sobre Historia Universal', 'Organización del debate sobre las guerras mundiales en el aula 3.', 'https://colegio.edu/anuncios/sociales1', '2025-03-21','A014','8'),
	('AN028', 'Taller de Geografía', 'Participa en el taller interactivo de geografía este viernes.', 'https://colegio.edu/talleres/sociales1', '2025-03-20','A014','8'),

	-- Inglés 2
	('AN029', 'Examen de Inglés - Verbos Irregulares', 'Evaluación escrita sobre los verbos irregulares el próximo jueves.', 'https://colegio.edu/anuncios/ingles1', '2025-03-24','A015','9'),
	('AN030', 'Club de Conversación en Inglés', 'Únete al club de conversación los sábados a las 10 a.m.', 'https://colegio.edu/clubs/ingles1', '2025-03-26','A015','9'),

	-- Educación Física 2
	('AN031', 'Competencia de Atletismo', 'Se convoca a la competencia anual de atletismo. Inscripciones abiertas.', 'https://colegio.edu/eventos/edufisica1', '2025-03-27','A016','10'),
	('AN032', 'Clase Especial de Yoga', 'Clase de yoga para mejorar la flexibilidad y concentración.', 'https://colegio.edu/clases/edufisica1', '2025-03-29','A016','10');
    
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
  
INSERT INTO TrabajoEntregado(ID, Archivo_Trabajo, Fecha_Trabajo, trabajo_id, usuario_id) Values

	('TE001', 'archivos/edufisica_bitacora.docx', '2025-04-21', 'T001', '11'),
	('TE002', 'archivos/edufisica_futbol.pdf', '2025-04-26', 'T002', '12'),
    ('TE003', 'archivos/edufisica_bitacora.docx', '2025-04-21', 'T003', '13'),
	('TE004', 'archivos/edufisica_futbol.pd', '2025-04-26', 'T004', '14');
    
INSERT INTO Comentario(ID, Descripcion, Fecha, trabajo_id, anuncio_id, usuario_id) Values

	('CA001', 'no entiendo', '2025-04-21', 'T001', null, '11'),
	('CA002', 'facilito', '2025-04-26', null, 'AN002', '12'),
    ('CA003', 'envio mi trabajo', '2025-04-21', 'T003', null, '13'),
	('CA004', 'entendido', '2025-04-26', null, 'AN004', '14');
    
INSERT INTO Nota_Trabajo(ID, Nota, trabajo_id, usuario_id) Values
	
	('CT001', 4.5, 'T001', '40'),
    ('CT002', 3.8, 'T002', '40'),
    ('CT003', 1.2, 'T003', '40'),
    ('CT004', 5.0, 'T004', '40'),
    
	('CT005', 4.0, 'T001', '39'),
	('CT006', 2.3, 'T002', '39'),
	('CT007', 3.7, 'T003', '39'),
	('CT008', 4.8, 'T004', '39'),

	('CT009', 3.5, 'T001', '30'),
	('CT010', 1.6, 'T002', '30'),
	('CT011', 5.1, 'T003', '30'),
	('CT012', 3.9, 'T004', '30'),

	('CT013', 1.7, 'T001', '38'),
	('CT014', 3.8, 'T002', '38'),
	('CT015', 2.4, 'T003', '38'),
	('CT016', 4.0, 'T004', '38'),

	('CT017', 3.6, 'T005', '29'),
	('CT018', 1.9, 'T006', '29'),
	('CT019', 4.2, 'T007', '29'),
	('CT020', 5.1, 'T008', '29'),

	('CT021', 4.0, 'T005', '37'),
	('CT022', 3.7, 'T006', '37'),
	('CT023', 1.8, 'T007', '37'),
	('CT024', 4.3, 'T008', '37'),

	('CT025', 4.4, 'T005', '28'),
	('CT026', 2.1, 'T006', '28'),
	('CT027', 3.9, 'T007', '28'),
	('CT028', 4.5, 'T008', '28'),

	('CT029', 3.8, 'T005', '36'),
	('CT030', 4.6, 'T006', '36'),
	('CT031', 2.0, 'T007', '36'),
	('CT032', 5.2, 'T008', '36'),

	('CT033', 4.7, 'T009', '27'),
	('CT034', 3.9, 'T010', '27'),
	('CT035', 1.1, 'T011', '27'),
	('CT036', 5.3, 'T012', '27'),

	('CT037', 3.6, 'T009', '35'),
	('CT038', 4.8, 'T010', '35'),
	('CT039', 2.2, 'T011', '35'),
	('CT040', 4.0, 'T012', '35'),

	('CT041', 1.9, 'T009', '35'),
	('CT042', 4.1, 'T010', '35'),
	('CT043', 5.3, 'T011', '35'),
	('CT044', 4.7, 'T012', '35'),

	('CT045', 3.8, 'T009', '34'),
	('CT046', 2.4, 'T010', '34'),
	('CT047', 3.5, 'T011', '34'),
	('CT048', 1.0, 'T012', '34'),

	('CT049', 3.9, 'T013', '25'),
	('CT050', 4.2, 'T014', '25'),
	('CT051', 5.8, 'T015', '25'),
	('CT052', 1.1, 'T016', '25'),

	('CT053', 2.3, 'T013', '17'),
	('CT054', 3.7, 'T014', '17'),
	('CT055', 4.9, 'T015', '17'),
	('CT056', 1.4, 'T016', '17'),

	('CT057', 4.6, 'T013', '33'),
	('CT058', 2.0, 'T014', '33'),
	('CT059', 3.8, 'T015', '33'),
	('CT060', 4.1, 'T016', '33'),

	('CT061', 4.7, 'T013', '15'),
	('CT062', 3.9, 'T014', '15'),
	('CT063', 2.3, 'T015', '15'),
	('CT064', 1.5, 'T016', '15'),

	('CT065', 4.2, 'T017', '24'),
	('CT066', 2.6, 'T018', '24'),
	('CT067', 3.8, 'T019', '24'),
	('CT068', 1.4, 'T020', '24'),

	('CT069', 1.0, 'T017', '32'),
	('CT070', 5.1, 'T018', '32'),
	('CT071', 4.9, 'T019', '32'),
	('CT072', 3.7, 'T020', '32'),

	('CT073', 2.5, 'T017', '23'),
	('CT074', 4.3, 'T018', '23'),
	('CT075', 1.1, 'T019', '23'),
	('CT076', 3.8, 'T020', '23'),

	('CT077', 2.2, 'T017', '20'),
	('CT078', 4.4, 'T018', '20'),
	('CT079', 5.0, 'T019', '20'),
	('CT080', 4.7, 'T020', '20'),

	('CT081', 4.3, 'T001', '14'),
	('CT082', 3.9, 'T002', '14'),
	('CT083', 4.1, 'T003', '14'),
	('CT084', 4.8, 'T004', '14'),

	('CT085', 3.7, 'T001', '31'),
	('CT086', 4.5, 'T002', '31'),
	('CT087', 4.2, 'T003', '31'),
	('CT088', 4.6, 'T004', '31'),

	('CT089', 4.0, 'T001', '22'),
	('CT090', 4.3, 'T002', '22'),
	('CT091', 3.8, 'T003', '22'),
	('CT092', 4.9, 'T004', '22'),

	('CT093', 4.1, 'T001', '18'),
	('CT094', 4.4, 'T002', '18'),
	('CT095', 3.9, 'T003', '18'),
	('CT096', 4.5, 'T004', '18'),

	('CT097', 4.6, 'T005', '12'),
	('CT098', 2.0, 'T006', '12'),
	('CT099', 5.2, 'T007', '12'),
	('CT100', 3.8, 'T008', '12'),

	('CT101', 1.3, 'T005', '19'),
	('CT102', 4.7, 'T006', '19'),
	('CT103', 2.1, 'T007', '19'),
	('CT104', 3.9, 'T008', '19'),

	('CT105', 4.4, 'T005', '13'),
	('CT106', 3.5, 'T006', '13'),
	('CT107', 5.2, 'T007', '13'),
	('CT108', 1.0, 'T008', '13'),

	('CT109', 4.8, 'T009', '21'),
	('CT110', 3.7, 'T010', '21'),
	('CT111', 4.3, 'T011', '21'),
	('CT112', 4.1, 'T012', '21'),
    
	('CT113', 4.6, 'T009', '16'),
	('CT114', 4.2, 'T010', '16'),
	('CT115', 3.8, 'T011', '16'),
	('CT116', 4.5, 'T012', '16'),

	('CT117', 4.9, 'T009', '11'),
	('CT118', 4.3, 'T010', '11'),
	('CT119', 4.1, 'T011', '11'),
	('CT120', 3.9, 'T012', '11');
    
INSERT INTO Nota_Final(ID, Nota_Final, Inasistencias, materia_id, logro_id, usuario_id) Values

	('CF001', 4.50, 2, 'M005', 'LG001', '11'),
	('CF002', 3.80, 1, 'M006', 'LG002', '11'),

	('CF003', 4.20, 0, 'M003', 'LG003', '12'),
	('CF004', 3.90, 3, 'M004', 'LG004', '12'),

	('CF005', 2.95, 5, 'M003', 'LG005', '13'),
	('CF006', 3.40, 2, 'M004', 'LG006', '13'),

	('CF007', 4.70, 1, 'M001', 'LG007', '14'),
	('CF008', 3.95, 0, 'M002', 'LG008', '14'),

	('CF009', 3.60, 4, 'M007', 'LG009', '15'),
	('CF010', 4.30, 1, 'M008', 'LG010', '15'),

	('CF011', 4.85, 3, 'M005', 'LG001', '16'),
	('CF012', 3.70, 0, 'M006', 'LG002', '16'),

	('CF013', 2.80, 2, 'M007', 'LG003', '17'),
	('CF014', 4.20, 1, 'M008', 'LG004', '17'),

	('CF015', 3.95, 4, 'M001', 'LG005', '18'),
	('CF016', 3.10, 3, 'M002', 'LG006', '18'),

	('CF017', 4.40, 0, 'M003', 'LG007', '19'),
	('CF018', 3.85, 1, 'M004', 'LG008', '19'),

	('CF019', 3.30, 3, 'M009', 'LG009', '20'),
	('CF020', 4.55, 1, 'M010', 'LG010', '20'),

	('CF021', 4.90, 0, 'M005', 'LG001', '21'),
	('CF022', 4.30, 2, 'M006', 'LG002', '21'),
                               
	('CF023', 3.55, 1, 'M001', 'LG003', '22'),
	('CF024', 4.00, 3, 'M002', 'LG004', '22'),
                               
	('CF025', 2.75, 5, 'M009', 'LG005', '23'),
	('CF026', 3.80, 1, 'M010', 'LG006', '23'),
                               
	('CF027', 4.50, 2, 'M009', 'LG007', '24'),
	('CF028', 4.90, 0, 'M010', 'LG008', '24'),
                               
	('CF029', 3.10, 4, 'M007', 'LG009', '25'),
	('CF030', 3.00, 2, 'M008', 'LG010', '25'),

	('CF031', 4.60, 1, 'M005', 'LG001', '26'),
	('CF032', 4.05, 0, 'M006', 'LG002', '26'),
                               
	('CF033', 3.80, 3, 'M005', 'LG003', '27'),
	('CF034', 3.50, 1, 'M006', 'LG004', '27'),
                               
	('CF035', 2.85, 5, 'M003', 'LG005', '28'),
	('CF036', 3.65, 2, 'M004', 'LG006', '28'),
                               
	('CF037', 4.40, 1, 'M003', 'LG007', '29'),
	('CF038', 4.55, 0, 'M004', 'LG008', '29'),
                               
	('CF039', 3.35, 3, 'M001', 'LG009', '30'),
	('CF040', 4.10, 1, 'M002', 'LG010', '30'),

	('CF041', 4.15, 2, 'M001', 'LG001', '31'),
	('CF042', 4.00, 3, 'M002', 'LG002', '31'),
                               
	('CF043', 3.65, 4, 'M009', 'LG003', '32'),
	('CF044', 2.90, 2, 'M010', 'LG004', '32'),
                               
	('CF045', 4.95, 0, 'M007', 'LG005', '33'),
	('CF046', 4.25, 1, 'M008', 'LG006', '33'),
                               
	('CF047', 3.45, 5, 'M005', 'LG007', '34'),
	('CF048', 3.80, 2, 'M006', 'LG008', '34'),
                               
	('CF049', 4.10, 1, 'M005', 'LG009', '35'),
	('CF050', 4.50, 0, 'M006', 'LG010', '35'),

	('CF051', 3.95, 2, 'M003', 'LG001', '36'),
	('CF052', 4.20, 1, 'M004', 'LG002', '36'),
                               
	('CF053', 3.00, 4, 'M003', 'LG003', '37'),
	('CF054', 3.85, 3, 'M004', 'LG004', '37'),
                               
	('CF055', 4.65, 0, 'M001', 'LG005', '38'),
	('CF056', 4.30, 2, 'M002', 'LG006', '38'),
                               
	('CF057', 3.75, 3, 'M001', 'LG007', '39'),
	('CF058', 3.60, 1, 'M002', 'LG008', '39'),
                               
	('CF059', 4.90, 0, 'M001', 'LG009', '40'),
	('CF060', 4.10, 2, 'M002', 'LG010', '40');
    
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
	
    ('B001', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-001', 'Colegio San Martín', '11', 'PR004'),
	('B002', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-001', 'Colegio San Martín', '12', 'PR003'),
	('B003', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-001', 'Colegio San Martín', '13', 'PR003'),
	('B004', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-001', 'Colegio San Martín', '14', 'PR002'),
	('B005', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-002', 'Colegio San Martín', '15', 'PR004'),
	('B006', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-002', 'Colegio San Martín', '16', 'PR004'),
	('B007', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-002', 'Colegio San Martín', '17', 'PR004'),
	('B008', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-002', 'Colegio San Martín', '18', 'PR002'),
	('B009', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-003', 'Colegio San Martín', '19', 'PR003'),
	('B010', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-003', 'Colegio San Martín', '20', 'PR001'),
	('B011', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-003', 'Colegio San Martín', '21', 'PR004'),
	('B012', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-003', 'Colegio San Martín', '22', 'PR002'),
	('B013', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-004', 'Colegio San Martín', '23', 'PR001'),
	('B014', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-004', 'Colegio San Martín', '24', 'PR001'),
	('B015', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-004', 'Colegio San Martín', '25', 'PR004'),
	('B016', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-004', 'Colegio San Martín', '26', 'PR003'),
	('B017', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-005', 'Colegio San Martín', '27', 'PR003'),
	('B018', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-005', 'Colegio San Martín', '28', 'PR002'),
	('B019', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-005', 'Colegio San Martín', '29', 'PR002'),
	('B020', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-005', 'Colegio San Martín', '30', 'PR001'),
	('B021', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-006', 'Colegio San Martín', '31', 'PR002'),
	('B022', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-006', 'Colegio San Martín', '32', 'PR001'),
	('B023', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-006', 'Colegio San Martín', '33', 'PR004'),
	('B024', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-006', 'Colegio San Martín', '34', 'PR003'),
	('B025', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-007', 'Colegio San Martín', '35', 'PR003'),
	('B026', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-007', 'Colegio San Martín', '36', 'PR002'),
	('B027', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-007', 'Colegio San Martín', '37', 'PR002'),
	('B028', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-007', 'Colegio San Martín', '38', 'PR001'),
	('B029', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-008', 'Colegio San Martín', '39', 'PR001'),
	('B030', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-008', 'Colegio San Martín', '40', 'PR001');
    
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

	('BD001',1, 'Excelente', 'Buen desempeño académico.', 	'10','B001'),
	('BD002',2, 'Bueno', 'Debe mejorar la participación.', 	'9','B002'),
	('BD003',3, 'Regular', 'Necesita reforzar matemáticas.','9','B003'),
	('BD004',4, 'Excelente', 'Gran avance este periodo.', 	'8','B004'),
	('BD005',5, 'Bueno', 'Cumple con la mayoría de tareas.','6','B005'),
	('BD006',6, 'Regular', 'Le falta compromiso.',          '10','B006'),
	('BD007',7, 'Bueno', 'Participa activamente.',          '6','B007'),
	('BD008',8, 'Excelente', 'Trabajo destacado.',          '8','B008'),
	('BD009',9, 'Regular', 'Falta entrega de trabajos.',    '9','B009'),
	('BD010',10, 'Bueno', 'Buen desempeño en ciencias.',    '7','B010'),
	('BD011',11, 'Excelente', 'Excelente desempeño.',       '10','B011'),
	('BD012',12, 'Regular', 'Necesita mejorar conducta.',   '8','B012'),
	('BD013',13, 'Bueno', 'Buen rendimiento.',              '7','B013'),
	('BD014',14, 'Regular', 'Podría mejorar participación.','7','B014'),
	('BD015',15, 'Excelente', 'Alumno destacado.',          '6','B015'),
	('BD016',16, 'Bueno', 'Cumple con los objetivos.',      '5','B016'),
	('BD017',17, 'Regular', 'Necesita apoyo en lectura.',   '5','B017'),
	('BD018',18, 'Excelente', 'Gran desempeño.',            '4','B018'),
	('BD019',19, 'Bueno', 'Entrega tareas a tiempo.',       '4','B019'),
	('BD020',20, 'Regular', 'Debe mejorar en ciencias.',    '3','B020'),
	('BD021',21, 'Bueno', 'Participa en clase.',            '8','B021'),
	('BD022',22, 'Regular', 'Falta compromiso.',            '7','B022'),
	('BD023',23, 'Excelente', 'Excelente desempeño.',       '6','B023'),
	('BD024',24, 'Bueno', 'Buen trabajo en equipo.',        '5','B024'),
	('BD025',25, 'Regular', 'Debe mejorar lectura.',        '5','B025'),
	('BD026',26, 'Bueno', 'Responsable con sus tareas.',    '4','B026'),
	('BD027',27, 'Excelente', 'Gran rendimiento.',          '4','B027'),	
	('BD028',28, 'Regular', 'Necesita motivación.',         '3','B028'),
	('BD029',29, 'Bueno', 'Buen desempeño.',                '3','B029'),
	('BD030',30, 'Excelente', 'Alumno ejemplar.',           '3','B030');
    
INSERT INTO Noticia(ID, Titulo_Noticia, Descripcion, Fecha_Notica, Imagen1, Imagen2, Imagen3, tipo_noticia_id) Values
	('1', 'Lanzamiento de EduMultiPro', 'Se anuncia el lanzamiento de la plataforma EduMultiPro para mejorar la gestión educativa.', '2025-03-15', 'img1.jpg', 'img2.jpg', 'img3.jpg', '1'),
	('2', 'Nueva actualización de Mercaplus', 'La plataforma de control de inventarios Mercaplus recibe mejoras en la interfaz.', '2025-03-14', 'mercaplus1.jpg', NULL, NULL, '2'),
	('3', 'Conferencia sobre tecnología educativa', 'Expertos hablarán sobre el impacto de la tecnología en la educación.', '2025-03-12', 'conf1.jpg', 'conf2.jpg', NULL, '3'),
	('4', 'Taller de desarrollo de software', 'El SENA ofrece un nuevo taller para estudiantes de Análisis y Desarrollo de Software.', '2025-03-10', 'taller1.jpg', NULL, NULL, '4'),
	('5', 'Importancia del reciclaje en las instituciones', 'Se promueve una campaña de reciclaje para reducir el impacto ambiental.', '2025-03-08', 'reciclaje1.jpg', 'reciclaje2.jpg', 'reciclaje3.jpg', '5'),
	('6', 'Eventos académicos en 2025', 'Calendario con los principales eventos educativos y tecnológicos del año.', '2025-03-05', 'evento1.jpg', NULL, NULL, '6');
    
                               