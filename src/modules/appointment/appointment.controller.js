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
}
module.exports = { AppointmentController: new AppointmentController() };
