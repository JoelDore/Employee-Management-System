INSERT INTO departments(name)
VALUES ('Management');
INSERT INTO departments(name)
VALUES ('Sales');
INSERT INTO departments(name)
VALUES ('Accounting');

INSERT INTO roles(title, salary, department_id)
VALUES ('Regional Manager', 80000, 1);
INSERT INTO roles(title, salary, department_id)
VALUES ('Asst. to the Regional Manager', 75000, 2);
INSERT INTO roles(title, salary, department_id)
VALUES ('Salesman', 70000, 2);
INSERT INTO roles(title, salary, department_id)
VALUES ('Accountant', 60000, 3);

INSERT INTO employees(first_name, last_name, role_id)
VALUES ('Michael', 'Scott', 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('Dwight', 'Schrute', 2, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('Jim', 'Halpert', 3, 2);
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('Stanley', 'Hudson', 3, 2);
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('Oscar', 'Martinez', 4, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('Kevin', 'Malone', 4, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('Angela', 'Martin', 4, 1);