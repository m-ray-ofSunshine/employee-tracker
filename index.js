const mysql = require("mysql");
const inquirer = require("inquirer");
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
        if(err) throw err;
        console.table(res);
        view();
    })
};
const viewAllDepartments = () => {
    let query = 'SELECT department.name FROM department;';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        view();
    })
};
const viewAllRoles = () => {
    let query = 'SELECT role.title, role.salary FROM role;';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        view();
    })
};
const viewAllEmployees = () => {
    let query = 'SELECT employee.first_name, employee.last_name FROM employee;';
    connection.query(query, (err, res) => {
        if(err) throw err;
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
    .then((res)=> {
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
    }})
}


connection.connect(err => {
    if (err) throw err;
    console.log(`connected at ${connection.threadId}`);
    start();
});