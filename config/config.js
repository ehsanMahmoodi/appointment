require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME+"_dev",
    host: process.env.DB_HOST,
    dialect: "mariadb",
    port:3307,
    dialectOptions: {
      ssl: false,
      allowPublicKeyRetrieval: true,
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME+"_prod",
    host: process.env.DB_HOST,
    dialect: "mariadb",
    port:3307,
    dialectOptions: {
      ssl: false,
      allowPublicKeyRetrieval: true,
    },
  },
};
