const { Router } = require("express");
const { TimeSlotController } = require("./timeSlot.controller");
const router = Router();
router.post("/time-slot", TimeSlotController.createTimeSlot);
router.patch("/time-slot", TimeSlotController.editTimeSlot);
module.exports = { TimeSlotRouter: router };
