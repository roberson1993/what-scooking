var mysql      = require('mysql');

// Database setup
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'projects'
  });
// Database connection
connection.connect();

module.exports = connection;
