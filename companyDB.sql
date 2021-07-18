DROP DATABASE IF EXISTS companyDB;
CREATE DATABASE companyDB;
USE companyDB;
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);
CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8, 2) NOT NULL,
    department_id INT(10) NOT NULL

);
CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10) NOT NULL,
    department_id INT(10) ,
    manager_id INT(10)
);


-- This joins the employee and the role table --
SELECT employee.first_name, employee.last_name AS employee, role.title, role.salary AS role FROM employee JOIN role ON employee.role_id = role.id;

-- joins all three
SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name 
  FROM ((employee INNER JOIN role ON employee.role_id = role.id ) 
  INNER JOIN department ON employee.department_id = department.id);