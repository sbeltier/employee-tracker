const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env.USER_PWD,
      database: 'employee_tracker',
      multipleStatements: true
    }
);

module.exports = db;