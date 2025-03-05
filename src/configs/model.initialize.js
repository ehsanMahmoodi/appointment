const { Profile, Otp, Doctor, Patient,RefreshToken} = require("../modules/user/user.model");

// user relations
Profile.hasOne(Otp, {foreignKey: "profileId",as: "otp",onDelete: "CASCADE"});
Otp.belongsTo(Profile, { foreignKey: "profileId", as: "profile"});
Profile.hasOne(Doctor,{foreignKey:"profileId",as:"doctor",onDelete:"CASCADE"})
Doctor.belongsTo(Profile,{foreignKey:"profileId",as:"profile"})
Profile.hasOne(Patient,{foreignKey:"profileId",as:"patient",onDelete:"CASCADE"})
Patient.belongsTo(Profile,{foreignKey:"profileId",as:"profile"})
Profile.hasOne(RefreshToken,{foreignKey:"profileId",as:"refreshToken",onDelete:"CASCADE"})
RefreshToken.belongsTo(Profile,{foreignKey:"profileId",as:"profile"})