// All'interno del file, impostiamo le configurazioni di MySQL

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Michelangelo2809!',
    database: 'sql_blog'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});
module.exports = connection;
1