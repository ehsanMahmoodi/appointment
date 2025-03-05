const { Router } = require("express");
const { AuthRouter } = require("./modules/auth/auth.routes");
const { UserRouter } = require("./modules/user/user.routes");
const { Authorization } = require("./common/guard/authorizatio.guard");
const router = Router();
router.use("/auth", AuthRouter);
router.use("/user", Authorization, UserRouter);
module.exports = {
  MainRouter: router,
};
