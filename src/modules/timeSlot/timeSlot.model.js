const { sequelize } = require("../../configs/sequelize.config");
const { DataTypes } = require("sequelize");
const TimeSlot = sequelize.define(
  "time_slot",
  {
    start: { type: DataTypes.STRING, allowNull: false },
    end: { type: DataTypes.STRING, allowNull: true },
    isBooking: { type: DataTypes.BOOLEAN, allowNull: true },
    dayId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    freezeTableName: true,
    createdAt: false,
  },
);
module.exports = { TimeSlot };
