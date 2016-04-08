const mysql = require('promise-mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'app_user',
  password: 's3cr3T',
  database: 'address_book'
});

module.exports = pool;
