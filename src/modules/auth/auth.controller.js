const autoBind = require("auto-bind");
const httpCodes = require("http-codes");
const { AuthService } = require("./auth.service");
const { sendOtpValidation, checkOtpValidation } = require("./auth.validations");
const { AuthMessages } = require("./auth.messages");
class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = AuthService;
  }
  async sendOtp(req, res, next) {
    try {
      const {
        body: { phone },
      } = req;
      await sendOtpValidation.validateAsync({ phone });
      const otp = await this.#service.sendOtp(phone);
      res.status(httpCodes.OK).json({
        statusCode: res.statusCode,
        data: {
          message: AuthMessages.OtpSend,
          otp,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOtp(req, res, next) {
    try {
      const {
        body: { phone, code },
      } = req;
      await checkOtpValidation.validateAsync({ phone, code });
      await this.#service.checkOtp({ phone, code });
      res.status(httpCodes.OK).json({
        statusCode: res.statusCode,
        data: {
          message: AuthMessages.Login,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { AuthController: new AuthController() };
