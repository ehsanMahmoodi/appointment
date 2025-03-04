const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { Profile, Otp } = require("../user/user.model");
const { randomInt } = require("crypto");
const { AuthMessages } = require("./auth.messages");
class AuthService {
  #ProfileModel;
  #OtpModel;
  constructor() {
    autoBind(this);
    this.#ProfileModel = Profile;
    this.#OtpModel = Otp;
  }
  async sendOtp(phone) {
    let profile = await this.findProfileByPhone({ phone, isThrowError: false });
    if (!profile) {
      profile = await this.#ProfileModel.create({ phone });
    }
    const now = Date.now();
    const otp = {
      code: String(randomInt(1000, 9999)),
      expiresIn: now + 1000 * 60 * 2,
      profileId: profile.id,
    };
    let userOtp = await profile.getOtp();
    if (userOtp?.expiresIn && userOtp?.expiresIn > now) {
      throw new createHttpError.BadRequest(AuthMessages.OtpNotExpired);
    }
    await this.#OtpModel.upsert(otp);
    return await profile.getOtp();
  }
  async checkOtp(otpDTO) {
    const { phone, code } = otpDTO;
    const profile = await this.findProfileByPhone({
      phone,
      isThrowError: true,
    });
    const now = Date.now();
    const getProfileOtp = await this.#OtpModel.findOne({
      where: {
        profileId: profile.id,
      },
    });
    if (!getProfileOtp)
      throw new createHttpError.NotFound(AuthMessages.OtpNotFound);
    if (getProfileOtp.expiresIn < now)
      throw new createHttpError.BadRequest(AuthMessages.OtpExpired);
    if (getProfileOtp.code !== code)
      throw new createHttpError.BadRequest(AuthMessages.OtpNotMatch);
    profile.verifyPhone = true;
    await profile.save();
    return true;
  }
  async findProfileByPhone({ phone, isThrowError }) {
    const profile = await this.#ProfileModel.findOne({ where: { phone } });
    if (!profile && isThrowError)
      throw new createHttpError.NotFound(AuthMessages.NotFound);
    return profile;
  }
}
module.exports = { AuthService: new AuthService() };
