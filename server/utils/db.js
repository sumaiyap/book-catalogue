const mysql = require("mysql2/promise")
async function getConnection() {
  // create the connection
  const connection = await mysql.createConnection({
    host: "book.cddtpdramqym.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Simpletech91s",
    database: "codingdeft",
  })
  return connection
}

module.exports = getConnection

