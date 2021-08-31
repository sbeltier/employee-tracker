INSERT INTO department (id, departmentName)
VALUES  (1, "Product"),
        (2, "Engineering"),
        (3, "Sales"),
        (4, "Customer Service");    

INSERT INTO employee_role (id, title, salary, department_id)
VALUES (1, "Queen", 1000000.0, 1),
       (2, "Engineer", 69000.0, 2),
       (3, "Customer Service Representative", 3000.0, 3),
       (4, "Sales Associate", 5000.0, 4);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Sarah", "B", 1, null),
       (2, "James", "H", 2, 1),
       (3, "David", "B", 3, 1),
       (4, "Jeremy", "M", 4, 1);