require('dotenv').config()
const inquirer = require('inquirer');
const db = require('./connection');
const cTable = require("console.table");


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


/* 
**
*** End Inquirer Questions
**
*/


/* 
**
*** Opens Track Employees Applications
**
*/

async function trackEmployees() {
    const answer = await inquirer
        .prompt(
            [
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
        )
        .then(function (response) {
            // Choose from main menu
            console.log(JSON.stringify(response))
            switch (response.action) {
                case 'View all departments':
                    listDepartments();

                    break

                case ('View all roles'):
                    listEmployeeRoles()
                    break

                case ('View all employees'):
                    listEmployees();
                    break

                case ('Add a role'):
                    addEmployeeRole();
                    break

                case ('Add an employee'):
                    addEmployee();
                    break

                case ('Update an employee role'):
                    updateEmployeeRole();
                    break

                case ('Quit'):
                    process.exit();
            }
        })
}


/* 
**
*** Functions for switch case
**
*/


// View Departments
function listDepartments() {
    db.query(`SELECT id AS 'ID', departmentName AS 'Department' FROM department`, (error, response) => {
        if (error) throw error
        console.table(response)
        inquirer.prompt({
            type: 'list',
            message: "What would you like to do?",
            name: 'nextStep',
            choices: [
                'Go back to main menu',
                'Quit',
            ]
        }).then(function (response) {
            switch (response.nextStep) {
                case 'Go back to main menu':
                    trackEmployees();
                    break

                case ('Quit'):
                    process.exit();
            }
        })
    })
}


// View Employee Roles
function listEmployeeRoles() {
    db.query(`SELECT employee_role.title AS 'Title', employee_role.id AS 'ID', department.departmentName AS 'Department', employee_role.salary AS 'Salary' FROM department INNER JOIN employee_role ON employee_role.department_id=department.id ORDER BY id ASC;`, (error, response) => {
        if (error) throw error
        // Print the table
        console.table(response)
        inquirer.prompt({
            type: 'list',
            message: "What would you like to do?",
            name: 'nextStep',
            choices: [
                'Go back to main menu',
                'Quit',
            ]
        }).then(function (response) {
            switch (response.nextStep) {
                case 'Go back to main menu':
                    trackEmployees();
                    break

                case ('Quit'):
                    process.exit();
            }
        })
    })
}

    // View Employees
    function listEmployees() {
        db.query(`SELECT employee.id AS ID, employee.first_name AS 'First Name', employee.last_name AS 'Last Name', employee_role.title AS 'Title', department.departmentName AS 'Department', employee_role.salary AS 'Salary', CONCAT(manager.first_name, ' ' ,manager.last_name) AS Manager FROM employee INNER JOIN employee_role ON employee.role_id=employee_role.id INNER JOIN department ON employee_role.department_id=department.id LEFT OUTER JOIN employee manager ON employee.manager_id =manager.id;`, (error, response) => {
            if (error) throw error
            // Print the table
            console.table(response)
            inquirer.prompt({
                type: 'list',
                message: "What would you like to do?",
                name: 'nextStep',
                choices: [
                    'Go back to main menu',
                    'Quit',
                ]
            }).then(function (response) {
                switch (response.nextStep) {
                    case 'Go back to main menu':
                        trackEmployees();
                        break

                    case ('Quit'):
                        process.exit();
                    }
            })
        })
    }

        // Add a new employee role
        function addEmployeeRole() {
            db.query(`SELECT * FROM department`, async (error, response) => {
                if (error) throw error;

                // Get current departments
                const currentDepartments = await response.map(({ id, name }) => ({
                    name: name,
                    value: id
                }));

                // Initiate role inquiries
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is the role you would like to add?',
                        name: 'title'
                    },
                    {
                        type: 'input',
                        message: 'What is the annual salary for this role?',
                        name: 'salary'
                    },
                    {
                        type: 'list',
                        message: 'What department does this role belong to?',
                        name: 'departmentName',
                        choices: currentDepartments
                    }
                ]).then(function (response) {
                    db.query("INSERT INTO employee_role SET ? ", {
                        title: response.name,
                        salary: response.salary,
                        department_id: response.department,
                    },
                        function (error) {
                            if (error) throw error
                            console.log('New employee role has been created');
                            // Return to main menu
                            trackEmployees();
                        }
                    )
                })
            })
        };

        // Add a new employee
        function addEmployee() {
            db.query(`SELECT * FROM employee_role`, async (err, data) => {
                if (err) throw err;
                const roles = await data.map(({ id, title }) => ({
                    name: title,
                    value: id
                }));

                db.query(`SELECT * FROM employee WHERE manager_id IS NULL`, async (err, data) => {
                    if (err) throw err;
                    const managers = await data.map(({ first_name, last_name, id }) => ({
                        name: first_name + " " + last_name,
                        value: id
                    }));
                    inquirer.prompt([{
                        name: "first_name",
                        type: "input",
                        message: "What is their first name?"
                    },
                    {
                        name: "last_name",
                        type: "input",
                        message: "What is their last name? "
                    },
                    {
                        name: "employee_role",
                        type: "list",
                        message: "What is their role? ",
                        choices: roles
                    },
                    {
                        name: "manager",
                        type: "list",
                        message: "Who is their Manager? ",
                        choices: managers
                    }
                    ]).then(function (response) {
                        db.query("INSERT INTO employee SET ?", {
                            first_name: response.first_name,
                            last_name: response.last_name,
                            role_id: response.role_id,
                            manager_id: response.manager
                        }, function (error) {
                            if (error) throw error
                            console.table("You've added " + response.first_name + " to the employee database.")
                            trackEmployees();
                        })

                    })
                })
            })
        };

        // Update Existing Employee Role or Information
        function updateEmployeeRole() {

            db.query(`SELECT * FROM employee`, (err, employeeData) => {
                if (error) throw error;

                const employees = employeeData.map(({ id, first_name, last_name }) => ({
                    name: first_name + " " + last_name,
                    value: id
                }));
                //inquirer prompt that presents a list of employees to choose from
                inquirer.prompt([{
                    type: 'list',
                    name: 'name',
                    message: "Select an employee to update their role.",
                    choices: employees
                }])
                    .then(response => {
                        db.query(`SELECT * FROM role`, (error, employeeRoleData) => {
                            if (error) throw error;

                            const roles = employeeRoleData.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));
                            //inquirer prompt that presents a list of roles to choose from 
                            inquirer.prompt([{
                                type: 'list',
                                name: 'role',
                                message: "Update Employee's role",
                                choices: roles
                            }])
                        });
                    });
            });
        };

        trackEmployees();
