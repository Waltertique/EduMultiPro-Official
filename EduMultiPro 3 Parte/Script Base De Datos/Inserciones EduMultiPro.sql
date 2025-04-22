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
	('1', 'Puntualidad Ejemplar'),
	('2', 'Respeto Constante'),
	('3', 'Actitud Positiva'),
	('4', 'Colaborador del Mes'),
	('5', 'Trabajo en Equipo'),
	('6', 'Responsabilidad Académica'),
	('7', 'Resolución Pacífica de Conflictos'),
	('8', 'Empatía Destacada'),
	('9', 'Liderazgo en el Aula'),
	('10', 'Esfuerzo y Superación');
    
INSERT INTO Valoracion(ID, Nombre_Valoracion) Values
	('1', 'Superior'),
	('2', 'Alta'),
	('3', 'Basico'),
	('4', 'Baja');
    
INSERT INTO Periodo(ID, Nombre_Periodo) Values
	('1', 'Primer Periodo'),
	('2', 'Segundo Periodo'),
	('3', 'Tercer Periodo'),
	('4', 'Cuarto Periodo');
    
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
	('1', 'Juan', 'Alberto', 'Pérez', 'Gómez',          'juan01@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',    'R003', 'D002'),
	('2', 'Maria', 'Elena', 'Rodríguez', 'López',       'maria02@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',   'R003', 'D002'),
	('3', 'Pedro', 'Antonio', 'García', 'Martínez',     'pedro03@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',   'R002', 'D002'),
	('4', 'Laura', 'Isabel', 'Hernández', 'Ramírez',    'laura04@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',   'R002', 'D002'),
	('5', 'Carlos', 'Andrés', 'Torres', 'Moreno',       'carlos05@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',  'R002', 'D002'),
	('6', 'Ana', 'Lucía', 'Ruiz', 'Ortiz',              'ana06@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',     'R002', 'D002'),
	('7', 'Jose', 'Manuel', 'Morales', 'Jiménez',       'jose07@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',    'R002', 'D002'),
	('8', 'Sofia', 'Alejandra', 'Suárez', 'Paredes',    'sofia08@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',    'R002', 'D003'),
	('9', 'David', 'Enrique', 'Castro', 'Rivas',        'david09@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',   'R002', 'D003'),
	('10', 'Paula', 'Andrea', 'Mendoza', 'Vargas',       'paula10@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',   'R002', 'D003'),
                                                           
	('11', 'Lucas', 'Mateo', 'Reyes', 'Córdoba',         'lucas11@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',   'R001', 'D001'),
	('12', 'Valeria', 'Sofía', 'Silva', 'Carrillo',      'valeria12@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646', 'R001', 'D001'),
	('13', 'Diego', 'Esteban', 'Castaño', 'Delgado',     'diego13@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',  'R001', 'D001'),
	('14', 'Camila', 'Gabriela', 'Cruz', 'Salazar',      'camila14@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',  'R001', 'D001'),
	('15', 'Andres', 'Felipe', 'Pineda', 'Barrios',      'andres15@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',   'R001', 'D001'),
	('16', 'Natalia', 'Lorena', 'Rojas', 'Peña',         'natalia16@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646', 'R001', 'D001'),
	('17', 'Sergio', 'Alejandro', 'Peñaloza', 'Navarro', 'sergio17@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',  'R001', 'D001'),
	('18', 'Carolina', 'Fernanda', 'Gómez', 'Quintero',  'carolina18@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646', 'R001', 'D001'),
	('19', 'Felipe', 'Alonso', 'Vargas', 'Maldonado',    'felipe19@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',  'R001', 'D001'),
	('20', 'Daniela', 'Patricia', 'Mejía', 'Castillo',   'daniela20@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',  'R001', 'D001'),
												
	('21', 'Sebastian', 'Iván', 'Ortiz', 'Velásquez',    'sebastian21@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646', 'R001', 'D001'),
	('22', 'Andrea', 'Milena', 'Fernández', 'Rosales',   'andrea22@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',  'R001', 'D001'),
	('23', 'Oscar', 'Eduardo', 'Aguilar', 'Padilla',     'oscar23@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',   'R001', 'D001'),
	('24', 'Alejandra', 'Juliana', 'Benítez', 'Palacios','alejandra24@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646', 'R001', 'D001'),
	('25', 'Enrique', 'Javier', 'León', 'Herrera',       'enrique25@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646', 'R001', 'D001'),
	('26', 'Karen', 'Tatiana', 'Campos', 'Chávez',       'karen26@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',   'R001', 'D001'),
	('27', 'Manuel', 'Jesús', 'Sánchez', 'Figueroa',     'manuel27@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',  'R001', 'D001'),
	('28', 'Isabela', 'María', 'Bautista', 'Gallardo',   'isabela28@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646', 'R001', 'D001'),
	('29', 'Martin', 'Leandro', 'Arango', 'Bermúdez',    'martin29@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',  'R001', 'D001'),
	('30', 'Juliana', 'Natalia', 'Cárdenas', 'Zapata',   'juliana30@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646', 'R001', 'D001'),
                                                       
	('31', 'Leonardo', 'Daniel', 'Valencia', 'Montoya',  'leonardo31@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646', 'R001', 'D001'),
	('32', 'Ximena', 'Carolina', 'Patiño', 'Benavides',  'ximena32@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',  'R001', 'D001'),
	('33', 'Brayan', 'Adrián', 'Nieto', 'Escobar',       'brayan33@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',  'R001', 'D001'),
	('34', 'Nataly', 'Estefanía', 'Palma', 'Cuellar',    'nataly34@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',  'R001', 'D001'),
	('35', 'Ricardo', 'Samuel', 'Barrera', 'Sierra',     'ricardo35@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646', 'R001', 'D001'),
	('36', 'Monica', 'Patricia', 'Delgado', 'Acosta',    'monica36@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',  'R001', 'D001'),
	('37', 'Santiago', 'Emilio', 'Mora', 'Arenas',       'santiago37@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646', 'R001', 'D001'),
	('38', 'Victoria', 'Luciana', 'Estupiñán', 'Cadavid','victoria38@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646', 'R001', 'D001'),
	('39', 'Hugo', 'Francisco', 'Marín', 'Correa',       'hugo39@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',    'R001', 'D001'),
	('40', 'Estefania', 'Paola', 'Guzmán', 'Roldán',     'estefania40@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646', 'R001', 'D001');
    
INSERT INTO Informacion(ID, Correo2, Contacto1, Contacto2, Fecha_Nacimiento, RutaFoto, usuario_id) Values
	('1', 'juan.alt01@gmail.com', '3111111111', '3201111111', '1990-01-15','h5.png'      ,'1'),
	('2', 'maria.alt02@gmail.com', '3122222222', '3212222222', '1988-05-22',null     ,'2'),
	('3', 'pedro.alt03@gmail.com', '3133333333', '3223333333', '1995-07-10','h6.png'     ,'3'),
	('4', 'laura.alt04@gmail.com', '3144444444', '3234444444', '1992-12-01',null     ,'4'),
	('5', 'carlos.alt05@gmail.com', '3155555555', '3245555555', '1985-09-18','h7.png'    ,'5'),
	('6', 'ana.alt06@gmail.com', '3166666666', '3256666666', '1993-03-12',null       ,'6'),
	('7', 'jose.alt07@gmail.com', '3177777777', '3267777777', '1997-08-27','h8.png'      ,'7'),
	('8', 'sofia.alt08@gmail.com', '3188888888', '3278888888', '1991-11-09',null     ,'8'),
	('9', 'david.alt09@gmail.com', '3199999999', '3289999999', '1989-06-14','h9.png'     ,'9'),
	('10', 'paula.alt10@gmail.com', '3101010101', '3291010101', '1994-02-20',null    ,'10'),
                                                                                              
	('11', 'lucas.alt11@gmail.com', '3111111112', '3201111112', '2008-04-05','h10.png'    ,'11'),
	('12', 'valeria.alt12@gmail.com', '3122222223', '3212222223', '2010-07-22',null  ,'12'),
	('13', 'diego.alt13@gmail.com', '3133333334', '3223333334', '2009-01-30','h5.png'    ,'13'),
	('14', 'camila.alt14@gmail.com', '3144444445', '3234444445', '2011-10-11',null   ,'14'),
	('15', 'andres.alt15@gmail.com', '3155555556', '3245555556', '2012-03-25','h6.png'   ,'15'),
	('16', 'natalia.alt16@gmail.com', '3166666667', '3256666667', '2008-05-18',null  ,'16'),
	('17', 'sergio.alt17@gmail.com', '3177777778', '3267777778', '2013-09-29','h7.png'   ,'17'),
	('18', 'carolina.alt18@gmail.com', '3188888889', '3278888889', '2010-12-03',null ,'18'),
	('19', 'felipe.alt19@gmail.com', '3199999900', '3289999900', '2009-02-28','h8.png'   ,'19'),
	('20', 'daniela.alt20@gmail.com', '3101010111', '3291010111', '2011-08-06',null  ,'20'),
																						
	('21', 'sebastian.alt21@gmail.com', '3111111122', '3201111122', '2008-03-17','h9.png','21'),
	('22', 'andrea.alt22@gmail.com', '3122222233', '3212222233', '2010-06-26',null   ,'22'),
	('23', 'oscar.alt23@gmail.com', '3133333344', '3223333344', '2011-09-15','h10.png'    ,'23'),
	('24', 'alejandra.alt24@gmail.com', '3144444455', '3234444455', '2012-04-08',null,'24'),
	('25', 'enrique.alt25@gmail.com', '3155555566', '3245555566', '2013-12-21','h5.png'  ,'25'),
	('26', 'karen.alt26@gmail.com', '3166666677', '3256666677', '2014-01-03',null    ,'26'),
	('27', 'manuel.alt27@gmail.com', '3177777788', '3267777788', '2015-05-12','h6.png'   ,'27'),
	('28', 'isabela.alt28@gmail.com', '3188888899', '3278888899', '2016-07-19',null  ,'28'),
	('29', 'martin.alt29@gmail.com', '3199999000', '3289999000', '2017-11-02','h7.png'   ,'29'),
	('30', 'juliana.alt30@gmail.com', '3101010122', '3291010122', '2018-03-23',null  ,'30'),
																						
	('31', 'leonardo.alt31@gmail.com', '3111111133', '3201111133', '2010-06-10','h8.png' ,'31'),
	('32', 'ximena.alt32@gmail.com', '3122222244', '3212222244', '2011-09-29',null   ,'32'),
	('33', 'brayan.alt33@gmail.com', '3133333355', '3223333355', '2012-01-14','h9.png'   ,'33'),
	('34', 'nataly.alt34@gmail.com', '3144444466', '3234444466', '2013-08-05',null   ,'34'),
	('35', 'ricardo.alt35@gmail.com', '3155555577', '3245555577', '2014-02-17','h10.png'  ,'35'),
	('36', 'monica.alt36@gmail.com', '3166666688', '3256666688', '2015-04-24',null   ,'36'),
	('37', 'santiago.alt37@gmail.com', '3177777799', '3267777799', '2016-11-30','h5.png' ,'37'),
	('38', 'victoria.alt38@gmail.com', '3188888800', '3278888800', '2017-01-07',null ,'38'),
	('39', 'hugo.alt39@gmail.com', '3199999011', '3289999011', '2018-05-13','h6.png'     ,'39'),
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
	('1', 'Examen de Matemáticas - Primer Parcial', 'Se realizará el primer examen parcial el día lunes. Temas: álgebra básica.', 'https://colegio.edu/anuncios/matematicas1', '2025-03-20','A001','3'),
	('2', 'Guía de Estudio Matemáticas', 'Disponible la guía de ejercicios para preparar el examen. Descargar aquí.', 'https://colegio.edu/guias/matematicas1', '2025-03-18','A001','3'),

	-- Lengua Castellana
	('3', 'Entrega de Ensayo - Lengua Castellana', 'Recordatorio: el ensayo de literatura debe entregarse el viernes antes de las 5 p.m.', 'https://colegio.edu/anuncios/castellana1', '2025-03-22','A002','4'),
	('4', 'Nueva Lectura Obligatoria', 'Se ha asignado el libro "Cien años de soledad" para el próximo mes.', 'https://colegio.edu/libros/castellana1', '2025-03-19','A002','4'),

	-- Ciencias Naturales
	('5', 'Práctica de Laboratorio - Ciencias Naturales', 'Actividad práctica de biología sobre el sistema digestivo el miércoles.', 'https://colegio.edu/anuncios/naturales1', '2025-03-23','A003','5'),
	('6', 'Resultados del Taller de Química', 'Revisa tus resultados del taller práctico subidos a la plataforma.', 'https://colegio.edu/resultados/naturales1', '2025-03-25','A003','5'),

	-- Ciencias Sociales
	('7', 'Debate sobre Historia Universal', 'Organización del debate sobre las guerras mundiales en el aula 3.', 'https://colegio.edu/anuncios/sociales1', '2025-03-21','A004','6'),
	('8', 'Taller de Geografía', 'Participa en el taller interactivo de geografía este viernes.', 'https://colegio.edu/talleres/sociales1', '2025-03-20','A004','6'),

	-- Inglés
	('9', 'Examen de Inglés - Verbos Irregulares', 'Evaluación escrita sobre los verbos irregulares el próximo jueves.', 'https://colegio.edu/anuncios/ingles1', '2025-03-24','A005','7'),
	('10', 'Club de Conversación en Inglés', 'Únete al club de conversación los sábados a las 10 a.m.', 'https://colegio.edu/clubs/ingles1', '2025-03-26','A005','7'),

	-- Educación Física
	('11', 'Competencia de Atletismo', 'Se convoca a la competencia anual de atletismo. Inscripciones abiertas.', 'https://colegio.edu/eventos/edufisica1', '2025-03-27','A006','8'),
	('12', 'Clase Especial de Yoga', 'Clase de yoga para mejorar la flexibilidad y concentración.', 'https://colegio.edu/clases/edufisica1', '2025-03-29','A006','8'),

	-- Tecnología e Informática
	('13', 'Taller de Programación en Scratch', 'Aprende los conceptos básicos de programación visual.', 'https://colegio.edu/talleres/tecnologia1', '2025-03-28','A007','9'),
	('14', 'Concurso de Robótica', 'Participa en el concurso de robótica intercolegial.', 'https://colegio.edu/concursos/tecnologia1', '2025-04-01','A007','9'),

	-- Ética y Valores
	('15', 'Foro de Valores Humanos', 'Discusión sobre respeto y responsabilidad ciudadana.', 'https://colegio.edu/foros/etica1', '2025-03-30','A008','10'),
	('16', 'Campaña de Solidaridad', 'Jornada para recaudar alimentos no perecederos.', 'https://colegio.edu/campanas/etica1', '2025-04-02','A008','10'),

	-- Religión
	('17', 'Encuentro Ecuménico', 'Invitación al encuentro interreligioso por la paz.', 'https://colegio.edu/eventos/religion1', '2025-04-03','A009','3'),
	('18', 'Reflexión de Semana Santa', 'Actividades de reflexión y espiritualidad en la Semana Santa.', 'https://colegio.edu/actividades/religion1', '2025-04-05','A009','3'),

	-- Artes
	('19', 'Exposición de Pintura', 'Presentación de las obras realizadas en el taller de arte.', 'https://colegio.edu/exposiciones/artes1', '2025-04-06','A010','4'),
	('20', 'Clase Magistral de Música', 'Sesión especial sobre composición y técnica musical.', 'https://colegio.edu/clases/artes1', '2025-04-08','A010','4'),
    
    -- Matemáticas 2
	('21', 'Examen de Matemáticas - Primer Parcial', 'Se realizará el primer examen parcial el día lunes. Temas: álgebra básica.', 'https://colegio.edu/anuncios/matematicas1', '2025-03-20','A011','5'),
	('22', 'Guía de Estudio Matemáticas', 'Disponible la guía de ejercicios para preparar el examen. Descargar aquí.', 'https://colegio.edu/guias/matematicas1', '2025-03-18','A011','5'),

	-- Lengua Castellana 2
	('23', 'Entrega de Ensayo - Lengua Castellana', 'Recordatorio: el ensayo de literatura debe entregarse el viernes antes de las 5 p.m.', 'https://colegio.edu/anuncios/castellana1', '2025-03-22','A012','6'),
	('24', 'Nueva Lectura Obligatoria', 'Se ha asignado el libro "Cien años de soledad" para el próximo mes.', 'https://colegio.edu/libros/castellana1', '2025-03-19','A012','6'),

	-- Ciencias Naturales 2
	('25', 'Práctica de Laboratorio - Ciencias Naturales', 'Actividad práctica de biología sobre el sistema digestivo el miércoles.', 'https://colegio.edu/anuncios/naturales1', '2025-03-23','A013','7'),
	('26', 'Resultados del Taller de Química', 'Revisa tus resultados del taller práctico subidos a la plataforma.', 'https://colegio.edu/resultados/naturales1', '2025-03-25','A013','7'),

	-- Ciencias Sociales 2
	('27', 'Debate sobre Historia Universal', 'Organización del debate sobre las guerras mundiales en el aula 3.', 'https://colegio.edu/anuncios/sociales1', '2025-03-21','A014','8'),
	('28', 'Taller de Geografía', 'Participa en el taller interactivo de geografía este viernes.', 'https://colegio.edu/talleres/sociales1', '2025-03-20','A014','8'),

	-- Inglés 2
	('29', 'Examen de Inglés - Verbos Irregulares', 'Evaluación escrita sobre los verbos irregulares el próximo jueves.', 'https://colegio.edu/anuncios/ingles1', '2025-03-24','A015','9'),
	('30', 'Club de Conversación en Inglés', 'Únete al club de conversación los sábados a las 10 a.m.', 'https://colegio.edu/clubs/ingles1', '2025-03-26','A015','9'),

	-- Educación Física 2
	('31', 'Competencia de Atletismo', 'Se convoca a la competencia anual de atletismo. Inscripciones abiertas.', 'https://colegio.edu/eventos/edufisica1', '2025-03-27','A016','10'),
	('32', 'Clase Especial de Yoga', 'Clase de yoga para mejorar la flexibilidad y concentración.', 'https://colegio.edu/clases/edufisica1', '2025-03-29','A016','10');
    
INSERT INTO Trabajo(ID, Tema_Trabajo, Titulo_Trabajo, Descripcion_Trabajo, Fecha_Trabajo, Archivo_Trabajo, aula_id) Values
	-- Matemáticas																				
	('1', 'Álgebra Básica', 'Ejercicios de Ecuaciones', 'Resuelve las ecuaciones lineales planteadas en la guía.', '2025-04-10', 'archivos/matematicas_ecuaciones.pdf','A001'),
	('2', 'Geometría', 'Construcción de Figuras Geométricas', 'Dibuja y explica las propiedades de las figuras solicitadas.', '2025-04-15', 'archivos/matematicas_geometria.pdf','A001'),

	-- Lengua Castellana
	('3', 'Ensayo Literario', 'Análisis de Obra', 'Escribe un ensayo sobre el realismo mágico en "Cien años de soledad".', '2025-04-12', 'archivos/castellana_ensayo.docx','A002'),
	('4', 'Gramática', 'Taller de Ortografía', 'Completa los ejercicios de tildación y puntuación.', '2025-04-18', 'archivos/castellana_ortografia.pdf','A002'),

	-- Ciencias Naturales
	('5', 'Biología', 'Informe de Laboratorio - Células', 'Redacta un informe del laboratorio sobre observación de células.', '2025-04-20', 'archivos/naturales_celulas.docx','A003'),
	('6', 'Física', 'Proyecto de Movimiento', 'Expón el proyecto sobre las leyes de Newton en un cartel explicativo.', '2025-04-22', 'archivos/naturales_movimiento.pdf','A003'),

	-- Ciencias Sociales
	('7', 'Historia', 'Línea de Tiempo de la Segunda Guerra Mundial', 'Elabora una línea de tiempo con los eventos más relevantes.', '2025-04-17', 'archivos/sociales_historia.pdf','A004'),
	('8', 'Geografía', 'Mapa Político de América', 'Dibuja un mapa político actualizado de América.', '2025-04-24', 'archivos/sociales_geografia.jpg','A004'),

	-- Inglés
	('9', 'Reading Comprehension', 'Book Report', 'Elabora un reporte sobre el libro leído en inglés.', '2025-04-19', 'archivos/ingles_bookreport.docx','A005'),
	('10', 'Grammar Practice', 'Taller de Verbos Irregulares', 'Resuelve los ejercicios de verbos irregulares.', '2025-04-23', 'archivos/ingles_verbos.pdf','A005'),

	-- Educación Física
	('11', 'Aptitud Física', 'Bitácora de Ejercicio', 'Registra tus actividades físicas durante una semana.', '2025-04-21', 'archivos/edufisica_bitacora.docx','A006'),
	('12', 'Deportes', 'Reglamento del Fútbol', 'Investiga y presenta el reglamento oficial de la FIFA.', '2025-04-26', 'archivos/edufisica_futbol.pdf','A006'),

	-- Tecnología e Informática
	('13', 'Programación', 'Proyecto en Scratch', 'Crea un videojuego educativo en Scratch y adjunta el archivo.', '2025-04-25', 'archivos/tecnologia_scratch.sb3','A007'),
	('14', 'Internet Seguro', 'Presentación sobre Ciberseguridad', 'Diseña una presentación sobre cómo proteger la información personal en línea.', '2025-04-28', 'archivos/tecnologia_ciberseguridad.pptx','A007'),

	-- Ética y Valores
	('15', 'Respeto y Tolerancia', 'Reflexión Personal', 'Escribe un ensayo sobre la importancia del respeto en la convivencia.', '2025-04-27', 'archivos/etica_reflexion.docx','A008'),
	('16', 'Solidaridad', 'Proyecto Comunitario', 'Presenta una propuesta para realizar una campaña de ayuda social.', '2025-04-30', 'archivos/etica_proyecto.pdf','A008'),

	-- Religión
	('17', 'Historia de las Religiones', 'Investigación sobre el Cristianismo', 'Investiga el origen y expansión del cristianismo.', '2025-04-29', 'archivos/religion_cristianismo.docx','A009'),
	('18', 'Valores Espirituales', 'Reflexión sobre la Fe', 'Redacta una reflexión personal sobre la fe en tiempos difíciles.', '2025-05-02', 'archivos/religion_reflexion.docx','A009'),

	-- Artes
	('19', 'Pintura', 'Obra Inspirada en el Renacimiento', 'Realiza una pintura inspirada en los artistas del Renacimiento.', '2025-05-01', 'archivos/artes_pintura.jpg','A010'),
	('20', 'Música', 'Composición Musical', 'Compón una melodía corta e incluye la partitura.', '2025-05-03', 'archivos/artes_musica.pdf','A010'),
    
    -- Matemáticas 2
	('21', 'Álgebra Básica', 'Ejercicios de Ecuaciones', 'Resuelve las ecuaciones lineales planteadas en la guía.', '2025-04-10', 'archivos/matematicas_ecuaciones.pdf','A011'),
	('22', 'Geometría', 'Construcción de Figuras Geométricas', 'Dibuja y explica las propiedades de las figuras solicitadas.', '2025-04-15', 'archivos/matematicas_geometria.pdf','A011'),

	-- Lengua Castellana 2
	('23', 'Ensayo Literario', 'Análisis de Obra', 'Escribe un ensayo sobre el realismo mágico en "Cien años de soledad".', '2025-04-12', 'archivos/castellana_ensayo.docx','A012'),
	('24', 'Gramática', 'Taller de Ortografía', 'Completa los ejercicios de tildación y puntuación.', '2025-04-18', 'archivos/castellana_ortografia.pdf','A012'),

	-- Ciencias Naturales 2
	('25', 'Biología', 'Informe de Laboratorio - Células', 'Redacta un informe del laboratorio sobre observación de células.', '2025-04-20', 'archivos/naturales_celulas.docx','A013'),
	('26', 'Física', 'Proyecto de Movimiento', 'Expón el proyecto sobre las leyes de Newton en un cartel explicativo.', '2025-04-22', 'archivos/naturales_movimiento.pdf','A013'),

	-- Ciencias Sociales 2
	('27', 'Historia', 'Línea de Tiempo de la Segunda Guerra Mundial', 'Elabora una línea de tiempo con los eventos más relevantes.', '2025-04-17', 'archivos/sociales_historia.pdf','A014'),
	('28', 'Geografía', 'Mapa Político de América', 'Dibuja un mapa político actualizado de América.', '2025-04-24', 'archivos/sociales_geografia.jpg','A014'),

	-- Inglés 2
	('29', 'Reading Comprehension', 'Book Report', 'Elabora un reporte sobre el libro leído en inglés.', '2025-04-19', 'archivos/ingles_bookreport.docx','A015'),
	('30', 'Grammar Practice', 'Taller de Verbos Irregulares', 'Resuelve los ejercicios de verbos irregulares.', '2025-04-23', 'archivos/ingles_verbos.pdf','A015'),

	-- Educación Física 2
	('31', 'Aptitud Física', 'Bitácora de Ejercicio', 'Registra tus actividades físicas durante una semana.', '2025-04-21', 'archivos/edufisica_bitacora.docx','A016'),
	('32', 'Deportes', 'Reglamento del Fútbol', 'Investiga y presenta el reglamento oficial de la FIFA.', '2025-04-26', 'archivos/edufisica_futbol.pdf','A016');
  
INSERT INTO TrabajoEntregado(ID, Archivo_Trabajo, Fecha_Trabajo, trabajo_id, usuario_id) Values

	('1', 'archivos/edufisica_bitacora.docx', '2025-04-21', '1', '11'),
	('2', 'archivos/edufisica_futbol.pdf', '2025-04-26', '2', '12'),
    ('3', 'archivos/edufisica_bitacora.docx', '2025-04-21', '3', '13'),
	('4', 'archivos/edufisica_futbol.pd', '2025-04-26', '4', '14');
    
INSERT INTO Comentario(ID, Descripcion, Fecha, trabajo_id, anuncio_id, usuario_id) Values

	('1', 'no entiendo', '2025-04-21', '1', null, '11'),
	('2', 'facilito', '2025-04-26', null, '2', '12'),
    ('3', 'envio mi trabajo', '2025-04-21', '3', null, '13'),
	('4', 'entendido', '2025-04-26', null, '4', '14');
    
INSERT INTO Nota_Trabajo(ID, Nota, trabajo_id, usuario_id) Values
	
	('1', 4.5, '1', '40'),
    ('2', 3.8, '2', '40'),
    ('3', 1.2, '3', '40'),
    ('4', 5.0, '4', '40'),
    
	('5', 4.0, '1', '39'),
	('6', 2.3, '2', '39'),
	('7', 3.7, '3', '39'),
	('8', 4.8, '4', '39'),

	('9', 3.5, '1', '30'),
	('10', 1.6, '2', '30'),
	('11', 5.1, '3', '30'),
	('12', 3.9, '4', '30'),

	('13', 1.7, '1', '38'),
	('14', 3.8, '2', '38'),
	('15', 2.4, '3', '38'),
	('16', 4.0, '4', '38'),

	('17', 3.6, '5', '29'),
	('18', 1.9, '6', '29'),
	('19', 4.2, '7', '29'),
	('20', 5.1, '8', '29'),

	('21', 4.0, '5', '37'),
	('22', 3.7, '6', '37'),
	('23', 1.8, '7', '37'),
	('24', 4.3, '8', '37'),

	('25', 4.4, '5', '28'),
	('26', 2.1, '6', '28'),
	('27', 3.9, '7', '28'),
	('28', 4.5, '8', '28'),

	('29', 3.8, '5', '36'),
	('30', 4.6, '6', '36'),
	('31', 2.0, '7', '36'),
	('32', 5.2, '8', '36'),

	('33', 4.7, '9', '27'),
	('34', 3.9, '10', '27'),
	('35', 1.1, '11', '27'),
	('36', 5.3, '12', '27'),

	('37', 3.6, '9', '35'),
	('38', 4.8, '10', '35'),
	('39', 2.2, '11', '35'),
	('40', 4.0, '12', '35'),

	('41', 1.9, '9', '35'),
	('42', 4.1, '10', '35'),
	('43', 5.3, '11', '35'),
	('44', 4.7, '12', '35'),

	('45', 3.8, '9', '34'),
	('46', 2.4, '10', '34'),
	('47', 3.5, '11', '34'),
	('48', 1.0, '12', '34'),

	('49', 3.9, '13', '25'),
	('50', 4.2, '14', '25'),
	('51', 5.8, '15', '25'),
	('52', 1.1, '16', '25'),

	('53', 2.3, '13', '17'),
	('54', 3.7, '14', '17'),
	('55', 4.9, '15', '17'),
	('56', 1.4, '16', '17'),

	('57', 4.6, '13', '33'),
	('58', 2.0, '14', '33'),
	('59', 3.8, '15', '33'),
	('60', 4.1, '16', '33'),

	('61', 4.7, '13', '15'),
	('62', 3.9, '14', '15'),
	('63', 2.3, '15', '15'),
	('64', 1.5, '16', '15'),

	('65', 4.2, '17', '24'),
	('66', 2.6, '18', '24'),
	('67', 3.8, '19', '24'),
	('68', 1.4, '20', '24'),

	('69', 1.0, '17', '32'),
	('70', 5.1, '18', '32'),
	('71', 4.9, '19', '32'),
	('72', 3.7, '20', '32'),

	('73', 2.5, '17', '23'),
	('74', 4.3, '18', '23'),
	('75', 1.1, '19', '23'),
	('76', 3.8, '20', '23'),

	('77', 2.2, '17', '20'),
	('78', 4.4, '18', '20'),
	('79', 5.0, '19', '20'),
	('80', 4.7, '20', '20'),

	('81', 4.3, '1', '14'),
	('82', 3.9, '2', '14'),
	('83', 4.1, '3', '14'),
	('84', 4.8, '4', '14'),

	('85', 3.7, '1', '31'),
	('86', 4.5, '2', '31'),
	('87', 4.2, '3', '31'),
	('88', 4.6, '4', '31'),

	('89', 4.0, '1', '22'),
	('90', 4.3, '2', '22'),
	('91', 3.8, '3', '22'),
	('92', 4.9, '4', '22'),

	('93', 4.1, '1', '18'),
	('94', 4.4, '2', '18'),
	('95', 3.9, '3', '18'),
	('96', 4.5, '4', '18'),

	('97', 4.6, '5', '12'),
	('98', 2.0, '6', '12'),
	('99', 5.2, '7', '12'),
	('100', 3.8, '8', '12'),

	('101', 1.3, '5', '19'),
	('102', 4.7, '6', '19'),
	('103', 2.1, '7', '19'),
	('104', 3.9, '8', '19'),

	('105', 4.4, '5', '13'),
	('106', 3.5, '6', '13'),
	('107', 5.2, '7', '13'),
	('108', 1.0, '8', '13'),

	('109', 4.8, '9', '21'),
	('110', 3.7, '10', '21'),
	('111', 4.3, '11', '21'),
	('112', 4.1, '12', '21'),
    
	('113', 4.6, '9', '16'),
	('114', 4.2, '10', '16'),
	('115', 3.8, '11', '16'),
	('116', 4.5, '12', '16'),

	('117', 4.9, '9', '11'),
	('118', 4.3, '10', '11'),
	('119', 4.1, '11', '11'),
	('120', 3.9, '12', '11');
    
INSERT INTO Nota_Final(ID, Nota_Final, Inasistencias, materia_id, logro_id, usuario_id) Values

	('1', 4.50, 2, 'M005', '1', '11'),
	('2', 3.80, 1, 'M006', '2', '11'),

	('3', 4.20, 0, 'M003', '3', '12'),
	('4', 3.90, 3, 'M004', '4', '12'),

	('5', 2.95, 5, 'M003', '5', '13'),
	('6', 3.40, 2, 'M004', '6', '13'),

	('7', 4.70, 1, 'M001', '7', '14'),
	('8', 3.95, 0, 'M002', '8', '14'),

	('9', 3.60, 4, 'M007', '9', '15'),
	('10', 4.30, 1, 'M008', '10', '15'),

	('11', 4.85, 3, 'M005', '1', '16'),
	('12', 3.70, 0, 'M006', '2', '16'),

	('13', 2.80, 2, 'M007', '3', '17'),
	('14', 4.20, 1, 'M008', '4', '17'),

	('15', 3.95, 4, 'M001', '5', '18'),
	('16', 3.10, 3, 'M002', '6', '18'),

	('17', 4.40, 0, 'M003', '7', '19'),
	('18', 3.85, 1, 'M004', '8', '19'),

	('19', 3.30, 3, 'M009', '9', '20'),
	('20', 4.55, 1, 'M010', '10', '20'),

	('21', 4.90, 0, 'M005', '1', '21'),
	('22', 4.30, 2, 'M006', '2', '21'),
                            
	('23', 3.55, 1, 'M001', '3', '22'),
	('24', 4.00, 3, 'M002', '4', '22'),
                            
	('25', 2.75, 5, 'M009', '5', '23'),
	('26', 3.80, 1, 'M010', '6', '23'),
                            
	('27', 4.50, 2, 'M009', '7', '24'),
	('28', 4.90, 0, 'M010', '8', '24'),
                            
	('29', 3.10, 4, 'M007', '9', '25'),
	('30', 3.00, 2, 'M008', '10', '25'),

	('31', 4.60, 1, 'M005', '1', '26'),
	('32', 4.05, 0, 'M006', '2', '26'),
                            
	('33', 3.80, 3, 'M005', '3', '27'),
	('34', 3.50, 1, 'M006', '4', '27'),
                            
	('35', 2.85, 5, 'M003', '5', '28'),
	('36', 3.65, 2, 'M004', '6', '28'),
                            
	('37', 4.40, 1, 'M003', '7', '29'),
	('38', 4.55, 0, 'M004', '8', '29'),
                            
	('39', 3.35, 3, 'M001', '9', '30'),
	('40', 4.10, 1, 'M002', '10', '30'),

	('41', 4.15, 2, 'M001', '1', '31'),
	('42', 4.00, 3, 'M002', '2', '31'),
                            
	('43', 3.65, 4, 'M009', '3', '32'),
	('44', 2.90, 2, 'M010', '4', '32'),
                            
	('45', 4.95, 0, 'M007', '5', '33'),
	('46', 4.25, 1, 'M008', '6', '33'),
                            
	('47', 3.45, 5, 'M005', '7', '34'),
	('48', 3.80, 2, 'M006', '8', '34'),
                            
	('49', 4.10, 1, 'M005', '9', '35'),
	('50', 4.50, 0, 'M006', '10', '35'),

	('51', 3.95, 2, 'M003', '1', '36'),
	('52', 4.20, 1, 'M004', '2', '36'),
                            
	('53', 3.00, 4, 'M003', '3', '37'),
	('54', 3.85, 3, 'M004', '4', '37'),
                            
	('55', 4.65, 0, 'M001', '5', '38'),
	('56', 4.30, 2, 'M002', '6', '38'),
                            
	('57', 3.75, 3, 'M001', '7', '39'),
	('58', 3.60, 1, 'M002', '8', '39'),
                            
	('59', 4.90, 0, 'M001', '9', '40'),
	('60', 4.10, 2, 'M002', '10', '40');
    
INSERT INTO Planilla(ID, Planilla_Nombre, periodo_id) Values

	('1', 'Planilla curso 101', '1'),
    ('2', 'Planilla curso 301', '2'),
    ('3', 'Planilla curso 501', '3'),
    ('4', 'Planilla curso 601', '4'),
    ('5', 'Planilla curso 701', '1'),
    ('6', 'Planilla curso 901', '2'),
    ('7', 'Planilla curso 1001', '3'),
    ('8', 'Planilla curso 1101', '4');

INSERT INTO Nota_Planilla(ID, nota_final_id, curso_id, planilla_id) Values

	-- Planilla 1
	('1', '59', 'Q0101M', '1'),
	('2', '60', 'Q0101M', '1'),
                        
	('3', '57', 'Q0101M', '1'),
	('4', '58', 'Q0101M', '1'),
                        
	('5', '39', 'Q0101M', '1'),
	('6', '40', 'Q0101M', '1'),
                        
	('7', '55', 'Q0101M', '1'),
	('8', '56', 'Q0101M', '1'),
	
    -- Planilla 2
	('9', '37', 'Q0301M', '2'),
	('10', '38', 'Q0301M', '2'),
                            
	('11', '53', 'Q0301M', '2'),
	('12', '54', 'Q0301M', '2'),
                            
	('13', '35', 'Q0301M', '2'),
	('14', '36', 'Q0301M', '2'),
                            
	('15', '51', 'Q0301M', '2'),
	('16', '52', 'Q0301M', '2'),
    
	-- Planilla 3
	('17', '33', 'Q0501M', '3'),
	('18', '34', 'Q0501M', '3'),
                            
	('19', '49', 'Q0501M', '3'),
	('20', '50', 'Q0501M', '3'),
                            
	('21', '31', 'Q0501M', '3'),
	('22', '32', 'Q0501M', '3'),
                            
	('23', '47', 'Q0501M', '3'),
	('24', '48', 'Q0501M', '3'),
    
	-- Planilla 4
	('25', '29', 'Q0601T', '4'),
	('26', '30', 'Q0601T', '4'),
                            
	('27', '13', 'Q0601T', '4'),
	('28', '14', 'Q0601T', '4'),
                            
	('29', '45', 'Q0601T', '4'),
	('30', '46', 'Q0601T', '4'),
                            
	('31', '9', 'Q0601T', '4'),
	('32', '10', 'Q0601T', '4'),

	-- Planilla 5
	('33', '27', 'Q0701T', '5'),
	('34', '28', 'Q0701T', '5'),
                            
	('35', '43', 'Q0701T', '5'),
	('36', '44', 'Q0701T', '5'),
                            
	('37', '25', 'Q0701T', '5'),
	('38', '26', 'Q0701T', '5'),
                            
	('39', '19', 'Q0701T', '5'),
	('40', '20', 'Q0701T', '5'),

	-- Planilla 6
	('41', '7', 'Q0901T', '6'),
	('42', '8', 'Q0901T', '6'),
                               
	('43', '41', 'Q0901T', '6'),
	('44', '42', 'Q0901T', '6'),
                            
	('45', '23', 'Q0901T', '6'),
	('46', '24', 'Q0901T', '6'),
                            
	('47', '15', 'Q0901T', '6'),
	('48', '16', 'Q0901T', '6'),
    
	-- Planilla 7
	('49', '3', 'Q1001X', '7'),
	('50', '4', 'Q1001X', '7'),
                               
	('51', '17', 'Q1001X', '7'),
	('52', '18', 'Q1001X', '7'),
                            
	('53', '5', 'Q1001X', '7'),
	('54', '6', 'Q1001X', '7'),
    
	-- Planilla 8
	('55', '21', 'Q1101X', '8'),
	('56', '22', 'Q1101X', '8'),
                            
	('57', '11', 'Q1101X', '8'),
	('58', '12', 'Q1101X', '8'),
                            
	('59', '01', 'Q1101X', '8'),
	('60', '02', 'Q1101X', '8');

INSERT INTO Boletin(ID, Titulo_Boletin, Sede, Anio, Resolucion, Institucion, alumno_id, periodo_id) Values
	
    ('B001', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-001', 'Colegio San Martín', '11', '4'),
	('B002', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-001', 'Colegio San Martín', '12', '3'),
	('B003', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-001', 'Colegio San Martín', '13', '3'),
	('B004', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-001', 'Colegio San Martín', '14', '2'),
	('B005', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-002', 'Colegio San Martín', '15', '4'),
	('B006', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-002', 'Colegio San Martín', '16', '4'),
	('B007', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-002', 'Colegio San Martín', '17', '4'),
	('B008', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-002', 'Colegio San Martín', '18', '2'),
	('B009', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-003', 'Colegio San Martín', '19', '3'),
	('B010', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-003', 'Colegio San Martín', '20', '1'),
	('B011', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-003', 'Colegio San Martín', '21', '4'),
	('B012', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-003', 'Colegio San Martín', '22', '2'),
	('B013', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-004', 'Colegio San Martín', '23', '1'),
	('B014', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-004', 'Colegio San Martín', '24', '1'),
	('B015', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-004', 'Colegio San Martín', '25', '4'),
	('B016', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-004', 'Colegio San Martín', '26', '3'),
	('B017', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-005', 'Colegio San Martín', '27', '3'),
	('B018', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-005', 'Colegio San Martín', '28', '2'),
	('B019', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-005', 'Colegio San Martín', '29', '2'),
	('B020', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-005', 'Colegio San Martín', '30', '1'),
	('B021', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-006', 'Colegio San Martín', '31', '2'),
	('B022', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-006', 'Colegio San Martín', '32', '1'),
	('B023', 'Boletín Final Periodo 4', 'Sede Principal', 2025, 'RES-2025-006', 'Colegio San Martín', '33', '4'),
	('B024', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-006', 'Colegio San Martín', '34', '3'),
	('B025', 'Boletín Final Periodo 3', 'Sede Principal', 2025, 'RES-2025-007', 'Colegio San Martín', '35', '3'),
	('B026', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-007', 'Colegio San Martín', '36', '2'),
	('B027', 'Boletín Final Periodo 2', 'Sede Principal', 2025, 'RES-2025-007', 'Colegio San Martín', '37', '2'),
	('B028', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-007', 'Colegio San Martín', '38', '1'),
	('B029', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-008', 'Colegio San Martín', '39', '1'),
	('B030', 'Boletín Final Periodo 1', 'Sede Principal', 2025, 'RES-2025-008', 'Colegio San Martín', '40', '1');
    
INSERT INTO Boletin_Nota(ID, nota_Final_id, valoracion_id, boletin_id) Values
    
    ('BN001', '1', '1','B001'),
    ('BN002', '2', '2','B001'),

    ('BN003', '3', '3','B002'),
    ('BN004', '4', '4','B002'),

    ('BN005', '5', '1','B003'),
    ('BN006', '6', '2','B003'),
                
    ('BN007', '7', '3','B004'),
    ('BN008', '8', '4','B004'),

    ('BN009', '9', '1','B005'),
    ('BN010', '10', '2','B005'),
                 
    ('BN011', '11', '3','B006'),
    ('BN012', '12', '4','B006'),
 
    ('BN013', '13', '1','B007'),
    ('BN014', '14', '2','B007'),
                 
    ('BN015', '15', '3','B008'),
    ('BN016', '16', '4','B008'),

    ('BN017', '17', '1','B009'),
    ('BN018', '18', '2','B009'),
                 
    ('BN019', '19', '3','B010'),
    ('BN020', '20', '4','B010'),

    ('BN021', '21', '1','B011'),
    ('BN022', '22', '2','B011'),
                 
    ('BN023', '23', '3','B012'),
    ('BN024', '24', '4','B012'),
               
    ('BN025', '25', '1','B013'),
    ('BN026', '26', '2','B013'),
                 
    ('BN027', '27', '3','B014'),
    ('BN028', '28', '4','B014'),
               
    ('BN029', '29', '1','B015'),
    ('BN030', '30', '2','B015'),
                 
    ('BN031', '31', '3','B016'),
    ('BN032', '32', '4','B016'),
               
    ('BN033', '33', '1','B017'),
    ('BN034', '34', '2','B017'),
                 
    ('BN035', '35', '3','B018'),
    ('BN036', '36', '4','B018'),
               
    ('BN037', '37', '1','B019'),
    ('BN038', '38', '2','B019'),
                 
    ('BN039', '39', '3','B020'),
    ('BN040', '40', '4','B020'),
           
    ('BN041', '41', '1','B021'),
    ('BN042', '42', '2','B021'),
                 
    ('BN043', '43', '3','B022'),
    ('BN044', '44', '4','B022'),
             
    ('BN045', '45', '1','B023'),
    ('BN046', '46', '2','B023'),
                 
    ('BN047', '47', '3','B024'),
    ('BN048', '48', '4','B024'),
             
    ('BN049', '49', '1','B025'),
    ('BN050', '50', '2','B025'),
                 
    ('BN051', '51', '3','B026'),
    ('BN052', '52', '4','B026'),
             
    ('BN053', '53', '1','B027'),
    ('BN054', '54', '2','B027'),
                 
    ('BN055', '55', '3','B028'),
    ('BN056', '56', '4','B028'),
             
    ('BN057', '57', '1','B029'),
    ('BN058', '58', '2','B020'),
                 
    ('BN059', '59', '3','B030'),
    ('BN060', '60', '4','B030');
    
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
    
INSERT INTO Noticia (ID, Titulo_Noticia, Encabezado, Descripcion1, Descripcion2, Descripcion3, Fecha_Notica, Imagen1, Imagen2, Imagen3, tipo_noticia_id) VALUES
('1', 'Lanzamiento de EduMultiPro', 'Transformando la gestión educativa con innovación digital.','Apple ha presentado oficialmente su nuevo iPhone con capacidades avanzadas de inteligencia artificial, en un evento que ha generado gran expectativa en el mundo tecnológico. El dispositivo incluye un procesador mejorado, sensores más precisos y nuevas funciones que aprenden del comportamiento del usuario para ofrecer una experiencia más personalizada.',
 'Una de las novedades más destacadas es el asistente inteligente renovado, que no solo responde preguntas sino que también anticipa necesidades, como sugerir rutas menos congestionadas, ajustar automáticamente configuraciones según la hora del día y hasta redactar mensajes con base en el estilo de escritura del usuario. Todo esto se ejecuta localmente, preservando la privacidad del usuario.',
 'Los analistas prevén que esta evolución podría marcar una nueva etapa en la interacción con los smartphones. El lanzamiento estará disponible a nivel mundial a partir del próximo mes, y se espera que motive a otras marcas a acelerar su incorporación de tecnologías basadas en IA.','2025-03-15', 'img1.jpg', 'img2.jpg', 'img3.jpg', '1'),

('2', 'Nueva actualización de Mercaplus', 'Interfaz mejorada para una mejor experiencia del usuario.','Un reciente informe de la organización Global Forest Watch reveló que América Latina ha sufrido uno de los peores aumentos en deforestación de los últimos diez años. Países como Brasil, Colombia y Bolivia han reportado pérdidas masivas de cobertura forestal, principalmente en regiones amazónicas y áreas protegidas.',
 'Se optimizó la carga de productos y el monitoreo de stock.','Estas mejoras responden al feedback de microempresarios locales.','2025-03-14', 'mercaplus1.jpg', NULL, NULL, '2'),

('3', 'Conferencia sobre tecnología educativa', 'Expertos se reúnen para debatir el futuro de la educación digital.','Se hablará sobre plataformas de aprendizaje, inteligencia artificial y más.',
 'La principal causa de este incremento es la expansión agrícola y ganadera, así como la tala ilegal, actividades que continúan creciendo a pesar de las regulaciones existentes. Los incendios forestales también han tenido un impacto significativo, exacerbados por condiciones climáticas extremas asociadas al cambio climático.', 
 'Los expertos advierten que la pérdida de bosques no solo afecta la biodiversidad, sino que también compromete la disponibilidad de agua y la estabilidad climática global. Diversas organizaciones han llamado a reforzar políticas públicas, aumentar la vigilancia satelital y promover prácticas sostenibles con urgencia.','2025-03-12', 'conf1.jpg', 'conf2.jpg', NULL, '3'),

('4', 'Taller de desarrollo de software',  'Oportunidad para potenciar habilidades técnicas en programación.', 'Investigadores de la Universidad de Oxford han desarrollado una vacuna experimental que podría ayudar a prevenir o retrasar la aparición del Alzheimer. Los ensayos en modelos animales han mostrado resultados prometedores, al reducir significativamente la acumulación de proteínas tóxicas asociadas con la enfermedad.',
 'La vacuna actúa estimulando el sistema inmunológico para que elimine de forma más eficiente las placas de beta-amiloide en el cerebro, uno de los principales factores de deterioro cognitivo. A diferencia de otros tratamientos, esta propuesta busca intervenir antes de que aparezcan los síntomas clínicos graves.', 
 'Actualmente se están planificando pruebas en humanos, y si los resultados son positivos, podría representar un avance histórico en la lucha contra las enfermedades neurodegenerativas. A pesar del entusiasmo, los científicos advierten que el proceso de aprobación será largo y requerirá años de seguimiento.','2025-03-10', 'taller1.jpg', NULL, NULL, '4'),

('5', 'Importancia del reciclaje en las instituciones', 'Una iniciativa verde para mejorar la cultura ambiental.','La campaña busca reducir residuos y promover hábitos sostenibles.',
 'Se implementarán puntos de reciclaje en varias sedes educativas.','También se realizarán charlas de concientización y actividades ecológicas.', '2025-03-08', 'reciclaje1.jpg', 'reciclaje2.jpg', 'reciclaje3.jpg', '5'),

('6', 'Eventos académicos en 2025', 'Un año cargado de actividades educativas y tecnológicas.','Entre los eventos destacan ferias científicas y congresos de innovación.',
 'Las instituciones pueden inscribirse para participar con sus proyectos.','Consulta el calendario oficial para conocer fechas y requisitos.','2025-03-05', 'evento1.jpg', NULL, NULL, '6');
    
                               