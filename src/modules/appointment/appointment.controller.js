const autoBind = require("auto-bind");
const httpCodes = require("http-codes");
const { AppointmentService } = require("./appointment.service");
const { AppointmentMessages } = require("./appointment.messages");
class AppointmentController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = AppointmentService;
  }
  async create(req, res, next) {
    try {
      const patientId = req.user.id;
      const {
        body: { timeId, doctorId },
      } = req;
      await this.#service.create({ timeId, doctorId, patientId });
      res.status(httpCodes.CREATED).json({
        statusCode: res.statusCode,
        data: {
          message: AppointmentMessages.Created,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      const {
        body: { timeId, status },
        params: { appointmentId },
      } = req;
      await this.#service.update({ timeId, status, appointmentId });
      res.status(httpCodes.OK).json({
        statusCode: res.statusCode,
        data: {
          message: AppointmentMessages.Updated,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async getPatientAppointments(req, res, next) {
    try {
      const {
        params: { patientId },
      } = req;
      const appointments =
        await this.#service.getPatientAppointments(patientId);
      res.status(httpCodes.OK).json({
        statusCode: res.statusCode,
        data: { appointments },
      });
    } catch (err) {
      next(err);
    }
  }
  async getDoctorAppointments(req, res, next) {
    try {
      const {
        params: { doctorId },
      } = req;
      const appointments = await this.#service.getDoctorAppointments(doctorId);
      res.status(httpCodes.OK).json({
        statusCode: res.statusCode,
        data: { appointments },
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = { AppointmentController: new AppointmentController() };
