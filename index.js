const inquirer = require('inquirer');
const { prompt } = require('inquirer');
const cTable = require('console.table');
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
const mysql = require('mysql2');
const Connection = require('mysql2/typings/mysql/lib/Connection');



// Establish mySQL connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '$hru33eRy@667%',
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
            'Update an employee role',
            'Quit'
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


            // When 'Quit' is selected, end connection
            if (response.action == 'Quit') {
                Connection.end();
            }            
        })
}
trackEmployees();