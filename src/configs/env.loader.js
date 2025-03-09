const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const nodeEnv = process.env.NODE_ENV || "dev";
dotenv.config({
  path: path.join(__dirname, `../../.env.${nodeEnv}`),
});
