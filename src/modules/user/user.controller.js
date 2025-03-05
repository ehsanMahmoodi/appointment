const autoBind = require("auto-bind");
const httpCodes = require("http-codes");
const { UserService } = require("./user.service");
const { UserMessages } = require("./user.messages");
const {editProfileValidation} = require("./user.validations");
class UserController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = UserService;
  }
  async editProfile(req, res, next) {
    try {
      const { body } = req;
      await editProfileValidation.validateAsync(body)
      await this.#service.editProfile(body);
      res.status(httpCodes.OK).json({
        statusCode: res.statusCode,
        data: {
          message: UserMessages.Updated,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = { UserController: new UserController() };
