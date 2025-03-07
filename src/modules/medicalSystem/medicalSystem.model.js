const { sequelize } = require("../../configs/sequelize.config");
const { DataTypes } = require("sequelize");
const MedicalSystem = sequelize.define(
  "medical_system",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    parentId: { type: DataTypes.INTEGER, allowNull: true },
  },
  { freezeTableName: true, timestamps: false },
);
module.exports = { MedicalSystem };
