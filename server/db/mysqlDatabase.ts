import mysql from "mysql";
import dbConfig from "./databaseConfig.js";
const mysqlConnection = mysql.createConnection(
  dbConfig as mysql.ConnectionConfig
);

mysqlConnection.connect((error: any) => {
  if (error) throw error;
  console.debug("MySQL is Connected!");
});

export default mysqlConnection;
