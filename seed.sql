USE companyDB;
INSERT INTO department (name) VALUES ("accounting");
INSERT INTO department (name) VALUES ("sales");
INSERT INTO department (name) VALUES ("marketing");

INSERT INTO role(title, salary, department_id) 
VALUES 
("Accountant", 50000, 1),
("Sales Lead", 70000, 2),
("Marketing Specialist", 45000, 3),
("Salesperson", 55000, 2);

INSERT INTO employee(first_name, last_name, role_id) 
VALUES 
("Matt", "Ray", 1),
("Krista", "Barrett", 3),
("Robert", "James", 2),
("Tony", "Martin", 2);


