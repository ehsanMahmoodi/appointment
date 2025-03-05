const { Router } = require("express");
const { UserController } = require("./user.controller");
const router = Router();
router.post("/edit-profile", UserController.editProfile);
module.exports = { UserRouter: router };
