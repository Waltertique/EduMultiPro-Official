CREATE DATABASE IF NOT EXISTS edumultipro;
USE edumultipro;

CREATE TABLE Rol (
    idRol INT auto_increment PRIMARY KEY,
    Nombre VARCHAR(45) NOT NULL
);

CREATE TABLE Documento (
    idDocumento INT auto_increment PRIMARY KEY,
    Nombre VARCHAR(45) NOT NULL
);

CREATE TABLE Usuario (
    idUsuario INT auto_increment PRIMARY KEY,
    Primer_Nombre VARCHAR(45) NOT NULL,
    Segundo_Nombre VARCHAR(45),
    Primer_Apellido VARCHAR(45) NOT NULL,
    Segundo_Apellido VARCHAR(45),
    idRol INT,
    idDocumento INT,
    FOREIGN KEY (idRol) REFERENCES Rol(idRol),
    FOREIGN KEY (idDocumento) REFERENCES Documento(idDocumento)
);

CREATE TABLE Informacion (
    idInformacion INT auto_increment PRIMARY KEY,
    Correo VARCHAR(45),
    Contacto1 VARCHAR(45),
    Contacto2 VARCHAR(45),
    Direccion VARCHAR(45),
    Usuario_idUsuario INT,
    FOREIGN KEY (Usuario_idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Curso (
    idCurso INT auto_increment PRIMARY KEY,
    GradoJornada INT NOT NULL
);

CREATE TABLE Miembros_Curso (
    idUsuario INT,
    idCurso INT,
    PRIMARY KEY (idUsuario, idCurso),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso)
);

CREATE TABLE Materia (
    idMateria INT auto_increment PRIMARY KEY,
    Nombre VARCHAR(45) NOT NULL,
    Descripcion VARCHAR(255)
);

CREATE TABLE Calificacion (
    idCalificacion INT auto_increment PRIMARY KEY,
    idUsuario INT,
    idMateria INT,
    Nota FLOAT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (idMateria) REFERENCES Materia(idMateria)
);

CREATE TABLE Noticia (
    idNoticia INT auto_increment PRIMARY KEY,
    Titulo VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(255),
    Fecha DATE
);

CREATE TABLE Tipo_Noticia (
    idTipoNoticia INT auto_increment PRIMARY KEY,
    Tipo VARCHAR(45) NOT NULL
);

ALTER TABLE Noticia ADD COLUMN idTipoNoticia INT;
ALTER TABLE Noticia ADD FOREIGN KEY (idTipoNoticia) REFERENCES Tipo_Noticia(idTipoNoticia);

CREATE TABLE Horario (
    idHorario INT auto_increment PRIMARY KEY,
    DiaSemana VARCHAR(45) NOT NULL,
    HoraInicio TIME NOT NULL,
    HoraFin TIME NOT NULL
);

CREATE TABLE Horario_Curso (
    idHorario INT,
    idCurso INT,
    PRIMARY KEY (idHorario, idCurso),
    FOREIGN KEY (idHorario) REFERENCES Horario(idHorario),
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso)
);

CREATE TABLE Aula (
    idAula INT auto_increment PRIMARY KEY,
    Aula VARCHAR(45) NOT NULL,
    Nombre VARCHAR(45) NOT NULL
);

CREATE TABLE Aula_Contenido (
    idAula INT,
    idTrabajo INT,
    PRIMARY KEY (idAula, idTrabajo),
    FOREIGN KEY (idAula) REFERENCES Aula(idAula)
);

CREATE TABLE Trabajo (
    idTrabajo INT auto_increment PRIMARY KEY,
    Titulo VARCHAR(45) NOT NULL,
    Descripcion VARCHAR(255)
);

CREATE TABLE Boletin (
    idBoletin INT auto_increment PRIMARY KEY,
    Nombre VARCHAR(45) NOT NULL,
    Año YEAR NOT NULL
);

CREATE TABLE Periodo (
    idPeriodo INT auto_increment PRIMARY KEY,
    Nombre VARCHAR(45) NOT NULL
);

CREATE TABLE Boletin_Alumno (
    idBoletin INT,
    idUsuario INT,
    PRIMARY KEY (idBoletin, idUsuario),
    FOREIGN KEY (idBoletin) REFERENCES Boletin(idBoletin),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);