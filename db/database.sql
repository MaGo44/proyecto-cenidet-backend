CREATE DATABASE IF NOT EXISTS ped;

USE ped;

CREATE TABLE careers (
    career_id INT(11) NOT NULL AUTO_INCREMENT,
    career_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (career_id)
);

CREATE TABLE genders (
    gender_id INT(11) NOT NULL AUTO_INCREMENT,
    gender_name VARCHAR(45) NOT NULL,
    PRIMARY KEY (gender_id)
);

CREATE TABLE student_info (
    student_control_num INT NOT NULL,
    student_name VARCHAR(45) DEFAULT NULL,
    student_last_name VARCHAR(45) DEFAULT NULL,
    student_second_last_name VARCHAR(45) DEFAULT NULL,
    student_email VARCHAR(80) DEFAULT NULL,
    student_second_email VARCHAR(80) DEFAULT NULL,
    student_curp VARCHAR(18) DEFAULT NULL,
    student_sex_id INT(11) DEFAULT NULL,
    student_phone INT(10) DEFAULT NULL,
    student_cel_phone INT(10) DEFAULT NULL,
    student_career_id INT(11) DEFAULT NULL,
    student_avg INT(2) DEFAULT NULL,
    student_credits INT(3) DEFAULT NULL,
    student_studies_code VARCHAR(20) DEFAULT NULL,
    student_semester INT(2) DEFAULT NULL,
    PRIMARY KEY(student_control_num),
    FOREIGN KEY (student_sex_id) REFERENCES genders(gender_id),
    FOREIGN KEY (student_career_id) REFERENCES careers(career_id)
);

INSERT INTO careers VALUES
    (1,'Ing. Industrial'),
    (2,'Ing. en sistemas Comp.'),
    (3,'Ing. Bioquímica'),
    (4,'Ing. Electromecánica'),
    (5,'Ing. Civil'),
    (6,'Ing. en Tecnologías de la Información y las Comunicaciones'),
    (7,'Ing. Ambiental'),
    (8,'Ing. en Gestión Empresarial'),
    (9,'Ing. Petrolera');

INSERT INTO genders VALUES
    (1,'Hombre'),
    (2,'Mujer');


