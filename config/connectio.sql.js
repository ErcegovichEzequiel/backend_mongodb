const mysql = require('mysql');
const util = require ('util')

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USERNAME = process.env.DB_USERNAME || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD 
const DB_NAME = process.env.DB_NAME 

const userSettings = {
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME
}

const database = mysql.createConnection(userSettings);

// Crea una funcion que puede retornan promesas en base a otra funcion que maneja callbacks
const query = util.promisify(database.query).bind(database) // permite ejecutar consultas en la base de datos

database.connect((error) => {
    if (error) {
        console.log("Error connecting: " + error)
    }
    else {
        console.log("Database connected")
    }
})

module.exports = { database, query}