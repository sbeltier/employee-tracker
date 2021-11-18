INSERT INTO department (departmentName)
VALUES  ("Product"),
        ("Engineering"),
        ("Sales"),
        ("Customer Service");    

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Queen", 1000000.0, 1),
       ("Engineer", 69000.0, 2),
       ("Customer Service Representative", 3000.0, 3),
       ("Sales Associate", 5000.0, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "B", 1, null),
       ("James", "H", 2, 1),
       ("David", "B", 3, 1),
       ("Jeremy", "M", 4, 1);