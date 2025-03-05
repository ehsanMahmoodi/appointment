const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { AvailableTime } = require("../availableTime/availableTime.model");
const {
  AvailableTimeMessages,
} = require("../availableTime/availableTime.messages");
const {
  isValidTime,
  isTimeAfter,
  canAddTimeSlot,
} = require("../../common/utils/functions");
const { TimeSlot } = require("./timeSlot.model");
const { TimeSlotMessages } = require("./timeSlot.messages");
class TimeSlotService {
  #DayModel;
  #TimeModel;
  constructor() {
    autoBind(this);
    this.#DayModel = AvailableTime;
    this.#TimeModel = TimeSlot;
  }
  async createTimeSlot(timeDTO) {
    const { dayId, start, end } = timeDTO;
    await this.findDay(dayId);
    isValidTime(start);
    if (end) {
      isValidTime(end);
      let timeStatus = isTimeAfter(end, start);
      if (!timeStatus)
        throw new createHttpError.BadRequest(TimeSlotMessages.AfterTimeError);
    }
    await this.checkExistStartTime({ dayId, start });
    await this.checkTimeConflicts({ dayId, start, end });
    await this.#TimeModel.create(timeDTO, {
      fields: ["dayId", "start", "end"],
    });
  }
  async checkExistStartTime({ dayId, start }) {
    const checkExistStartTime = await this.#TimeModel.findOne({
      where: { dayId, start },
    });
    if (checkExistStartTime)
      throw new createHttpError.Conflict(TimeSlotMessages.Conflict);
    return true;
  }
  async findDay(id) {
    const day = await this.#DayModel.findOne({ where: { id } });
    if (!day)
      throw new createHttpError.NotFound(AvailableTimeMessages.NotFoundDay);
    return day;
  }
  async checkTimeConflicts(times) {
    const { start, end, dayId } = times;
    const timeSlots = await this.#TimeModel.findAll({
      where: { dayId },
      attributes: ["start", "end"],
    });
    if (timeSlots.length > 0) {
      const newSlot = {
        start,
        ...(end && { end }),
      };
      return canAddTimeSlot(timeSlots, newSlot);
    }
  }
}
module.exports = { TimeSlotService: new TimeSlotService() };
