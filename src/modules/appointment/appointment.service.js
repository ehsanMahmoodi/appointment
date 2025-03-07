const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { Appointment } = require("./appointment.model");
const { TimeSlot } = require("../timeSlot/timeSlot.model");
const { TimeSlotMessages } = require("../timeSlot/timeSlot.messages");
const { AppointmentMessages } = require("./appointment.messages");
const {
  AvailableTimeService,
} = require("../availableTime/availableTime.service");
const { AvailableTime } = require("../availableTime/availableTime.model");
class AppointmentService {
  #AppointmentModel;
  #TimeModel;
  #AvailableTimeModel;
  constructor() {
    autoBind(this);
    this.#AppointmentModel = Appointment;
    this.#TimeModel = TimeSlot;
    this.#AvailableTimeModel = AvailableTime;
  }
  async create(appointmentDTO) {
    const { timeId, doctorId } = appointmentDTO;
    await AvailableTimeService.checkExistDoctor(doctorId);
    await this.checkExistAvailableDoctorOfDay({ doctorId, timeId });
    const time = await this.checkTimeBooking(timeId);
    await this.#AppointmentModel.create(appointmentDTO, {
      fields: ["doctorId", "patientId", "timeId"],
    });
    time.isBooking = true;
    await time.save();
    return true;
  }
  async checkExistTime(id) {
    const time = await this.#TimeModel.findOne({ where: { id } });
    if (!time) throw new createHttpError.NotFound(TimeSlotMessages.NotFound);
    return time;
  }
  async checkTimeBooking(id) {
    const time = await this.checkExistTime(id);
    if (time.isBooking)
      throw new createHttpError.BadRequest(AppointmentMessages.BooKingTime);
    return time;
  }
  async checkExistAvailableDoctorOfDay({ doctorId, timeId }) {
    const time = await this.checkTimeBooking(timeId);
    const dayId = time.dayId;
    console.log(time.dataValues);
    const availableDay = await this.#AvailableTimeModel.findOne({
      where: { doctorId, id: dayId },
    });
    if (!availableDay)
      throw new createHttpError.BadRequest(TimeSlotMessages.NotFound);
    return true;
  }
}
module.exports = { AppointmentService: new AppointmentService() };
