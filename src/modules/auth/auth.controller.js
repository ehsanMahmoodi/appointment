const autoBind = require("auto-bind");
const httpCodes = require("http-codes");
const { AuthService } = require("./auth.service");
const {
  sendOtpValidation,
  checkOtpValidation,
  registerDoctorValidation,
  registerPatientValidation,
} = require("./auth.validations");
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
      const { access_token, refresh_token } = await this.#service.checkOtp({
        phone,
        code,
      });
      res.status(httpCodes.OK).json({
        statusCode: res.statusCode,
        data: {
          message: AuthMessages.Login,
          access_token,
          refresh_token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async registerDoctor(req, res, next) {
    try {
      const { body } = req;
      await registerDoctorValidation.validateAsync(body);
      await this.#service.registerDoctor(body);
      res.status(httpCodes.OK).json({
        statusCode: res.statusCode,
        data: {
          message: AuthMessages.Login,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async registerPatient(req, res, next) {
    try {
      const { body } = req;
      await registerPatientValidation.validateAsync(body);
      await this.#service.registerPatient(body);
      res.status(httpCodes.OK).json({
        statusCode: res.statusCode,
        data: {
          message: AuthMessages.Login,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async refreshToken(req, res, next) {
    try {
      const {
        body: { refreshToken },
      } = req;
      const { access_token, refresh_token } =
        await this.#service.refreshToken(refreshToken);
      res.status(httpCodes.OK).json({
        statusCode: res.statusCode,
        data: {
          message: AuthMessages.Login,
          access_token,
          refresh_token,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = { AuthController: new AuthController() };
