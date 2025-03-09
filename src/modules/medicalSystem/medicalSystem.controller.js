const autoBind = require("auto-bind");
const httpCodes = require("http-codes");
const { MedicalSystemService } = require("./medicalSystem.service");
const { MedicalSystemMessages } = require("./medicalSystem.messages");
const { createMedicalValidation } = require("./medicalSystem.validations");
class MedicalSystemController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = MedicalSystemService;
  }
  async create(req, res, next) {
    try {
      const { body } = req;
      await createMedicalValidation.validateAsync(body);
      await this.#service.create(body);
      res.status(httpCodes.CREATED).json({
        statusCode: res.statusCode,
        data: {
          message: MedicalSystemMessages.Created,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async getAll(req, res, next) {
    try {
      const medicalSystems = await this.#service.getAll();
      res.status(httpCodes.OK).json({
        statusCode: res.statusCode,
        data: { medicalSystems },
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = { MedicalSystemController: new MedicalSystemController() };
