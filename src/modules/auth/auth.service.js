require('../../configs/env.loader')
const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const {
  Profile,
  Otp,
  Doctor,
  Patient,
  RefreshToken,
} = require("../user/user.model");
const { randomInt } = require("crypto");
const { AuthMessages } = require("./auth.messages");
const { Roles } = require("../../common/constant/role.constant");
const jwt = require("jsonwebtoken");
const { verifyJwtToken } = require("../../common/utils/functions");
class AuthService {
  #ProfileModel;
  #OtpModel;
  #DoctorModel;
  #PatientModel;
  #RefreshTokenModel;
  constructor() {
    autoBind(this);
    this.#ProfileModel = Profile;
    this.#OtpModel = Otp;
    this.#DoctorModel = Doctor;
    this.#PatientModel = Patient;
    this.#RefreshTokenModel = RefreshToken;
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
    if (getProfileOtp.code !== code)
      throw new createHttpError.BadRequest(AuthMessages.OtpNotMatch);
    if (getProfileOtp.expiresIn < now)
      throw new createHttpError.BadRequest(AuthMessages.OtpExpired);
    profile.verifyPhone = true;
    await profile.save();
    const access_token = this.signAccessToken({ id: profile.id, phone });
    const refresh_token = this.signRefreshToken({ id: profile.id, phone });
    return { access_token, refresh_token };
  }
  async findProfileByPhone({ phone, isThrowError }) {
    const profile = await this.#ProfileModel.findOne({ where: { phone } });
    if (!profile && isThrowError)
      throw new createHttpError.NotFound(AuthMessages.NotFound);
    return profile;
  }
  async registerDoctor(registerDTO) {
    const {
      profileId,
      medicalSystemCode,
      medicalSpecialtyId,
      firstName,
      lastname,
      nationalCode,
    } = registerDTO;
    await this.checkExistRegistration(profileId);
    const profile = await this.#ProfileModel.findOne({
      where: { id: profileId },
    });
    if (!profile) throw new createHttpError.NotFound(AuthMessages.NotFound);
    const newDoctor = {
      medicalSystemCode,
      medicalSpecialtyId,
    };
    await profile.createDoctor(newDoctor);
    Object.assign(profile, {
      firstName,
      lastname,
      nationalCode,
      role: Roles.DOCTOR,
    });
    await profile.save();
    return true;
  }
  async registerPatient(registerDTO) {
    const { profileId, firstName, lastname, nationalCode } = registerDTO;
    await this.checkExistRegistration(profileId);
    const profile = await this.#ProfileModel.findOne({
      where: { id: profileId },
    });
    if (!profile) throw new createHttpError.NotFound(AuthMessages.NotFound);
    await profile.createPatient({ profileId: profile.id });
    Object.assign(profile, {
      firstName,
      lastname,
      nationalCode,
      role: Roles.PATIENT,
    });
    await profile.save();
    return true;
  }
  async checkExistRegistration(profileId) {
    const profile = await this.#ProfileModel.findOne({
      where: { id: profileId },
    });
    const doctor = await profile.getDoctor();
    const patient = await profile.getPatient();
    if (patient || doctor)
      throw new createHttpError.Conflict(AuthMessages.RegisterConflict);
    return true;
  }
  signAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "10d",
      algorithm: "HS256",
    });
  }
  signRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "1y",
      algorithm: "HS256",
    });
  }
  async refreshToken(token) {
    const { id } = verifyJwtToken(token, process.env.REFRESH_TOKEN_SECRET_KEY);
    const profile = await this.#ProfileModel.findByPk(id);
    const blackListToken = await this.#RefreshTokenModel.findOne({
      where:{
        profileId: profile.id,
        token,
      }
    })
    if(blackListToken)
      throw new createHttpError.BadRequest(AuthMessages.RefreshTokenExpired)
    if (!profile) throw new createHttpError.NotFound(AuthMessages.NotFound);
    const access_token = this.signAccessToken({
      id: profile.id,
      phone: profile.phone,
    });
    const refresh_token = this.signRefreshToken({
      id: profile.id,
      phone: profile.phone,
    });
    await this.#RefreshTokenModel.create({
      profileId: profile.id,
      token,
    });
    return { access_token, refresh_token };
  }
}
module.exports = { AuthService: new AuthService() };
