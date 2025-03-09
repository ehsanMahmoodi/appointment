const { Router } = require("express");
const { MedicalSystemController } = require("./medicalSystem.controller");
const { Authorization } = require("../../common/guard/authorizatio.guard");
const router = Router();
router.post("/", Authorization, MedicalSystemController.create);
router.get("/", MedicalSystemController.getAll);
module.exports = { MedicalSystemRouter: router };
