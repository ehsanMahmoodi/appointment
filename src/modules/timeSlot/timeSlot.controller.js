const autoBind = require("auto-bind");
const httpCodes = require("http-codes");
const { TimeSlotService } = require("./timeSlot.service");
const { TimeSlotMessages } = require("./timeSlot.messages");
const { createTimeSlotValidation, editTimeSlotValidation} = require("./timeSlot.validations");
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
  async editTimeSlot(req, res, next) {
    try {
      const { body } = req;
      await editTimeSlotValidation.validateAsync(body);
      await this.#service.editTimeSlot(body);
      res.status(httpCodes.OK).json({
        statusCode: res.statusCode,
        data: {
          message: TimeSlotMessages.Updated,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = { TimeSlotController: new TimeSlotController() };
