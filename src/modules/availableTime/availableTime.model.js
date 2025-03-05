const { sequelize } = require("../../configs/sequelize.config");
const { DataTypes } = require("sequelize");
const AvailableTime = sequelize.define(
  "available_time",
  {
    doctorId: { type: DataTypes.INTEGER, allowNull: false },
    day: { type: DataTypes.DATEONLY, allowNull: false },
    patientCapacity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);
module.exports = { AvailableTime };
