DROP DATABASE IF EXISTS EduMultiPro;
CREATE DATABASE EduMultiPro;
USE EduMultiPro;

-- Tablas Sin Llaves Foraneas

CREATE TABLE Rol (
	ID VARCHAR(10) PRIMARY KEY,
    Nombre_Rol VARCHAR(50) NOT NULL
);

CREATE TABLE Documento (
	ID VARCHAR(10) PRIMARY KEY,
    Tipo_Documento VARCHAR(50) NOT NULL
);

CREATE TABLE Grado (
	ID INT auto_increment PRIMARY KEY,
    Grado_Nombre VARCHAR(50) NOT NULL,
    Descripcion_Grado TEXT(300) NOT NULL
);

CREATE TABLE Jornada (
	ID INT auto_increment PRIMARY KEY,
    Jornada_Nombre VARCHAR(50) NOT NULL,
    Descripcion_Jornada TEXT(300) NOT NULL
);

CREATE TABLE Materia (
	ID INT auto_increment PRIMARY KEY,
    Materia_Nombre VARCHAR(50) NOT NULL,
	Descripcion_Materia TEXT(300) NOT NULL
);

CREATE TABLE Tipo_Noticia (
	ID INT auto_increment PRIMARY KEY,
    Tipo VARCHAR(100) NOT NULL
);

-- Tablas Con Llaves Foraneas

CREATE TABLE Curso(
	ID INT auto_increment PRIMARY KEY,
    Curso_Nombre VARCHAR(50) NOT NULL,
    grado_id INT NOT NULL,
    jornada_id INT NOT NULL,
    FOREIGN KEY (grado_id) REFERENCES Grado(ID) ON DELETE CASCADE,
    FOREIGN KEY (jornada_id) REFERENCES Jornada(ID) ON DELETE CASCADE
);	

CREATE TABLE Usuario (
	ID INT PRIMARY KEY,
    Primer_Nombre VARCHAR(100) NOT NULL,
    Segundo_Nombre VARCHAR(100),
    Primer_Apellido VARCHAR(100) NOT NULL,
    Segundo_Apellido VARCHAR(100),
    Correo1 VARCHAR(50) NOT NULL,
    Contraseña VARCHAR(255) NOT NULL,
    Correo2 VARCHAR(50),
    Contacto1 VARCHAR(50) NOT NULL,
    Contacto2 VARCHAR(50),
    Fecha_Nacimiento DATE NOT NULL,
    RutaFoto VARCHAR(200),
    rol_id VARCHAR(10) NOT NULL,
    documento_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES Rol(ID),
    FOREIGN KEY (documento_id) REFERENCES Documento(ID)
);

CREATE TABLE Miembros_Curso (
	usuario_id	INT NOT NULL,
    curso_id iNT NOT NULL,
    PRIMARY KEY (usuario_id, curso_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(ID) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES Curso(ID) ON DELETE CASCADE
);

CREATE TABLE Horario (
	ID INT auto_increment PRIMARY KEY,
    Titulo_Horario VARCHAR(50) NOT NULL,
    Imagen_Horario VARCHAR(200),
    Descripcion_Horario TEXT(300) NOT NULL,
    profesor_id	INT,
    curso_id INT,
    FOREIGN KEY (profesor_id) REFERENCES Usuario(ID) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES Curso(ID) ON DELETE CASCADE
);

CREATE TABLE Aula (
	ID INT auto_increment PRIMARY KEY,
    Aula_Nombre	VARCHAR(50) NOT NULL,
    materia_id	INT NOT NULL,
	usuario_id	INT NOT NULL,
    curso_id INT NOT NULL,
    FOREIGN KEY (materia_id) REFERENCES Materia(ID) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(ID) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES Curso(ID) ON DELETE CASCADE
);

CREATE TABLE Anuncio (
	ID INT auto_increment PRIMARY KEY,
    Titulo_Anuncio VARCHAR(100) NOT NULL,
	Descripcion_Anuncio TEXT(300),
    Enlace_Anuncio VARCHAR(200),
    Fecha_Anuncio DATE NOT NULL,
    aula_id INT NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (aula_id) REFERENCES Aula(ID) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(ID) ON DELETE CASCADE
);

CREATE TABLE Trabajo (
	ID INT auto_increment PRIMARY KEY,
    Titulo_Trabajo VARCHAR(100) NOT NULL,
	Descripcion_Trabajo TEXT(300),
    Fecha_Trabajo DATE NOT NULL,
    Archivo_Trabajo VARCHAR(200),
    aula_id INT NOT NULL,
    FOREIGN KEY (aula_id) REFERENCES Aula(ID) ON DELETE CASCADE
);

CREATE TABLE TrabajoEntregado (
	ID INT auto_increment PRIMARY KEY,
    Archivo_Trabajo VARCHAR(200),
    Fecha_Trabajo DATE NOT NULL,
    Nota FLOAT NOT NULL,
    trabajo_id INT NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (trabajo_id) REFERENCES Trabajo(ID) ON DELETE CASCADE,
    FOREIGN KEY (Usuario_id) REFERENCES Usuario(ID) ON DELETE CASCADE
);

CREATE TABLE Comentario (
	ID INT auto_increment PRIMARY KEY,
    Descripcion VARCHAR(200) NOT NULL,
    Fecha DATE NOT NULL,
    trabajo_id INT,
    anuncio_id int,
    usuario_id INT NOT NULL,
    FOREIGN KEY (trabajo_id) REFERENCES Trabajo(ID) ON DELETE CASCADE,
    FOREIGN KEY (anuncio_id) REFERENCES Anuncio(ID) ON DELETE CASCADE,
    FOREIGN KEY (Usuario_id) REFERENCES Usuario(ID) ON DELETE CASCADE
);

CREATE TABLE Noticia (
	ID INT auto_increment PRIMARY KEY,
	Titulo_Noticia VARCHAR(200) NOT NULL,
    Encabezado TEXT(1000),
	Descripcion1 TEXT(2000),
    Descripcion2 TEXT(2000),
    Descripcion3 TEXT(2000),
    Fecha_Notica Date NOT NULL,
    Imagen1 VARCHAR(200),
    Imagen2 VARCHAR(200),
    Imagen3 VARCHAR(200),
	tipo_noticia_id INT NOT NULL,
    FOREIGN KEY (tipo_noticia_id) REFERENCES Tipo_Noticia(ID)
);

INSERT INTO Rol(ID, Nombre_Rol) Values
	('R001','Alumno'),
    ('R002','Profesor'),
    ('R003','Coordinador'),
    ('R004','Administrador');
    
INSERT INTO Documento(ID, Tipo_Documento) Values
	('D001','T.Identidad'),
    ('D002','Cedula'),
    ('D003','Cedula de extangeria');
    
INSERT INTO Usuario(ID, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Correo1, Contraseña, Correo2, Contacto1, Contacto2, Fecha_Nacimiento, RutaFoto, rol_id, documento_id) Values
    ('41', 'maradona', 'pedro', 'Guzmán', 'Roldán', 'maradona@gmail.com','pbkdf2:sha256:260000$7HLlYZufDov3JgrX$87880d161bf5c37b7e08b6535c7c93387855ac71c9e109ee1eb5d2f17e062646', 'maradona.alt40@gmail.com', '3101010133', '3291010133', '2000-12-25','h7.png','R004', 'D002');
    
INSERT INTO Tipo_Noticia(ID, Tipo) Values
	('1', 'Noticia Principal 1'),
	('2', 'Noticia Principal 2'),
	('3', 'Noticia Principal 3'),
	('4', 'Noticia Secundaria 1'),
    ('5', 'Noticia Secundaria 2'),
    ('6', 'Noticia Secundaria 3');
