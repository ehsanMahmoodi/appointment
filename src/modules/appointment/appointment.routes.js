const { Router } = require("express");
const { AppointmentController } = require("./appointment.controller");
const router = Router();
router.post("/create", AppointmentController.create);
router.patch("/update/:appointmentId", AppointmentController.update);
module.exports = { AppointmentRouter: router };
