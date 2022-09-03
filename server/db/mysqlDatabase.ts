const mysql = require("mysql");
const dbConfig = require("./databaseConfig");
const mysqlConnection = mysql.createConnection(dbConfig);

mysqlConnection.connect((error: any) => {
  if (error) throw error;
  console.log("MySQL is Connected!");
});

module.exports = mysqlConnection;
