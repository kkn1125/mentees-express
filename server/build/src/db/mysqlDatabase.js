import mysql from "mysql";
import dbConfig from "./databaseConfig.js";
const mysqlConnection = mysql.createConnection(dbConfig);
mysqlConnection.connect((error) => {
    if (error)
        throw error;
    console.debug("MySQL is Connected!");
});
export default mysqlConnection;
