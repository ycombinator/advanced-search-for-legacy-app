const mysql = require('promise-mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'blogapp',
  password: 's3cr3T',
  database: 'blog'
});

module.exports = pool;
