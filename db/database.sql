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

CREATE TABLE periods (
    period_id INT(11) NOT NULL AUTO_INCREMENT,
    period_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (period_id)
);

CREATE TABLE scholar_grade (
    grade_id INT(11) NOT NULL AUTO_INCREMENT,
    grade_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (grade_id)
);

CREATE TABLE agreement_status (
    status_id INT(11) NOT NULL AUTO_INCREMENT,
    status_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (status_id)
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
    student_phone INT(11) DEFAULT NULL,
    student_cel_phone INT(11) DEFAULT NULL,
    student_career_id INT(11) DEFAULT NULL,
    student_avg INT(2) DEFAULT NULL,
    student_credits INT(3) DEFAULT NULL,
    student_studies_code VARCHAR(20) DEFAULT NULL,
    student_semester INT(2) DEFAULT NULL,
    PRIMARY KEY(student_control_num),
    FOREIGN KEY (student_sex_id) REFERENCES genders(gender_id),
    FOREIGN KEY (student_career_id) REFERENCES careers(career_id)
);

CREATE TABLE internal_adviser_info (
    internal_adviser_id INT NOT NULL AUTO_INCREMENT,
    internal_name VARCHAR(45) DEFAULT NULL,
    internal_last_name VARCHAR(45) DEFAULT NULL,
    internal_second_last_name VARCHAR(45) DEFAULT NULL,
    internal_sex_id INT(11) DEFAULT NULL,
    internal_scholar_grade INT(11) DEFAULT NULL,
    internal_phone INT(11) DEFAULT NULL,
    internal_cel_phone INT(11) DEFAULT NULL,
    internal_adscription_career INT(11) DEFAULT NULL,
    internal_email VARCHAR(80) DEFAULT NULL,
    internal_second_email VARCHAR(80) DEFAULT NULL,
    PRIMARY KEY(internal_adviser_id),
    FOREIGN KEY (internal_sex_id) REFERENCES genders(gender_id),
    FOREIGN KEY (internal_scholar_grade) REFERENCES scholar_grade(grade_id),
    FOREIGN KEY (internal_adscription_career) REFERENCES scholar_grade(grade_id)
);

CREATE TABLE company_info (
    company_id INT NOT NULL AUTO_INCREMENT,
    company_name VARCHAR(100) DEFAULT NULL,
    company_business_name VARCHAR(100) DEFAULT NULL,
    company_address VARCHAR(500) DEFAULT NULL,
    company_postal_code INT(5) DEFAULT NULL,
    company_colony VARCHAR(100) DEFAULT NULL,
    company_location VARCHAR(100) DEFAULT NULL,
    company_municipality VARCHAR(100) DEFAULT NULL,
    company_state VARCHAR(100) DEFAULT NULL,
    company_external_number VARCHAR(50) DEFAULT NULL,
    company_country VARCHAR(100) DEFAULT NULL,
    company_representative_name VARCHAR(100) DEFAULT NULL,
    company_contact_name VARCHAR(100) DEFAULT NULL,
    company_contact_max_studies INT(11) DEFAULT NULL,
    company_contact_position VARCHAR(100) DEFAULT NULL,
    company_tel INT(11) DEFAULT NULL,
    company_tel_ext INT(5) DEFAULT NULL,
    company_cel INT(11) DEFAULT NULL,
    company_email VARCHAR(80) DEFAULT NULL,
    company_second_email VARCHAR(80) DEFAULT NULL,
    company_agreement_status BOOLEAN DEFAULT NULL,
    company_agreement_date DATE DEFAULT NULL,
    company_vacants_number INT(2) DEFAULT NULL,
    company_observation_desc TEXT DEFAULT NULL,
    PRIMARY KEY (company_id),
    FOREIGN KEY (company_contact_max_studies) REFERENCES scholar_grade(grade_id)
);

CREATE TABLE student_documents (
    document_id INT NOT NULL AUTO_INCREMENT,
    student_id INT NOT NULL,
    document_type_id INT(1) DEFAULT NULL,
    document_file_name VARCHAR(100) DEFAULT NULL,
    alias VARCHAR(100) DEFAULT NULL,
    document_desc INT(100) DEFAULT NULL,
    PRIMARY KEY(document_id),
    FOREIGN KEY (student_id) REFERENCES student_info(student_control_num)
);

CREATE TABLE student_project (
    project_id INT NOT NULL AUTO_INCREMENT,
    student_id INT NOT NULL,
    project_name VARCHAR(500) DEFAULT NULL,
    project_company_id INT NOT NULL,
    project_start_date VARCHAR(12) DEFAULT NULL,
    project_finish_date VARCHAR(12) DEFAULT NULL,
    project_position_name VARCHAR(500) DEFAULT NULL,
    project_area VARCHAR(500) DEFAULT NULL,
    project_external_adviser VARCHAR(100) DEFAULT NULL,
    project_internal_adviser_id INT DEFAULT NULL,
    project_contract_status BOOLEAN DEFAULT NULL,
    project_period INT(11) DEFAULT NULL,
    project_objective_desc TEXT DEFAULT NULL,
    project_problem_desc TEXT DEFAULT NULL,
    project_results_desc TEXT DEFAULT NULL,
    project_product_desc TEXT DEFAULT NULL,
    PRIMARY KEY(project_id),
    FOREIGN KEY (student_id) REFERENCES student_info(student_control_num),
    FOREIGN KEY (project_company_id) REFERENCES company_info(company_id),
    FOREIGN KEY (project_internal_adviser_id) REFERENCES internal_adviser_info(internal_adviser_id),
    FOREIGN KEY (project_period) REFERENCES periods(period_id)
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

INSERT INTO periods VALUES
    (1,'FEBRERO-DICIEMBRE 2020'),
    (2,'FEBRERO-DICIEMBRE 2021'),
    (3,'FEBRERO-DICIEMBRE 2022'),
    (4,'FEBRERO-DICIEMBRE 2023');

INSERT INTO scholar_grade VALUES
    (1,'Licenciatura'),
    (2,'Maestría'),
    (3,'Doctorado');

INSERT INTO agreement_status VALUES
    (1,'En proceso'),
    (2,'Activo'),
    (3,'Finalizado');


