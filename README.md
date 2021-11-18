## Employee Tracker

---

### Table of Contents
* [Description](#description)

* [Usage](#usage)

* [Installation](#installation)

* [Questions](#questions)

* [License](#license)

---

### Description
This application was built for an HR team to update and track employee information such as their salary, title, department, and who they report to.

### Usage
Users can create new employees, add new roles, and update their manager. Upon starting the application, the user is presented with the options to view all existing departments, roles, employees, add a new role or employee, and update the employee information. This application is a great way to keep all employee information stored with one view and one source.

### Installation
The Employee Tracker runs on Node.js and uses the npm packages inquirer, console.table, dotenv, and mysql2.

After cloning the repository, prepare your Node.js environment by opening your command-line and typing:
npm install

This will install the latest npm packages required to run this application.

For security purposes, this application uses dotenv. To configure your SQL connection, create a ".env" file and define your password under the USER_PWD environmental variable. The file should say:
USER_PWD=yourpassword

Once the configuration is set, you're ready to launch the app! Type: node.js index.js

### Questions:

* Email: s.nicole.beltier@gmail.com
* Github: [https://github.com/sbeltier](https://github.com/sbeltier)


### License
N/A
