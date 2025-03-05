const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { AvailableTime } = require("./availableTime.model");
const { Doctor } = require("../user/user.model");
const { AvailableTimeMessages } = require("./availableTime.messages");
class AvailableTimeService {
  #AvailableTimeModel;
  #DoctorModel;
  constructor() {
    autoBind(this);
    this.#AvailableTimeModel = AvailableTime;
    this.#DoctorModel = Doctor;
  }
  async createDoctorAvailableDays(dayDTO) {
    let { doctorId, day } = dayDTO;
    await this.checkExistDoctor(doctorId);
    const availableDay = await this.#AvailableTimeModel.findOne({
      where: {
        doctorId,
        day,
      },
    });
    if (availableDay)
      throw new createHttpError.BadRequest(AvailableTimeMessages.DayExisted);
    await this.#AvailableTimeModel.create(dayDTO);
  }
  async checkExistDoctor(id) {
    const doctor = await this.#DoctorModel.findByPk(id);
    if (!doctor)
      throw new createHttpError.NotFound(AvailableTimeMessages.NotFoundDoctor);
    return doctor;
  }
  async editDoctorAvailableDays(dayDTO) {
    let { doctorId, day } = dayDTO;
    await this.checkExistDoctor(doctorId);
    const where = { doctorId, day };
    await this.findDoctorDay(where);
    await this.#AvailableTimeModel.update(dayDTO, { where });
  }
  async removeDoctorAvailableDay(dayDTO) {
    const { doctorId, day } = dayDTO;
    await this.checkExistDoctor(doctorId);
    const where = { doctorId, day };
    await this.findDoctorDay(where);
    await this.#AvailableTimeModel.destroy({ where });
  }
  async findDoctorDay(condition) {
    const availableDay = await this.#AvailableTimeModel.findOne({
      where: condition,
    });
    if (!availableDay)
      throw new createHttpError.BadRequest(AvailableTimeMessages.NotFoundDay);
    return true;
  }
}
module.exports = { AvailableTimeService: new AvailableTimeService() };
