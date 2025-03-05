const autoBind = require("auto-bind");
const httpCodes = require("http-codes");
const { AvailableTimeService } = require("./availableTime.service");
const { AvailableTimeMessages } = require("./availableTime.messages");
const { createAvailableTime } = require("./availableTime.validations");
class AvailableTimeController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = AvailableTimeService;
  }
  async createDoctorAvailableDays(req, res, next) {
    try {
      const { body } = req;
      await createAvailableTime.validateAsync(body);
      await this.#service.createDoctorAvailableDays(body);
      res.status(httpCodes.CREATED).json({
        statusCode: res.statusCode,
        data: {
          message: AvailableTimeMessages.Created,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = { AvailableTimeController: new AvailableTimeController() };
