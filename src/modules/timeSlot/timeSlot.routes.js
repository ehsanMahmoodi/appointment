const { Router } = require("express");
const { TimeSlotController } = require("./timeSlot.controller");
const router = Router();
router.post("/time-slot", TimeSlotController.createTimeSlot);
router.patch("/time-slot", TimeSlotController.editTimeSlot);
router.delete("/time-slot", TimeSlotController.removeTimeSlot);
router.get("/time-slot/:dayId", TimeSlotController.getTimeSlots);
module.exports = { TimeSlotRouter: router };
