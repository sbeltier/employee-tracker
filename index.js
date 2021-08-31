const inquirer = require('inquirer');
const { prompt } = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

// To print table..
// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);

// Establish mySQL connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'NOPE NOT TODAY HACKERS',
        database: 'employee_tracker',
    },
    console.log(`Connected to the database.`)
);


/* 
**
*** Inquirer Questions
**
*/

const mainMenu = [
    {
        type: 'list',
        message: "What would you like to do?",
        name: 'action',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ]
    }
]

// Name Salary Department
const addRoleQuestions = [
    {
        type: 'input',
        message: 'What is the role you would like to add?',
        name: 'newRole'
    },
    {
        type: 'input',
        message: 'What is the annual salary for this role?',
        name: 'newRoleSalary'
    },
    {
        type: 'list',
        message: 'What department does this role belong to?',
        name: 'newRoleDepartment',
        choices: 'fdsa'
    }
]

/* 
**
*** End Inquirer Questions
**
*/

// List current departments
function listDepartments() {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            console.log('could not select departments from database')
        }
        // Print the table
        console.table(result.departmentName)
    })
}

// Opens Track Employees Applications
function trackEmployees() {
    inquirer
        .prompt(mainMenu)
        .then((response) => {
            // When 'View all departments' is selected
            if (response.action == 'View all departments') {
                // Select all the columns from Department Table
                db.query(`SELECT * FROM department`, (err, result) => {
                    if (err) {
                        console.log('could not select departments from database')
                    }
                    // Print the table
                    console.table(result)
                    // Return to Main Menu
                    trackEmployees();
                })
            }

            // When 'View all roles' is selected
            if (response.action == 'View all roles') {
                // Select all the columns from Department Table
                db.query(`SELECT * FROM employee_role`, (err, result) => {
                    if (err) {
                        console.log('could not select employee_roles from database')
                    }
                    // Print the table
                    console.table(result)
                    // Return to Main Menu
                    trackEmployees();
                })
            }

            // When 'View all employees' is selected
            if (response.action == 'View all employees') {
                // Select all the columns from Employee
                db.query(`SELECT * FROM employee`, (err, result) => {
                    if (err) {
                        console.log('could not select employees from database')
                    }
                    // Print the table
                    console.table(result)
                    // Return to Main Menu
                    trackEmployees();
                })
            }

            // When 'Add a role' is selected
            if (response.action == 'Add a role') {
                prompt(addRoleQuestions)
            }
        })
}
trackEmployees();