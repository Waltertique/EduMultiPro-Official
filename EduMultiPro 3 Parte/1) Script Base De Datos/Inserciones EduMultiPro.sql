INSERT INTO Grado(ID, Grado_Nombre, Descripcion_Grado) Values
	('1', 'Primero','grado primero'),
	('2', 'Segundo','grado segundo'),
    ('3', 'Tercero','grado tercero'),
    ('4', 'Cuarto','grado cuarto'),
    ('5', 'Quinto','grado quinto'),
    ('6', 'Sexto','grado sexto'),
    ('7', 'Septimo','grado septimo'),
    ('8', 'Octavo','grado octabo'),
    ('9', 'Noveno','grado noveno'),
    ('10', 'Decimo','grado decimo'),
    ('11', 'Once','grado once');
    
INSERT INTO Jornada(ID, Jornada_Nombre,Descripcion_Jornada) Values
	('1', 'Mañana','jornada mañana'),
    ('2', 'Tarde','jornada tarde'),
    ('3', 'Mixto','jornada mixta');
    
INSERT INTO Materia(ID, Materia_Nombre, Descripcion_Materia) Values
	('1', 'Matemáticas', 'Estudia los números, las operaciones y las estructuras matemáticas básicas.'),
	('2', 'Lengua Castellana', 'Desarrolla habilidades en comprensión lectora, ortografía, gramática y redacción.'),
	('3', 'Ciencias Naturales', 'Explora conceptos fundamentales de la biología, química y física.'),
	('4', 'Ciencias Sociales', 'Analiza la historia, la geografía y la formación ciudadana.'),
	('5', 'Inglés', 'Desarrolla la comprensión y comunicación en el idioma inglés.'),
	('6', 'Educación Física', 'Fomenta la actividad física, el deporte y los hábitos de vida saludable.'),
	('7', 'Tecnología e Informática', 'Estudia el uso de herramientas tecnológicas y la alfabetización digital.'),
	('8', 'Ética y Valores', 'Promueve los principios éticos, morales y la convivencia ciudadana.'),
	('9', 'Religión', 'Aborda el conocimiento de las religiones y el respeto a la diversidad cultural.'),
	('10', 'Artes', 'Desarrolla la creatividad a través de la música, la danza, la pintura y otras expresiones artísticas.');
    
INSERT INTO Curso(ID, Curso_Nombre, grado_id, jornada_id) Values
	('1', '101', '1','1'),
	('2', '301', '3','1'),
	('3', '501', '5','1'),
	('4', '601', '6','2'),
	('5', '701', '7','2'),
	('6', '901', '9','2'),
    ('7', '1001', '10','3'),
    ('8', '1101', '11','3');

INSERT INTO Usuario(ID, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Correo1, Contraseña, Correo2, Contacto1, Contacto2, Fecha_Nacimiento, RutaFoto, rol_id, documento_id) Values
	('1', 'Juan', 'Alberto', 'Pérez', 'Gómez',          'juan01@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',       'juan.alt01@gmail.com', '3111111111', '3201111111', '1990-01-15','h6.png'      ,'R003', 'D002'),
	('2', 'Maria', 'Elena', 'Rodríguez', 'López',       'maria02@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',      'maria.alt02@gmail.com', '3122222222', '3212222222', '1988-05-22','m1.png'         ,'R003', 'D002'),
	('3', 'Pedro', 'Antonio', 'García', 'Martínez',     'pedro03@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',      'pedro.alt03@gmail.com', '3133333333', '3223333333', '1995-07-10','h7.png'     ,'R002', 'D002'),
	('4', 'Laura', 'Isabel', 'Hernández', 'Ramírez',    'laura04@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',      'laura.alt04@gmail.com', '3144444444', '3234444444', '1992-12-01','m2.png'         ,'R002', 'D002'),
	('5', 'Carlos', 'Andrés', 'Torres', 'Moreno',       'carlos05@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',     'carlos.alt05@gmail.com', '3155555555', '3245555555', '1985-09-18','h8.png'    ,'R002', 'D002'),
	('6', 'Ana', 'Lucía', 'Ruiz', 'Ortiz',              'ana06@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',        'ana.alt06@gmail.com', '3166666666', '3256666666', '1993-03-12','m3.png'          ,'R002', 'D002'),
	('7', 'Jose', 'Manuel', 'Morales', 'Jiménez',       'jose07@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',       'jose.alt07@gmail.com', '3177777777', '3267777777', '1997-08-27','h9.png'      ,'R002', 'D002'),
	('8', 'Sofia', 'Alejandra', 'Suárez', 'Paredes',    'sofia08@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',      'sofia.alt08@gmail.com', '3188888888', '3278888888', '1991-11-09','m4.png'         ,'R002', 'D003'),
	('9', 'David', 'Enrique', 'Castro', 'Rivas',        'david09@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',      'david.alt09@gmail.com', '3199999999', '3289999999', '1989-06-14','h10.png'     ,'R002', 'D003'),
	('10', 'Paula', 'Andrea', 'Mendoza', 'Vargas',       'paula10@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',      'paula.alt10@gmail.com', '3101010101', '3291010101', '1994-02-20','m5.png'        ,'R002', 'D003'),
                                                                                                                                                                                                                                                                            
	('11', 'Lucas', 'Mateo', 'Reyes', 'Córdoba',         'lucas11@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',      'lucas.alt11@gmail.com', '3111111112', '3201111112', '2008-04-05','h6.png'   ,'R001', 'D001'),
	('12', 'Valeria', 'Sofía', 'Silva', 'Carrillo',      'valeria12@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',    'valeria.alt12@gmail.com', '3122222223', '3212222223', '2010-07-22','m1.png'      ,'R001', 'D001'),
	('13', 'Diego', 'Esteban', 'Castaño', 'Delgado',     'diego13@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',      'diego.alt13@gmail.com', '3133333334', '3223333334', '2009-01-30','h7.png'    ,'R001', 'D001'),
	('14', 'Camila', 'Gabriela', 'Cruz', 'Salazar',      'camila14@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',     'camila.alt14@gmail.com', '3144444445', '3234444445', '2011-10-11','m2.png'       ,'R001', 'D001'),
	('15', 'Andres', 'Felipe', 'Pineda', 'Barrios',      'andres15@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',     'andres.alt15@gmail.com', '3155555556', '3245555556', '2012-03-25','h8.png'   ,'R001', 'D001'),
	('16', 'Natalia', 'Lorena', 'Rojas', 'Peña',         'natalia16@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',    'natalia.alt16@gmail.com', '3166666667', '3256666667', '2008-05-18','m3.png'      ,'R001', 'D001'),
	('17', 'Sergio', 'Alejandro', 'Peñaloza', 'Navarro', 'sergio17@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',     'sergio.alt17@gmail.com', '3177777778', '3267777778', '2013-09-29','h9.png'   ,'R001', 'D001'),
	('18', 'Carolina', 'Fernanda', 'Gómez', 'Quintero',  'carolina18@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',   'carolina.alt18@gmail.com', '3188888889', '3278888889', '2010-12-03','m4.png'     ,'R001', 'D001'),
	('19', 'Felipe', 'Alonso', 'Vargas', 'Maldonado',    'felipe19@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',     'felipe.alt19@gmail.com', '3199999900', '3289999900', '2009-02-28','h10.png'   ,'R001', 'D001'),
	('20', 'Daniela', 'Patricia', 'Mejía', 'Castillo',   'daniela20@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',    'daniela.alt20@gmail.com', '3101010111', '3291010111', '2011-08-06','m5.png'      ,'R001', 'D001'),
												                                                                                                                                            																			
	('21', 'Sebastian', 'Iván', 'Ortiz', 'Velásquez',    'sebastian21@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',  'sebastian.alt21@gmail.com', '3111111122', '3201111122', '2008-03-17','h6.png','R001', 'D001'),
	('22', 'Andrea', 'Milena', 'Fernández', 'Rosales',   'andrea22@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',     'andrea.alt22@gmail.com', '3122222233', '3212222233', '2010-06-26','m1.png'       ,'R001', 'D001'),
	('23', 'Oscar', 'Eduardo', 'Aguilar', 'Padilla',     'oscar23@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',      'oscar.alt23@gmail.com', '3133333344', '3223333344', '2011-09-15','h7.png'   ,'R001', 'D001'),
	('24', 'Alejandra', 'Juliana', 'Benítez', 'Palacios','alejandra24@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',  'alejandra.alt24@gmail.com', '3144444455', '3234444455', '2012-04-08','m2.png'    ,'R001', 'D001'),
	('25', 'Enrique', 'Javier', 'León', 'Herrera',       'enrique25@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',    'enrique.alt25@gmail.com', '3155555566', '3245555566', '2013-12-21','h8.png'  ,'R001', 'D001'),
	('26', 'Karen', 'Tatiana', 'Campos', 'Chávez',       'karen26@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',      'karen.alt26@gmail.com', '3166666677', '3256666677', '2014-01-03','m3.png'        ,'R001', 'D001'),
	('27', 'Manuel', 'Jesús', 'Sánchez', 'Figueroa',     'manuel27@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',     'manuel.alt27@gmail.com', '3177777788', '3267777788', '2015-05-12','h9.png'   ,'R001', 'D001'),
	('28', 'Isabela', 'María', 'Bautista', 'Gallardo',   'isabela28@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',    'isabela.alt28@gmail.com', '3188888899', '3278888899', '2016-07-19','m4.png'      ,'R001', 'D001'),
	('29', 'Martin', 'Leandro', 'Arango', 'Bermúdez',    'martin29@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',     'martin.alt29@gmail.com', '3199999000', '3289999000', '2017-11-02','h10.png'   ,'R001', 'D001'),
	('30', 'Juliana', 'Natalia', 'Cárdenas', 'Zapata',   'juliana30@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',    'juliana.alt30@gmail.com', '3101010122', '3291010122', '2018-03-23','m5.png'      ,'R001', 'D001'),
                                                                                                                                                                                            																			
	('31', 'Leonardo', 'Daniel', 'Valencia', 'Montoya',  'leonardo31@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',   'leonardo.alt31@gmail.com', '3111111133', '3201111133', '2010-06-10','h6.png' ,'R001', 'D001'),
	('32', 'Ximena', 'Carolina', 'Patiño', 'Benavides',  'ximena32@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',     'ximena.alt32@gmail.com', '3122222244', '3212222244', '2011-09-29','m1.png'       ,'R001', 'D001'),
	('33', 'Brayan', 'Adrián', 'Nieto', 'Escobar',       'brayan33@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',     'brayan.alt33@gmail.com', '3133333355', '3223333355', '2012-01-14','h7.png'   ,'R001', 'D001'),
	('34', 'Nataly', 'Estefanía', 'Palma', 'Cuellar',    'nataly34@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',     'nataly.alt34@gmail.com', '3144444466', '3234444466', '2013-08-05','m2.png'       ,'R001', 'D001'),
	('35', 'Ricardo', 'Samuel', 'Barrera', 'Sierra',     'ricardo35@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',    'ricardo.alt35@gmail.com', '3155555577', '3245555577', '2014-02-17','h8.png' ,'R001', 'D001'),
	('36', 'Monica', 'Patricia', 'Delgado', 'Acosta',    'monica36@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',     'monica.alt36@gmail.com', '3166666688', '3256666688', '2015-04-24','m3.png'       ,'R001', 'D001'),
	('37', 'Santiago', 'Emilio', 'Mora', 'Arenas',       'santiago37@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',   'santiago.alt37@gmail.com', '3177777799', '3267777799', '2016-11-30','h9.png' ,'R001', 'D001'),
	('38', 'Victoria', 'Luciana', 'Estupiñán', 'Cadavid','victoria38@gmail.com', '$2b$10$O15vwcJY2AqN66oLwbH/Kuew7xjKhOksgZLfxylJ23S.asJOSYCqK',   'victoria.alt38@gmail.com', '3188888800', '3278888800', '2017-01-07','m4.png'     ,'R001', 'D001'),
	('39', 'Hugo', 'Francisco', 'Marín', 'Correa',       'hugo39@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',       'hugo.alt39@gmail.com', '3199999011', '3289999011', '2018-05-13','h10.png'     ,'R004', 'D001'),
	('40', 'Estefania', 'Paola', 'Guzmán', 'Roldán',     'estefania40@gmail.com', 'pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646',  'estefania.alt40@gmail.com', '3101010133', '3291010133', '2019-12-25','m5.png'    ,'R001', 'D001');
    
INSERT INTO Miembros_Curso(usuario_id, curso_id) Values
	('3', '1'),
	('4', '2'),
	('5', '3'),
	('6', '4'),
	('7', '5'),
	('8', '6'),
	('9', '7'),
	('10', '8'),

	('11', '8'),
	('12', '7'),
	('13', '7'),
	('14', '6'),
	('15', '4'),
	('16', '8'),
	('17', '4'),
	('18', '6'),
	('19', '7'),
	('20', '5'),
      
	('21', '8'),
	('22', '6'),
	('23', '5'),
	('24', '5'),
	('25', '4'),
	('26', '3'),
	('27', '3'),
	('28', '2'),
	('29', '2'),
	('30', '1'),
      
	('31', '6'),
	('32', '5'),
	('33', '4'),
	('34', '3'),
	('35', '3'),
	('36', '2'),
	('37', '2'),
	('38', '1'),
	('39', '1'),
	('40', '1');
    
INSERT INTO Horario(ID, Titulo_Horario, Imagen_Horario, Descripcion_Horario, profesor_id, curso_id) Values
	('1', 'Horario Primero', 'f4.png', 'Horario académico del grado primero para el año 2025. Incluye materias básicas y actividades lúdicas.', null, '1'),
	('2', 'Horario Tercero', 'imghorario.png', 'Horario académico del grado tercero, con énfasis en lectura comprensiva y matemáticas.', null, '2'),
	('3', 'Horario Quinto', 'f4.png', 'Horario académico del grado quinto, con materias de ciencias naturales y sociales reforzadas.', null, '3'),
	('4', 'Horario Sexto', 'imghorario.png', 'Horario académico del grado sexto, inicio de secundaria básica con materias obligatorias y talleres.', null, '4'),
	('5', 'Horario Séptimo', 'f4.png', 'Horario académico del grado séptimo, incluye introducción a la tecnología y proyectos colaborativos.', null, '5'),
	('6', 'Horario Noveno', 'imghorario.png', 'Horario académico del grado noveno, incluye asignaturas avanzadas y orientación vocacional.', null, '6'),
	('7', 'Horario Décimo', 'f4.png', 'Horario académico del grado décimo, prepara a los estudiantes para pruebas de estado y competencias técnicas.', null, '7'),
	('8', 'Horario Once', 'imghorario.png', 'Horario académico del grado once, incluye énfasis en formación preuniversitaria y preparación para la vida laboral.', null, '8');
    
INSERT INTO Aula(ID, Aula_Nombre, materia_id, usuario_id, curso_id) Values
	('1', 'Aula Matemáticas 101', '1', '2', '1'),
    ('2', 'Aula Lengua Castellana 101', '2', '3', '1'),
    ('3', 'Aula Ciencias Naturales 301', '3', '4', '2'),
    ('4', 'Aula Ciencias Sociales 301', '4', '5', '2'),
    ('5', 'Aula Inglés 501', '5', '6', '3'),
    ('6', 'Aula Educación Física 501', '6', '7', '3'),
    ('7', 'Aula Tecnología 601', '7', '8', '4'),
    ('8', 'Aula Ética 601', '8', '9', '4'),
    ('9', 'Aula Religión 701', '9', '10', '5'),
    ('10', 'Aula Artes 701', '10', '3', '5'),
    ('11', 'Aula Matemáticas 901', '1', '4', '6'),
    ('12', 'Aula Lengua Castellana 901', '2', '5', '6'),
    ('13', 'Aula Ciencias Naturales 1001', '3', '6', '7'),
    ('14', 'Aula Ciencias Sociales 1001', '4', '7', '7'),
    ('15', 'Aula Inglés 1101', '5', '8', '8'),
    ('16', 'Aula Educación Física 1101', '9', '9', '8');
    
INSERT INTO Anuncio(ID, Titulo_Anuncio, Descripcion_Anuncio, Enlace_Anuncio, Fecha_Anuncio, aula_id, usuario_id) Values
	-- Matemáticas
	('1', 'Examen de Matemáticas - Primer Parcial', 'Se realizará el primer examen parcial el día lunes. Temas: álgebra básica.', 'https://colegio.edu/anuncios/matematicas1', '2025-03-20','1','2'),
	('2', 'Guía de Estudio Matemáticas', 'Disponible la guía de ejercicios para preparar el examen. Descargar aquí.', 'https://colegio.edu/guias/matematicas1', '2025-03-18','1','2'),

	-- Lengua Castellana
	('3', 'Entrega de Ensayo - Lengua Castellana', 'Recordatorio: el ensayo de literatura debe entregarse el viernes antes de las 5 p.m.', 'https://colegio.edu/anuncios/castellana1', '2025-03-22','2','3'),
	('4', 'Nueva Lectura Obligatoria', 'Se ha asignado el libro "Cien años de soledad" para el próximo mes.', 'https://colegio.edu/libros/castellana1', '2025-03-19','2','3'),

	-- Ciencias Naturales
	('5', 'Práctica de Laboratorio - Ciencias Naturales', 'Actividad práctica de biología sobre el sistema digestivo el miércoles.', 'https://colegio.edu/anuncios/naturales1', '2025-03-23','3','4'),
	('6', 'Resultados del Taller de Química', 'Revisa tus resultados del taller práctico subidos a la plataforma.', 'https://colegio.edu/resultados/naturales1', '2025-03-25','3','4'),

	-- Ciencias Sociales
	('7', 'Debate sobre Historia Universal', 'Organización del debate sobre las guerras mundiales en el aula 3.', 'https://colegio.edu/anuncios/sociales1', '2025-03-21','4','5'),
	('8', 'Taller de Geografía', 'Participa en el taller interactivo de geografía este viernes.', 'https://colegio.edu/talleres/sociales1', '2025-03-20','4','5'),

	-- Inglés
	('9', 'Examen de Inglés - Verbos Irregulares', 'Evaluación escrita sobre los verbos irregulares el próximo jueves.', 'https://colegio.edu/anuncios/ingles1', '2025-03-24','5','6'),
	('10', 'Club de Conversación en Inglés', 'Únete al club de conversación los sábados a las 10 a.m.', 'https://colegio.edu/clubs/ingles1', '2025-03-26','5','6'),

	-- Educación Física
	('11', 'Competencia de Atletismo', 'Se convoca a la competencia anual de atletismo. Inscripciones abiertas.', 'https://colegio.edu/eventos/edufisica1', '2025-03-27','6','7'),
	('12', 'Clase Especial de Yoga', 'Clase de yoga para mejorar la flexibilidad y concentración.', 'https://colegio.edu/clases/edufisica1', '2025-03-29','6','7'),

	-- Tecnología e Informática
	('13', 'Taller de Programación en Scratch', 'Aprende los conceptos básicos de programación visual.', 'https://colegio.edu/talleres/tecnologia1', '2025-03-28','7','8'),
	('14', 'Concurso de Robótica', 'Participa en el concurso de robótica intercolegial.', 'https://colegio.edu/concursos/tecnologia1', '2025-04-01','7','8'),

	-- Ética y Valores
	('15', 'Foro de Valores Humanos', 'Discusión sobre respeto y responsabilidad ciudadana.', 'https://colegio.edu/foros/etica1', '2025-03-30','8','9'),
	('16', 'Campaña de Solidaridad', 'Jornada para recaudar alimentos no perecederos.', 'https://colegio.edu/campanas/etica1', '2025-04-02','8','9'),

	-- Religión
	('17', 'Encuentro Ecuménico', 'Invitación al encuentro interreligioso por la paz.', 'https://colegio.edu/eventos/religion1', '2025-04-03','9','10'),
	('18', 'Reflexión de Semana Santa', 'Actividades de reflexión y espiritualidad en la Semana Santa.', 'https://colegio.edu/actividades/religion1', '2025-04-05','9','10'),

	-- Artes
	('19', 'Exposición de Pintura', 'Presentación de las obras realizadas en el taller de arte.', 'https://colegio.edu/exposiciones/artes1', '2025-04-06','10','3'),
	('20', 'Clase Magistral de Música', 'Sesión especial sobre composición y técnica musical.', 'https://colegio.edu/clases/artes1', '2025-04-08','10','3'),
    
    -- Matemáticas 2
	('21', 'Examen de Matemáticas - Primer Parcial', 'Se realizará el primer examen parcial el día lunes. Temas: álgebra básica.', 'https://colegio.edu/anuncios/matematicas1', '2025-03-20','11','4'),
	('22', 'Guía de Estudio Matemáticas', 'Disponible la guía de ejercicios para preparar el examen. Descargar aquí.', 'https://colegio.edu/guias/matematicas1', '2025-03-18','11','4'),

	-- Lengua Castellana 2
	('23', 'Entrega de Ensayo - Lengua Castellana', 'Recordatorio: el ensayo de literatura debe entregarse el viernes antes de las 5 p.m.', 'https://colegio.edu/anuncios/castellana1', '2025-03-22','12','5'),
	('24', 'Nueva Lectura Obligatoria', 'Se ha asignado el libro "Cien años de soledad" para el próximo mes.', 'https://colegio.edu/libros/castellana1', '2025-03-19','12','5'),

	-- Ciencias Naturales 2
	('25', 'Práctica de Laboratorio - Ciencias Naturales', 'Actividad práctica de biología sobre el sistema digestivo el miércoles.', 'https://colegio.edu/anuncios/naturales1', '2025-03-23','13','6'),
	('26', 'Resultados del Taller de Química', 'Revisa tus resultados del taller práctico subidos a la plataforma.', 'https://colegio.edu/resultados/naturales1', '2025-03-25','13','6'),

	-- Ciencias Sociales 2
	('27', 'Debate sobre Historia Universal', 'Organización del debate sobre las guerras mundiales en el aula 3.', 'https://colegio.edu/anuncios/sociales1', '2025-03-21','14','7'),
	('28', 'Taller de Geografía', 'Participa en el taller interactivo de geografía este viernes.', 'https://colegio.edu/talleres/sociales1', '2025-03-20','14','7'),

	-- Inglés 2
	('29', 'Examen de Inglés - Verbos Irregulares', 'Evaluación escrita sobre los verbos irregulares el próximo jueves.', 'https://colegio.edu/anuncios/ingles1', '2025-03-24','15','8'),
	('30', 'Club de Conversación en Inglés', 'Únete al club de conversación los sábados a las 10 a.m.', 'https://colegio.edu/clubs/ingles1', '2025-03-26','15','8'),

	-- Educación Física 2
	('31', 'Competencia de Atletismo', 'Se convoca a la competencia anual de atletismo. Inscripciones abiertas.', 'https://colegio.edu/eventos/edufisica1', '2025-03-27','16','9'),
	('32', 'Clase Especial de Yoga', 'Clase de yoga para mejorar la flexibilidad y concentración.', 'https://colegio.edu/clases/edufisica1', '2025-03-29','16','9');
    
INSERT INTO Trabajo(ID, Titulo_Trabajo, Descripcion_Trabajo, Fecha_Trabajo, aula_id) Values
	-- Matemáticas																				
	('1', 'Ejercicios de Ecuaciones', 'Resuelve las ecuaciones lineales planteadas en la guía.', '2025-04-10','1'),
	('2', 'Construcción de Figuras Geométricas', 'Dibuja y explica las propiedades de las figuras solicitadas.', '2025-04-15','1'),

	-- Lengua Castellana
	('3', 'Análisis de Obra', 'Escribe un ensayo sobre el realismo mágico en "Cien años de soledad".', '2025-04-12', '2'),
	('4', 'Taller de Ortografía', 'Completa los ejercicios de tildación y puntuación.', '2025-04-18', '2'),

	-- Ciencias Naturales
	('5', 'Informe de Laboratorio - Células', 'Redacta un informe del laboratorio sobre observación de células.', '2025-04-20', '3'),
	('6', 'Proyecto de Movimiento', 'Expón el proyecto sobre las leyes de Newton en un cartel explicativo.', '2025-04-22', '3'),

	-- Ciencias Sociales
	('7', 'Línea de Tiempo de la Segunda Guerra Mundial', 'Elabora una línea de tiempo con los eventos más relevantes.', '2025-04-17', '4'),
	('8', 'Mapa Político de América', 'Dibuja un mapa político actualizado de América.', '2025-04-24', '4'),

	-- Inglés
	('9', 'Book Report', 'Elabora un reporte sobre el libro leído en inglés.', '2025-04-19', '5'),
	('10', 'Taller de Verbos Irregulares', 'Resuelve los ejercicios de verbos irregulares.', '2025-04-23', '5'),

	-- Educación Física
	('11', 'Bitácora de Ejercicio', 'Registra tus actividades físicas durante una semana.', '2025-04-21', '6'),
	('12', 'Reglamento del Fútbol', 'Investiga y presenta el reglamento oficial de la FIFA.', '2025-04-26', '6'),

	-- Tecnología e Informática
	('13', 'Proyecto en Scratch', 'Crea un videojuego educativo en Scratch y adjunta el archivo.', '2025-04-25', '7'),
	('14', 'Presentación sobre Ciberseguridad', 'Diseña una presentación sobre cómo proteger la información personal en línea.', '2025-04-28', '7'),

	-- Ética y Valores
	('15', 'Reflexión Personal', 'Escribe un ensayo sobre la importancia del respeto en la convivencia.', '2025-04-27', '8'),
	('16', 'Proyecto Comunitario', 'Presenta una propuesta para realizar una campaña de ayuda social.', '2025-04-30', '8'),

	-- Religión
	('17', 'Investigación sobre el Cristianismo', 'Investiga el origen y expansión del cristianismo.', '2025-04-29','9'),
	('18', 'Reflexión sobre la Fe', 'Redacta una reflexión personal sobre la fe en tiempos difíciles.', '2025-05-02', '9'),

	-- Artes
	('19', 'Obra Inspirada en el Renacimiento', 'Realiza una pintura inspirada en los artistas del Renacimiento.', '2025-05-01', '10'),
	('20', 'Composición Musical', 'Compón una melodía corta e incluye la partitura.', '2025-05-03', '10'),
    
    -- Matemáticas 2
	('21', 'Ejercicios de Ecuaciones', 'Resuelve las ecuaciones lineales planteadas en la guía.', '2025-04-10', '11'),
	('22', 'Construcción de Figuras Geométricas', 'Dibuja y explica las propiedades de las figuras solicitadas.', '2025-04-15', '11'),

	-- Lengua Castellana 2
	('23', 'Análisis de Obra', 'Escribe un ensayo sobre el realismo mágico en "Cien años de soledad".', '2025-04-12', '12'),
	('24', 'Taller de Ortografía', 'Completa los ejercicios de tildación y puntuación.', '2025-04-18', '12'),

	-- Ciencias Naturales 2
	('25', 'Informe de Laboratorio - Células', 'Redacta un informe del laboratorio sobre observación de células.', '2025-04-20', '13'),
	('26', 'Proyecto de Movimiento', 'Expón el proyecto sobre las leyes de Newton en un cartel explicativo.', '2025-04-22', '13'),

	-- Ciencias Sociales 2
	('27', 'Línea de Tiempo de la Segunda Guerra Mundial', 'Elabora una línea de tiempo con los eventos más relevantes.', '2025-04-17', '14'),
	('28', 'Mapa Político de América', 'Dibuja un mapa político actualizado de América.', '2025-04-24', '14'),

	-- Inglés 2
	('29', 'Book Report', 'Elabora un reporte sobre el libro leído en inglés.', '2025-04-19', '15'),
	('30',  'Taller de Verbos Irregulares', 'Resuelve los ejercicios de verbos irregulares.', '2025-04-23', '15'),

	-- Educación Física 2
	('31', 'Bitácora de Ejercicio', 'Registra tus actividades físicas durante una semana.', '2025-04-21', '16'),
	('32', 'Reglamento del Fútbol', 'Investiga y presenta el reglamento oficial de la FIFA.', '2025-04-26', '16');
    
INSERT INTO Trabajo_Archivo(ID, trabajo_id, ruta_archivo, nombre_original) values 
	('1','1','archivos/matematicas_ecuaciones.pdf','trabajo 1'),
    ('2','2','archivos/matematicas_geometria.pdf','trabajo 2'),
    ('3','3','archivos/castellana_ensayo.docx','trabajo 3'),
    ('4','4','archivos/castellana_ortografia.pdf','trabajo 4'),
    ('5','5','archivos/naturales_celulas.docx','trabajo 5'),
    ('6','6','archivos/naturales_movimiento.pdf','trabajo 6'),
    ('7','7','archivos/sociales_historia.pdf','trabajo 7'),
    ('8','8','archivos/sociales_geografia.jpg','trabajo 8'),
    ('9','9','archivos/ingles_bookreport.docx','trabajo 9'),
    ('10','10','archivos/ingles_verbos.pdf','trabajo 10'),
    ('11','11','archivos/edufisica_bitacora.docx','trabajo 11'),
    ('12','12','archivos/edufisica_futbol.pdf','trabajo 12'),
    ('13','13','archivos/tecnologia_scratch.sb3','trabajo 13'),
    ('14','14','archivos/tecnologia_ciberseguridad.pptx','trabajo 14'),
    ('15','15','archivos/etica_reflexion.docx','trabajo 15'),
    ('16','16','archivos/etica_proyecto.pdf','trabajo 16'),
    ('17','17','archivos/etica_proyecto.pdf','trabajo 17'),
    ('18','18','archivos/etica_proyecto.pdf','trabajo 18'),
    ('19','19','archivos/etica_proyecto.pdf','trabajo 19'),
    ('20','20','archivos/etica_proyecto.pdf','trabajo 20'),
    ('21','21','archivos/etica_proyecto.pdf','trabajo 21'),
    ('22','22','archivos/etica_proyecto.pdf','trabajo 22'),
    ('23','23','archivos/etica_proyecto.pdf','trabajo 23'),
    ('24','24','archivos/etica_proyecto.pdf','trabajo 24'),
    ('25','25','archivos/etica_proyecto.pdf','trabajo 25'),
    ('26','26','archivos/etica_proyecto.pdf','trabajo 26'),
    ('27','27','archivos/etica_proyecto.pdf','trabajo 27'),
    ('28','28','archivos/etica_proyecto.pdf','trabajo 28'),
    ('29','29','archivos/etica_proyecto.pdf','trabajo 29'),
    ('30','30','archivos/etica_proyecto.pdf','trabajo 30'),
    ('31','31','archivos/etica_proyecto.pdf','trabajo 31'),
    ('32','32','archivos/etica_proyecto.pdf','trabajo 32');
  
INSERT INTO TrabajoEntregado(ID, Fecha_Trabajo, Nota, trabajo_id, usuario_id) Values

	('1', '2025-04-21', 4.5, '1', '3'),
	('2', '2020-06-26', 2.5, '1', '30'),
    ('3', '2024-02-21', 3.5, '2', '38'),
	('4', '2022-05-26', 2.0, '2', '39'),
    ('5', '2023-07-2', 3.3, '3', '3'),
    ('6', '2025-03-18', 4.4, '3', '30'),
    ('7', '2021-010-30', 1.1, '4', '38');
    
INSERT INTO TrabajoEntregado_Archivo(ID, trabajo_entregado_id, ruta_archivo, nombre_original) Values

	('1', '1','archivos/edufisica_bitacora.docx','trabajo entregado 1'),
    ('2', '1','archivos/edufisica_bitacora.docx','trabajo entregado 1.1'),
    ('3', '2','archivos/edufisica_futbol.pdf','trabajo entregado 2'),
    ('4', '3','archivos/edufisica_bitacora.docx','trabajo entregado 3'),
    ('5', '4','archivos/edufisica_futbol.pd','trabajo entregado 4'),
    ('6', '5','archivos/edufisica_futbol.pd','trabajo entregado 5'),
    ('7', '6','archivos/edufisica_futbol.pd','trabajo entregado 6'),
    ('8', '7','archivos/edufisica_futbol.pd','trabajo entregado 7');
    
INSERT INTO Comentario(ID, Descripcion, Fecha, trabajo_id, anuncio_id, usuario_id) Values

	('1', 'no entiendo', '2025-04-21', '1', null, '11'),
	('2', 'facilito', '2025-04-26', null, '2', '12'),
    ('3', 'envio mi trabajo', '2025-04-21', '3', null, '13'),
	('4', 'entendido', '2025-04-26', null, '4', '14');
    
INSERT INTO Noticia (ID, Titulo_Noticia, Encabezado, Descripcion1, Descripcion2, Descripcion3, Fecha_Notica, Imagen1, Imagen2, Imagen3, tipo_noticia_id) VALUES
('1', 'Lanzamiento de EduMultiPro', 'Transformando la gestión educativa con innovación digital.','Apple ha presentado oficialmente su nuevo iPhone con capacidades avanzadas de inteligencia artificial, en un evento que ha generado gran expectativa en el mundo tecnológico. El dispositivo incluye un procesador mejorado, sensores más precisos y nuevas funciones que aprenden del comportamiento del usuario para ofrecer una experiencia más personalizada.',
 'Una de las novedades más destacadas es el asistente inteligente renovado, que no solo responde preguntas sino que también anticipa necesidades, como sugerir rutas menos congestionadas, ajustar automáticamente configuraciones según la hora del día y hasta redactar mensajes con base en el estilo de escritura del usuario. Todo esto se ejecuta localmente, preservando la privacidad del usuario.',
 'Los analistas prevén que esta evolución podría marcar una nueva etapa en la interacción con los smartphones. El lanzamiento estará disponible a nivel mundial a partir del próximo mes, y se espera que motive a otras marcas a acelerar su incorporación de tecnologías basadas en IA.','2025-03-15', '1.png', 'd3.png', '1.png', '1'),

('2', 'Nueva actualización de Mercaplus', 'Interfaz mejorada para una mejor experiencia del usuario.','Un reciente informe de la organización Global Forest Watch reveló que América Latina ha sufrido uno de los peores aumentos en deforestación de los últimos diez años. Países como Brasil, Colombia y Bolivia han reportado pérdidas masivas de cobertura forestal, principalmente en regiones amazónicas y áreas protegidas.',
 'Se optimizó la carga de productos y el monitoreo de stock.','Estas mejoras responden al feedback de microempresarios locales.','2025-03-14', '2.png', 'd4.png', '2.png', '2'),

('3', 'Conferencia sobre tecnología educativa', 'Expertos se reúnen para debatir el futuro de la educación digital.','Se hablará sobre plataformas de aprendizaje, inteligencia artificial y más.',
 'La principal causa de este incremento es la expansión agrícola y ganadera, así como la tala ilegal, actividades que continúan creciendo a pesar de las regulaciones existentes. Los incendios forestales también han tenido un impacto significativo, exacerbados por condiciones climáticas extremas asociadas al cambio climático.', 
 'Los expertos advierten que la pérdida de bosques no solo afecta la biodiversidad, sino que también compromete la disponibilidad de agua y la estabilidad climática global. Diversas organizaciones han llamado a reforzar políticas públicas, aumentar la vigilancia satelital y promover prácticas sostenibles con urgencia.','2025-03-12', '3.png', 'd5.png', '3.png', '3'),

('4', 'Taller de desarrollo de software',  'Oportunidad para potenciar habilidades técnicas en programación.', 'Investigadores de la Universidad de Oxford han desarrollado una vacuna experimental que podría ayudar a prevenir o retrasar la aparición del Alzheimer. Los ensayos en modelos animales han mostrado resultados prometedores, al reducir significativamente la acumulación de proteínas tóxicas asociadas con la enfermedad.',
 'La vacuna actúa estimulando el sistema inmunológico para que elimine de forma más eficiente las placas de beta-amiloide en el cerebro, uno de los principales factores de deterioro cognitivo. A diferencia de otros tratamientos, esta propuesta busca intervenir antes de que aparezcan los síntomas clínicos graves.', 
 'Actualmente se están planificando pruebas en humanos, y si los resultados son positivos, podría representar un avance histórico en la lucha contra las enfermedades neurodegenerativas. A pesar del entusiasmo, los científicos advierten que el proceso de aprobación será largo y requerirá años de seguimiento.','2025-03-10', '1.png', 'd3.png', '1.png', '4'),

('5', 'Importancia del reciclaje en las instituciones', 'Una iniciativa verde para mejorar la cultura ambiental.','La campaña busca reducir residuos y promover hábitos sostenibles.',
 'Se implementarán puntos de reciclaje en varias sedes educativas.','También se realizarán charlas de concientización y actividades ecológicas.', '2025-03-08', '2.png', 'd4.png', '2.png', '4'),

('6', 'Eventos académicos en 2025', 'Un año cargado de actividades educativas y tecnológicas.','Entre los eventos destacan ferias científicas y congresos de innovación.',
 'Las instituciones pueden inscribirse para participar con sus proyectos.','Consulta el calendario oficial para conocer fechas y requisitos.','2025-03-05', '3.png', 'd5.png', '3.png', '4');
    
                               