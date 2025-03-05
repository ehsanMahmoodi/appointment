const autoBind = require("auto-bind");
const httpCodes = require("http-codes");
const { TimeSlotService } = require("./timeSlot.service");
const { TimeSlotMessages } = require("./timeSlot.messages");
const { createTimeSlotValidation } = require("./timeSlot.validations");
class TimeSlotController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = TimeSlotService;
  }
  async createTimeSlot(req, res, next) {
    try {
      const { body } = req;
      await createTimeSlotValidation.validateAsync(body);
      await this.#service.createTimeSlot(body);
      res.status(httpCodes.CREATED).json({
        statusCode: res.statusCode,
        data: {
          message: TimeSlotMessages.Created,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = { TimeSlotController: new TimeSlotController() };
