const { Profile, Otp, Doctor, Patient,RefreshToken} = require("../modules/user/user.model");
const {AvailableTime} = require("../modules/availableTime/availableTime.model");
const {TimeSlot} = require("../modules/timeSlot/timeSlot.model");
const {Appointment} = require("../modules/appointment/appointment.model");
const {MedicalSystem} = require("../modules/medicalSystem/medicalSystem.model");

// user relations
Profile.hasOne(Otp, {foreignKey: "profileId",as: "otp",onDelete: "CASCADE"});
Otp.belongsTo(Profile, { foreignKey: "profileId", as: "profile"});
Profile.hasOne(Doctor,{foreignKey:"profileId",as:"profile",onDelete:"CASCADE"})
Doctor.belongsTo(Profile,{foreignKey:"profileId",as:"profile"})
Profile.hasOne(Patient,{foreignKey:"profileId",as:"patient",onDelete:"CASCADE"})
Patient.belongsTo(Profile,{foreignKey:"profileId",as:"patient"})
Profile.hasOne(RefreshToken,{foreignKey:"profileId",as:"refreshToken",onDelete:"CASCADE"})
RefreshToken.belongsTo(Profile,{foreignKey:"profileId",as:"profile"})
// doctor relations
Doctor.hasMany(AvailableTime,{foreignKey:"doctorId",as:'days'})
AvailableTime.belongsTo(Doctor,{foreignKey:"doctorId",as:"doctor"})
AvailableTime.hasMany(TimeSlot,{foreignKey:"dayId",as:'times'})
TimeSlot.belongsTo(AvailableTime,{foreignKey:"dayId",as:"day"})
// appointment
Doctor.hasMany(Appointment,{foreignKey:"doctorId",as:"appointment"})
Appointment.belongsTo(Doctor,{foreignKey:"doctorId",as:"doctor"})
Patient.hasMany(Appointment,{foreignKey:"patientId",as:"appointment"})
Appointment.belongsTo(Patient,{foreignKey:"patientId",as:"patient"})
TimeSlot.hasOne(Appointment,{foreignKey:"timeId",as:"time"})
Appointment.belongsTo(TimeSlot,{foreignKey:"timeId",as:"time"})
// medical-system
MedicalSystem.hasOne(MedicalSystem,{foreignKey:"parentId"})
MedicalSystem.belongsTo(MedicalSystem,{foreignKey:"parentId"})