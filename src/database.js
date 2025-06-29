const mysql = require("mysql2");

// Crear pool de conexiones
const pool = mysql
  .createPool({
    // Parámetros de conexion
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    // Parámetros de configuración de las opciones de conexion
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 6000,
    queueLimit: 0,
  })
  .promise();

console.log("Conexión con la BBDD creada");

module.exports = { pool };
