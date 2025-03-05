const { DataTypes } = require("sequelize");
const { sequelize } = require("../../configs/sequelize.config");
const { Roles } = require("../../common/constant/role.constant");

const Otp = sequelize.define(
  "otp",
  {
    code: { type: DataTypes.INTEGER, defaultValue: 0 },
    expiresIn: { type: DataTypes.DATE, defaultValue: null },
    profileId: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  },
  { timestamps: false, freezeTableName: true },
);

const Profile = sequelize.define(
  "profile",
  {
    firstName: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    verifyPhone: { type: DataTypes.BOOLEAN, defaultValue: false },
    birthDate: { type: DataTypes.DATEONLY, allowNull: true },
    nationalCode: { type: DataTypes.STRING, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
    role: { type: DataTypes.ENUM(...Object.values(Roles)), defaultValue: null },
  },
  { createdAt: false, freezeTableName: true },
);
const Patient = sequelize.define(
  "patient",
  {
    profileId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  },
  { timestamps: false, freezeTableName: true },
);
const Doctor = sequelize.define(
  "doctor",
  {
    officeAddress: { type: DataTypes.STRING, defaultValue: null },
    hospitalAddress: { type: DataTypes.STRING, defaultValue: null },
    medicalSystemCode: { type: DataTypes.INTEGER, defaultValue: null },
    visitDuration: { type: DataTypes.INTEGER, defaultValue: 15 },
    description: { type: DataTypes.TEXT, defaultValue: null },
    medicalSpecialtyId: { type: DataTypes.INTEGER, defaultValue: null },
    profileId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  },
  { timestamps: false, freezeTableName: true },
);
const RefreshToken = sequelize.define(
  "refresh_token",
  {
    token: { type: DataTypes.TEXT, allowNull: false },

    profileId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    freezeTableName: true,
    updatedAt: false,
  },
);
module.exports = { Patient, Profile, Doctor, Otp, RefreshToken };
