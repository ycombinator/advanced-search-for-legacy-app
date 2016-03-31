const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'blogapp',
  password: 's3cr3T',
  database: 'blog'
});

connection.connect();

module.exports = connection;
