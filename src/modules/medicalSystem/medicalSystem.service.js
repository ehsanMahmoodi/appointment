const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { MedicalSystem } = require("./medicalSystem.model");
const { MedicalSystemMessages } = require("./medicalSystem.messages");
class MedicalSystemService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = MedicalSystem;
  }
  async create(data) {
    const { title, parentId } = data;
    await this.checkExistMedicalSystemByTitle(title);
    let parent = null;
    if (parentId) {
      parent = await this.findMedicalSystemById(parentId);
      if (!parent)
        throw new createHttpError.NotFound(
          MedicalSystemMessages.NotFoundParent,
        );
    }
    await this.#model.create(data, {
      fields: ["title", "description", "parentId"],
    });
    return true;
  }
  async checkExistMedicalSystemByTitle(title) {
    const medial = await this.#model.findOne({ where: { title } });
    if (medial)
      throw new createHttpError.Conflict(MedicalSystemMessages.Conflict);
    return true;
  }
  async findMedicalSystemById(id) {
    return await this.#model.findOne({ where: { id } });
  }
}
module.exports = { MedicalSystemService: new MedicalSystemService() };
