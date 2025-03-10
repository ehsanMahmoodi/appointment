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
const {
  AppointmentStatus,
} = require("../../common/constant/appointment.constant");
const { Doctor, Profile, Patient } = require("../user/user.model");
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
    const availableDay = await this.#AvailableTimeModel.findOne({
      where: { doctorId, id: dayId },
    });
    if (!availableDay)
      throw new createHttpError.BadRequest(TimeSlotMessages.NotFound);
    return true;
  }
  async update(appointmentDTO) {
    const { timeId, status, appointmentId } = appointmentDTO;
    const appointment = await this.findAppointment({
      id: appointmentId,
      isThrowError: true,
    });
    let doctorId = appointment.doctorId;
    if (!Object.values(AppointmentStatus).includes(status))
      throw new createHttpError.BadRequest(AppointmentMessages.InValidStatus);
    let newTime = null;
    let oldTime = appointment.timeId;
    if (timeId && timeId !== oldTime) {
      await this.checkExistAvailableDoctorOfDay({ doctorId, timeId });
      newTime = await this.checkTimeBooking(timeId);
    }
    await this.#AppointmentModel.update(
      { status, timeId },
      { where: { id: appointmentId } },
    );
    if (newTime) {
      newTime.isBooking = true;
      await newTime.save();
      await this.#TimeModel.update(
        { isBooking: false },
        { where: { id: oldTime } },
      );
    }
    return true;
  }
  async findAppointment({ id, isThrowError }) {
    const appointment = await this.#AppointmentModel.findOne({ where: { id } });
    if (isThrowError && !appointment)
      throw new createHttpError.NotFound(AppointmentMessages.NotFound);
    return appointment;
  }
  async getPatientAppointments(patientId) {
    const appointments = await this.#AppointmentModel.findAll({
      where: { patientId },
      include: [
        {
          model: Doctor,
          as: "doctor",
          include: [{ model: Profile, as: "doctor" }],
        },
        {
          model: TimeSlot,
          as: "time",
          include: [{ model: AvailableTime, as: "day" }],
        },
      ],
    });
    let result = [];
    for (const item of appointments) {
      let doctorName = `${item.doctor.doctor.firstName} ${item.doctor.doctor.lastName ?? ""}`;
      let detail = {
        id: item.id,
        status: item.status,
        doctor: doctorName,
        time: item.time.start,
        day: item.time.day.day,
      };
      result.push(detail);
    }
    return result;
  }
  async getDoctorAppointments(doctorId) {
    const appointments = await this.#AppointmentModel.findAll({
      where: { doctorId },
      include: [
        {
          model: Patient,
          as: "patient",
          include: [{ model: Profile, as: "patient" }],
        },
        {
          model: TimeSlot,
          as: "time",
          include: [{ model: AvailableTime, as: "day" }],
        },
      ],
    });
    let result = [];
    for (const item of appointments) {
      let patientName = `${item.patient.patient.firstName} ${item.patient.patient.lastName ?? ""}`;
      let detail = {
        id: item.id,
        status: item.status,
        patient: patientName,
        time: item.time.start,
        day: item.time.day.day,
      };
      result.push(detail);
    }
    return result;
  }
}
module.exports = { AppointmentService: new AppointmentService() };
