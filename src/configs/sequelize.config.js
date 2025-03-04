const { Sequelize } = require("sequelize");
let sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  logging: false,

});
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized.");
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};
module.exports = { sequelize, initializeDatabase };
