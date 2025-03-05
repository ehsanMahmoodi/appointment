const { Router } = require("express");
const { AuthController } = require("./auth.controller");
const router = Router();
router.post("/send-otp", AuthController.sendOtp);
router.post("/check-otp", AuthController.checkOtp);
router.post("/register/doctor", AuthController.registerDoctor);
router.post("/register/patient", AuthController.registerPatient);
module.exports = { AuthRouter: router };
