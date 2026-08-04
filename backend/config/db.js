const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // Aiven exige une connexion SSL
  ssl: {
    rejectUnauthorized: false
  },

  connectTimeout: 20000
});

db.connect((err) => {
  if (err) {
    console.error("Erreur MySQL Aiven :", err);
    return;
  }

  console.log("MySQL Aiven connecté");
});

module.exports = db;