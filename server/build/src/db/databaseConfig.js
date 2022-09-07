import dotenv from "dotenv";
dotenv.config();
const { MYSQL_PORT, MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASS, MYSQL_DB_NAME } = process.env;
export default {
    host: MYSQL_HOST,
    port: Number(MYSQL_PORT),
    user: MYSQL_USERNAME,
    password: MYSQL_PASS,
    database: MYSQL_DB_NAME,
};
