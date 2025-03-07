const autoBind = require("auto-bind");
const httpCodes = require("http-codes");
const { MedicalSystemService } = require("./medicalSystem.service");
const { MedicalSystemMessages } = require("./medicalSystem.messages");
const {createMedicalValidation} = require("./medicalSystem.validations");
class MedicalSystemController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = MedicalSystemService;
  }
  async create(req, res, next) {
    try {
      const { body } = req;
      await createMedicalValidation.validateAsync(body)
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
}
module.exports = { MedicalSystemController: new MedicalSystemController() };
