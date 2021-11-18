const db = require('../connection');

class Department {
    view (business){
        let sql  = `SELECT name as 'Department Name' FROM department`;
        db.query(sql, (err, results) => {
            console.table(results);
            business.mainMenu();
          });        
    }
    add(departmentName){
        let sql = `INSERT INTO department (name) VALUES ('${departmentName}')`;
        db.query(sql, (err, results) => {
            console.log(`Added Department: ${departmentName}`);
        });        
    }
}

module.exports = Department;