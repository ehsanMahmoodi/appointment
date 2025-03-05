const { Router } = require("express");
const { TimeSlotController } = require("./timeSlot.controller");
const router = Router();
router.post("/time-slot", TimeSlotController.createTimeSlot);
module.exports = { TimeSlotRouter: router };
