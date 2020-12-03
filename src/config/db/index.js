
const mysql = require("mysql");

async function connect() {
  try {
    await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "duy123",
      database: "quan_ly_thuc_tap_sinh",
      port: 3306,
    });
    
  } catch (error) {
    
  }
}

module.exports = { connect };
