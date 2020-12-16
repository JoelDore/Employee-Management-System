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
    database: process.env.db
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
            case "Add an Role":
                addRole()
                break;
            case "Add an Department":
                addDepartment()
                break;
            // Views
            case "View All Employees":
                viewAll()
                break;
            case "View Employees By Role":
                viewByRole()
                break;
            case "View Employees By Department":
                viewByDepartment()
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

// ADD 

// ✔️
function addEmployee() {
    // Get employees (to assign manager)
    // Get avail. roles
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
            choices: roles
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
        // Add employee to db
        runApp()
    });
}

function addRole() {
    // Get avail. depts
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
            choices: [] // Departments
        }
    ]).then(answers => {
        // Add role to db
        runApp()
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
        // Add dept to db
        runApp()
    });
}

// VIEW
function viewEmployee() {
    // query db
    // cTable res
    runApp()
}

function viewRole() {
    // query db
    // cTable res
    runApp()
}

function viewDepartment() {
    // query db
    // cTable res
    runApp()
}


// UPDATE
function updateEmployeeRole() {
    // Get all employees
    // Get avail. roles
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select an Employee to update:',
            choices: [] // Employees
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'Choose a new role:',
            choices: [] // Roles
        }
    ]).then(answers => {
        // Update employee in db
        runApp()
    });
}
