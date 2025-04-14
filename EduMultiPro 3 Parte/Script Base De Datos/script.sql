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
	ID VARCHAR(10) PRIMARY KEY,
    Grado_Nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Jornada (
	ID VARCHAR(10) PRIMARY KEY,
    Jornada_Nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Horario (
	ID INT auto_increment PRIMARY KEY,
    Titulo_Horario VARCHAR(50) NOT NULL,
    Imagen_Horario VARCHAR(200),
    Descripcion_Horario TEXT(300) NOT NULL
);

CREATE TABLE Materia (
	ID VARCHAR(10) PRIMARY KEY,
    Materia_Nombre VARCHAR(50) NOT NULL,
	Descripcion_Materia TEXT(300) NOT NULL
);

CREATE TABLE Logro (
	ID VARCHAR(10) PRIMARY KEY,
    Tipo_Logro VARCHAR(200) NOT NULL
);

CREATE TABLE Valoracion (
	ID VARCHAR(10) PRIMARY KEY,
    Nombre_Valoracion VARCHAR(200) NOT NULL
);

CREATE TABLE Periodo (
	ID VARCHAR(10) PRIMARY KEY,
    Nombre_Periodo VARCHAR(50) NOT NULL
);

CREATE TABLE Tipo_Noticia (
	ID INT auto_increment PRIMARY KEY,
    Tipo VARCHAR(100) NOT NULL
);

-- Tablas Con Llaves Foraneas

CREATE TABLE Curso(
	ID VARCHAR(10) PRIMARY KEY,
    Curso_Nombre VARCHAR(50) NOT NULL,
    grado_id VARCHAR(10) NOT NULL,
    jornada_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (grado_id) REFERENCES Grado(ID) ON DELETE CASCADE,
    FOREIGN KEY (jornada_id) REFERENCES Jornada(ID) 
);	

CREATE TABLE Usuario (
	ID INT PRIMARY KEY,
    Primer_Nombre VARCHAR(100) NOT NULL,
    Segundo_Nombre VARCHAR(100),
    Primer_Apellido VARCHAR(100) NOT NULL,
    Segundo_Apellido VARCHAR(100),
    Correo1 VARCHAR(50) NOT NULL,
    Contraseña VARCHAR(255) NOT NULL,
    rol_id VARCHAR(10) NOT NULL,
    documento_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES Rol(ID),
    FOREIGN KEY (documento_id) REFERENCES Documento(ID)
);

CREATE TABLE Informacion (
	ID INT auto_increment PRIMARY KEY,
    Correo2 VARCHAR(50),
    Contacto1 VARCHAR(50) NOT NULL,
    Contacto2 VARCHAR(50),
    Fecha_Nacimiento DATE NOT NULL,
    RutaFoto VARCHAR(200),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(ID) ON DELETE CASCADE
);

CREATE TABLE Miembros_Curso (
	usuario_id	INT NOT NULL,
    curso_id VARCHAR(10) NOT NULL,
    PRIMARY KEY (usuario_id, curso_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(ID) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES Curso(ID) ON DELETE CASCADE
);

CREATE TABLE Horario_Curso (
	ID INT auto_increment PRIMARY KEY,
    horario_id	INT NOT NULL,
	profesor_id	INT,
    curso_id VARCHAR(10),
    FOREIGN KEY (horario_id) REFERENCES Horario(ID) ON DELETE CASCADE,
    FOREIGN KEY (profesor_id) REFERENCES Usuario(ID) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES Curso(ID) ON DELETE CASCADE
);

CREATE TABLE Aula (
	ID VARCHAR(10) PRIMARY KEY,
    Aula_Nombre	VARCHAR(50) NOT NULL,
    materia_id	VARCHAR(10) NOT NULL,
	usuario_id	INT NOT NULL,
    curso_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (materia_id) REFERENCES Materia(ID) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(ID) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES Curso(ID) ON DELETE CASCADE
);

CREATE TABLE Anuncio (
	ID VARCHAR(10) PRIMARY KEY,
    Titulo_Anuncio VARCHAR(100) NOT NULL,
	Descripcion_Anuncio TEXT(300),
    Enlace_Anuncio VARCHAR(200),
    Fecha_Anuncio DATE NOT NULL,
    aula_id VARCHAR(10) NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (aula_id) REFERENCES Aula(ID) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(ID) ON DELETE CASCADE
);

CREATE TABLE Trabajo (
	ID VARCHAR(10) PRIMARY KEY,
    Tema_Trabajo VARCHAR(100),
    Titulo_Trabajo VARCHAR(100) NOT NULL,
	Descripcion_Trabajo TEXT(300),
    Fecha_Trabajo DATE NOT NULL,
    Archivo_Trabajo longblob,
    aula_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (aula_id) REFERENCES Aula(ID) ON DELETE CASCADE
);

CREATE TABLE TrabajoEntregado (
	ID VARCHAR(10) PRIMARY KEY,
    Archivo_Trabajo longblob,
    Fecha_Trabajo DATE NOT NULL,
    trabajo_id VARCHAR(10) NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (trabajo_id) REFERENCES Trabajo(ID) ON DELETE CASCADE,
    FOREIGN KEY (Usuario_id) REFERENCES Usuario(ID) ON DELETE CASCADE
);

CREATE TABLE Comentario (
	ID VARCHAR(10) PRIMARY KEY,
    Descripcion VARCHAR(200) NOT NULL,
    Fecha DATE NOT NULL,
    trabajo_id VARCHAR(10),
    anuncio_id VARCHAR(10),
    usuario_id INT NOT NULL,
    FOREIGN KEY (trabajo_id) REFERENCES Trabajo(ID) ON DELETE CASCADE,
    FOREIGN KEY (anuncio_id) REFERENCES Anuncio(ID) ON DELETE CASCADE,
    FOREIGN KEY (Usuario_id) REFERENCES Usuario(ID) ON DELETE CASCADE
);

CREATE TABLE Nota_Trabajo (
	ID VARCHAR(10) PRIMARY KEY,
	Nota FLOAT NOT NULL,
	trabajo_id	VARCHAR(10) NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (trabajo_id) REFERENCES Trabajo(ID) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(ID) ON DELETE CASCADE
);

CREATE TABLE Nota_Final (
	ID VARCHAR(10) PRIMARY KEY,
	Nota_Final FLOAT NOT NULL,
    Inasistencias INT NOT NULL,
	materia_id	VARCHAR(10) NOT NULL,
    logro_id VARCHAR(10) NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(ID) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES Materia(ID) ON DELETE CASCADE,
    FOREIGN KEY (logro_id) REFERENCES Logro(ID)
);

CREATE TABLE Planilla (
	ID VARCHAR(10) PRIMARY KEY,
    Planilla_Nombre VARCHAR(50) NOT NULL,
	periodo_id	VARCHAR(10) NOT NULL,
    FOREIGN KEY (periodo_id) REFERENCES Periodo(ID)
);

CREATE TABLE Nota_Planilla (
	ID VARCHAR(10) PRIMARY KEY,
	nota_final_id VARCHAR(10) NOT NULL,
    curso_id VARCHAR(10) NOT NULL,
    planilla_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (planilla_id) REFERENCES Planilla(ID) ON DELETE CASCADE,
    FOREIGN KEY (nota_final_id) REFERENCES Nota_Final(ID) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES Curso(ID) ON DELETE CASCADE
);

CREATE TABLE Boletin (
	ID VARCHAR(10) PRIMARY KEY,
	Titulo_Boletin VARCHAR(50) NOT NULL,
	Sede VARCHAR(50),
    Anio year NOT NULL,
    Resolucion VARCHAR(50),
    Institucion VARCHAR(50) NOT NULL,
    alumno_id INT NOT NULL,
    periodo_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (alumno_id) REFERENCES Usuario(ID) ON DELETE CASCADE,
    FOREIGN KEY (periodo_id) REFERENCES Periodo(ID)
);

CREATE TABLE Boletin_Nota (
	ID VARCHAR(10) PRIMARY KEY,
	nota_Final_id VARCHAR(50) NOT NULL,
	valoracion_id VARCHAR(10) NOT NULL,
    boletin_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (nota_Final_id) REFERENCES Nota_Final(ID) ON DELETE CASCADE,
    FOREIGN KEY (valoracion_id) REFERENCES Valoracion(ID),
    FOREIGN KEY (boletin_id) REFERENCES Boletin(ID) ON DELETE CASCADE
);

CREATE TABLE Boletin_Detalle (
	ID VARCHAR(10) PRIMARY KEY,
    Puesto INT,
    Comportamiento VARCHAR(500),
    Observaciones VARCHAR(500),
	profesor_id INT NOT NULL,
	boletin_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (profesor_id) REFERENCES Usuario(ID) ON DELETE CASCADE,
    FOREIGN KEY (boletin_id) REFERENCES Boletin(ID) ON DELETE CASCADE
);

CREATE TABLE Noticia (
	ID INT auto_increment PRIMARY KEY,
	Titulo_Noticia VARCHAR(100) NOT NULL,
	Descripcion TEXT(2000),
    Fecha_Notica Date NOT NULL,
    Imagen1 longblob,
    Imagen2 longblob,
    Imagen3 longblob,
	tipo_noticia_id INT NOT NULL,
    FOREIGN KEY (tipo_noticia_id) REFERENCES Tipo_Noticia(ID)
);

