require('dotenv').config()
const { Department, Role, Employee } = require('./lib/classes')
const inquirer = require('inquirer')
const mysql = require('mysql');
const cTable = require('console.table')

const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT || 3306,
    user: 'root',
    password: process.env.password,
    database: process.env.db,
    multipleStatements: true
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected!')
    runApp()
});

// ✔️ START APP
function runApp() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                "Add an Employee",
                "Add a Role",
                "Add a Department",
                new inquirer.Separator(),
                "View All Employees",
                "View Employees By Role",
                "View Employees By Department",
                new inquirer.Separator(),
                "Update an Employee's Role",
                new inquirer.Separator(),
                "Exit ➡",
                new inquirer.Separator()
            ]
        }
    ]).then(answers => {
        switch (answers.choice) {
            // Adds
            case "Add an Employee":
                addEmployee()
                break;
            case "Add a Role":
                addRole()
                break;
            case "Add a Department":
                addDepartment()
                break;
            // Views
            case "View All Employees":
                viewAllEmployees()
                break;
            case "View Employees By Role":
                viewEmployeesByRole()
                break;
            case "View Employees By Department":
                viewEmployeesByDepartment()
                break;
            // Updates
            case "Update an Employee's Role":
                updateEmployeeRole()
                break;

            case "Exit ➡":
                connection.end()
                break;
        }
    });
}

// ✔️ ADD
function addEmployee() {
    const employees = getEmployees();
    employees.unshift({ name: "No Manager", value: null })
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'First Name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Last Name:'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Role:',
            choices: getRoles()
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Assign a manager?',
            choices: employees
        }
    ]).then(answers => {
        const newEmployee = new Employee(
            answers.first_name,
            answers.last_name,
            answers.role_id,
            answers.manager_id
        )
        connection.query('INSERT INTO employees SET ?', newEmployee, (err, res) => {
            if (err) throw err
            console.log(`\nAdded new employee: ${newEmployee.first_name} ${newEmployee.last_name}\n`)
            runApp()
        })
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Title:'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Salary:'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Department:',
            choices: getDepartments()
        }
    ]).then(answers => {
        const newRole = new Role(
            answers.title,
            answers.salary,
            answers.department_id
        )
        connection.query('INSERT INTO roles SET ?', newRole, (err, res) => {
            if (err) throw err
            console.log(`\nAdded new role: ${newRole.title}\n`)
            runApp()
        })
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Department Name:'
        }
    ]).then(answers => {
        const newDept = new Department(answers.name)
        connection.query('INSERT INTO departments SET ?', newDept, (err, res) => {
            if (err) throw err;
            console.log(`\nAdded new department: ${newDept.name}\n`)
            runApp()
        });
    });
}

// ✔️ VIEW
function viewAllEmployees(roleID = '', deptID = '') {
    let query = `
    SELECT e.id, e.first_name, e.last_name, title, name AS department, 
        salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e  
        LEFT JOIN roles
        ON e.role_id = roles.id
            LEFT JOIN departments
            ON roles.department_id = departments.id
                LEFT JOIN employees m
                ON e.manager_id = m.id 
    `
    if (roleID) query += `WHERE e.role_id = ${roleID}`
    else if (deptID) query += `WHERE department_id = ${deptID}`

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table('\n', res, '\n')
        runApp()
    });
}

function viewEmployeesByRole() {
    const roles = getRoles()
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'delay',
            message: 'Press enter to continue'
        },
        {
            type: 'list',
            name: 'roleID',
            message: 'Choose a role:',
            choices: roles
        }
    ]).then(answers => {
        viewAllEmployees(answers.roleID)
    });
}

function viewEmployeesByDepartment() {
    const depts = getDepartments()
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'delay',
            message: 'Press enter to continue'
        },
        {
            type: 'list',
            name: 'deptID',
            message: 'Choose a department:',
            choices: depts
        }
    ]).then(answers => {
        viewAllEmployees('', answers.deptID)
    });
}


// ✔️ UPDATE
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'delay',
            message: 'Press enter to continue'
        },
        {
            type: 'list',
            name: 'employee',
            message: 'Select an Employee to update:',
            choices: getEmployees()
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'Choose a new role:',
            choices: getRoles()
        }
    ]).then(answers => {
        const newRole = { role_id: answers.newRole }
        const employeeID = { id: answers.employee }
        const query = `
        UPDATE employees SET ? WHERE ?; 
        SELECT CONCAT(first_name, ' ', last_name) AS name FROM employees
        WHERE ?
        `
        connection.query(query, [newRole, employeeID, employeeID], (err, res) => {
            if (err) throw err;
            console.log(`\nUpdated ${res[1][0].name}'s role\n`)
            runApp()
        }
        );
    });
}


// ✔️ GETTERS 
function getEmployees() {
    let employees = [];
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        res.forEach(r => {
            const fullName = `${r.first_name} ${r.last_name}`
            employees.push({ name: fullName, value: r.id })
        });
    });
    return employees
}

function getRoles() {
    let roles = [];
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        res.forEach(r => roles.push({ name: r.title, value: r.id }));
    });
    return roles;
}

function getDepartments() {
    let depts = [];
    connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        res.forEach(r => depts.push({ name: r.name, value: r.id }));
    });
    return depts;
}