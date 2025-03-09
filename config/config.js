module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE,
    port: 3307,
    dialectOptions: {
      ssl: false,
      allowPublicKeyRetrieval: true,
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE,
    port: 3307,
    dialectOptions: {
      ssl: false,
      allowPublicKeyRetrieval: true,
    },
  },
};
