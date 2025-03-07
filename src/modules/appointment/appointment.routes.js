const { Router } = require("express");
const { AppointmentController } = require("./appointment.controller");
const router = Router();
router.post("/create", AppointmentController.create);
module.exports = { AppointmentRouter: router };
