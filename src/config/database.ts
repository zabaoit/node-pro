// Get the client
import mysql from "mysql2/promise";

// Create the connection to database
const getConnection = async () => {
  const connection = await mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "123456",
    database: "nodejs-pro-hoidanit",
  });

  return connection;
};

export default getConnection;
