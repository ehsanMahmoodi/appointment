const { Profile, Otp } = require("../modules/user/user.model");

// user relations
Profile.hasOne(Otp, {foreignKey: "profileId",as: "otp",onDelete: "CASCADE"});
Otp.belongsTo(Profile, { foreignKey: "profileId", as: "profile",unique:true ,});
