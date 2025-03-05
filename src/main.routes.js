const { Router } = require("express");
const { AuthRouter } = require("./modules/auth/auth.routes");
const { UserRouter } = require("./modules/user/user.routes");
const { Authorization } = require("./common/guard/authorizatio.guard");
const {
  AvailableTimeRouter,
} = require("./modules/availableTime/availableTime.routes");
const router = Router();
router.use("/auth", AuthRouter);
router.use("/user", Authorization, UserRouter);
router.use("/doctor", Authorization, AvailableTimeRouter);
module.exports = {
  MainRouter: router,
};
