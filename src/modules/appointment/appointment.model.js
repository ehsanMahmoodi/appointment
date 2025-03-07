const { sequelize } = require("../../configs/sequelize.config");
const { DataTypes } = require("sequelize");
const {
  AppointmentStatus,
} = require("../../common/constant/appointment.constant");
const Appointment = sequelize.define(
  "appointment",
  {
    status: {
      type: DataTypes.ENUM(...Object.values(AppointmentStatus)),
      defaultValue: AppointmentStatus.Pending,
    },
    doctorId: { type: DataTypes.INTEGER, allowNull: false },
    patientId: { type: DataTypes.INTEGER, allowNull: false },
    timeId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { freezeTableName: true },
);
module.exports = { Appointment };
