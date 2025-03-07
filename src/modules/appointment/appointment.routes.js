const { Router } = require("express");
const { AppointmentController } = require("./appointment.controller");
const router = Router();
router.post("/create", AppointmentController.create);
router.patch("/update/:appointmentId", AppointmentController.update);
router.get("/user/reservations/:patientId", AppointmentController.getPatientAppointments);
router.get("/doctor/reservations/:doctorId", AppointmentController.getDoctorAppointments);
module.exports = { AppointmentRouter: router };
