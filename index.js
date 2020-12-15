require('dotenv').config()
const { Department, Role, Employee } = require('./lib/classes')
const inquirer = require('inquirer')
const mysql = require('mysql');

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
});