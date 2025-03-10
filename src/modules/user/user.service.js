const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { Profile, Doctor, Patient } = require("./user.model");
class UserService {
  #ProfileModel;
  #DoctorModel;
  #PatientModel;
  constructor() {
    autoBind(this);
    this.#ProfileModel = Profile;
    this.#DoctorModel = Doctor;
    this.#PatientModel = Patient;
  }
  async editProfile(userDTO) {
    const { birthDate, firstName, lastName, isActive } = userDTO;
    const profile = await this.#ProfileModel.findByPk(userDTO.profileId);
    const patient = await profile.getPatient();
    const doctor = await profile.getDoctor();
    if (doctor) {
      await this.#DoctorModel.update(userDTO, {
        where: {
          profileId: userDTO.profileId,
        },
      });
      let updateProfile = {
        ...(birthDate && { birthDate }),
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(isActive && { isActive }),
      };
      if (Object.keys(updateProfile).length > 0)
        Object.assign(profile, updateProfile);
      await profile.save();
    }
    if (patient) {
      await this.#ProfileModel.update(userDTO, {
        where: {
          id: userDTO.profileId,
        },
      });
    }
    return true;
  }
}
module.exports = { UserService: new UserService() };
