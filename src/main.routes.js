const { Router } = require("express");
const { AuthRouter } = require("./modules/auth/auth.routes");
const { UserRouter } = require("./modules/user/user.routes");
const { Authorization } = require("./common/guard/authorizatio.guard");
const {
  AvailableTimeRouter,
} = require("./modules/availableTime/availableTime.routes");
const { TimeSlotRouter } = require("./modules/timeSlot/timeSlot.routes");
const {AppointmentRouter} = require("./modules/appointment/appointment.routes");
const {MedicalSystemRouter} = require("./modules/medicalSystem/medicalSystem.routes");
const router = Router();
router.use("/auth", AuthRouter);
router.use("/user", Authorization, UserRouter);
router.use("/doctor", Authorization, AvailableTimeRouter);
router.use("/doctor", Authorization, TimeSlotRouter);
router.use("/appointment", Authorization, AppointmentRouter);
router.use("/medical-system", MedicalSystemRouter);
module.exports = {
  MainRouter: router,
};
