require("dotenv").config();
const express = require("express");
const { MainRouter } = require("./src/main.routes");
const { NotFoundHandler } = require("./src/common/exceptions/not-found");
const {
  AllExceptionHandler,
} = require("./src/common/exceptions/all-exceptions");
const { swaggerConfig } = require("./src/configs/swagger.config");
const { initializeDatabase } = require("./src/configs/sequelize.config");
const main = async () => {
  // initialize application
  const app = express();
  // configs
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  swaggerConfig(app);
  await initializeDatabase();
  // routes and error-handling
  app.use(MainRouter);
  NotFoundHandler(app);
  AllExceptionHandler(app);
  // connection
  const PORT = process.env.PORT;
  app.listen(PORT, () => console.log(`server run on http://localhost:${PORT}`));
};
main().then((r) => r);
