const { Router } = require("express");
const {AvailableTimeController} = require("./availableTime.controller");
const router = Router();
router.post(
  "/available-time",
  AvailableTimeController.createDoctorAvailableDays,
);
module.exports = { AvailableTimeRouter: router };