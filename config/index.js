require("dotenv").config();

console.log(process.env.DB_CONNECTION);
module.exports = {
  dbConnection: process.env.DB_CONNECTION,
  port: process.env.PORT || 8080,
  secretKey: process.env.SECRET_JWT,
};
