const mysql = require("mysql");
const inquirer = require("inquirer");
var figlet = require('figlet');
const { config } = require("./creds");
const connection = mysql.createConnection(config);

 

const start = () => {
   
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: [
                    "View departments, roles, or employees",
                    "Add a department, role, or employee",
                    "Update an employee's role",
                    "Exit"
                ],
            }
        ])
        .then((res) => {

            switch (res.choice) {
                case "Exit":
                    connection.end();
                    break;
                case "View departments, roles, or employees":
                    view();
                    break;
                case "Add a department, role, or employee":
                    add();
                    break;
                case "Update an employee's role":
                    updateRole();
                    break;

            }

        })
};

const view = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "viewChoice",
                message: "What would you like to view?",
                choices: [
                    "All",
                    "Departments",
                    "Roles",
                    "Employees",
                    "Go back"
                ]
            }
        ])
        .then((res) => {

            switch (res.viewChoice) {
                case "All":
                    viewAll();
                    break;
                case "Departments":
                    viewAllDepartments();
                    break;
                case "Roles":
                    viewAllRoles();
                    break;
                case "Employees":
                    viewAllEmployees();
                    break;
                case "Go back":
                    start();

            }


        })



}
const viewAll = () => {
    let query =
        'SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name ';
    query +=
        'FROM ((employee INNER JOIN role ON employee.role_id = role.id ) ';
    query +=
        'INNER JOIN department ON employee.department_id = department.id);';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        view();
    })
};
const viewAllDepartments = () => {
    let query = 'SELECT department.name, department.id FROM department;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        view();
    })
};
const viewAllRoles = () => {
    let query = 'SELECT role.title, role.salary, role.id, role.department_id FROM role;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        view();
    })
};
const viewAllEmployees = () => {
    let query = 'SELECT employee.first_name, employee.last_name FROM employee;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        view();
    })
};
const add = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "addChoice",
                message: "What would you like to add?",
                choices: [
                    "Department",
                    "Role",
                    "Employee",
                    "Go back"
                ]
            }
        ])
        .then((res) => {
            switch (res.addChoice) {
                case "Department":
                    addDepartment();
                    break;
                case "Role":
                    addRole();
                    break;
                case "Employee":
                    addEmployee();
                    break;
                case "Go back":
                    start();
            }
        })
}
const addDepartment = () => {
    inquirer
        .prompt({

            type: "input",
            name: "newDept",
            message: "What is the new department's name?"

        })
        .then((res) => {

            let query = 'INSERT INTO department (name) VALUES (?);';
            connection.query(query, [res.newDept], (err, res) => {
                if (err) throw err;
                console.log("New department added");
                add();
            })
        })
}
const addRole = () => {
    inquirer
        .prompt([{

            type: "input",
            name: "title",
            message: "What is the new roles's title?"

        },
        {
            type: "input",
            name: "salary",
            message: "What is the new role's salary?"
        },
        {
            type: "input",
            name: "deptId",
            message: "What is the new role's department ID?"
        }])
        .then((res) => {

            let query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);';
            connection.query(query, [res.title, res.salary, res.deptId], (err, res) => {
                if (err) throw err;
                console.log("New role added");
                add();
            })
        })
}
const addEmployee = () => {
    inquirer
        .prompt([{

            type: "input",
            name: "firstName",
            message: "What is the first name of the new employee?"

        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the new employee?"
        },
        {
            type: "input",
            name: "roleId",
            message: "What is the new employee's role ID?"
        }])
        .then((res) => {

            let deptId = getDeptId(res.roleId);
            console.log(deptId);
            let query = 'INSERT INTO employee (first_name, last_name, role_id, department_id) VALUES (?, ?, ?, ?);';
            connection.query(query, [res.firstName, res.lastName, res.roleId, deptId], (err, res) => {
                if (err) throw err;
                console.log("New employee added");
                add();
            })
        })
}
const getDeptId = (id) => {
    let query = `SELECT role.department_id FROM role WHERE role.id = ${id};`
    var deptId = connection.query(query, (err, res) => {
        console.log(res[0].department_id);
        return res[0].department_id;
    })
    return deptId.toString();
}

connection.connect(err => {
    if (err) throw err;
    console.log(`connected at ${connection.threadId}`);
    figlet('Employee Tracker', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
    start();
});