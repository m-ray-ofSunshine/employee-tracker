const mysql = require("mysql");
const inquirer = require("inquirer");
const {config} = require("./creds");
const connection = mysql.createConnection(config);




connection.connect (err=>{
    if(err) throw err;
    console.log(`connected at ${connection.threadId}`);
})