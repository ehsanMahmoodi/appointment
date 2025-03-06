const { Router } = require("express");
const { AvailableTimeController } = require("./availableTime.controller");
const router = Router();
router.post(
  "/available-time",
  AvailableTimeController.createDoctorAvailableDays,
);
router.patch(
  "/available-time",
  AvailableTimeController.editDoctorAvailableDays,
);
router.delete(
  "/available-time",
  AvailableTimeController.removeDoctorAvailableDay,
);
router.get(
  "/available-time/:doctorId",
  AvailableTimeController.getDoctorAvailableDays,
);
module.exports = { AvailableTimeRouter: router };
