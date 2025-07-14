const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "maxime",
  password: "root",
  database: "shopedb",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL DB");
});

module.exports = db;
