"use strict";
const { DataTypes } = require("sequelize");
const { Roles } = require("../src/common/constant/role.constant");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("profile", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      firstName: { type: DataTypes.STRING, allowNull: true },
      lastName: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, allowNull: false },
      verifyPhone: { type: DataTypes.BOOLEAN, defaultValue: false },
      birthDate: { type: DataTypes.DATEONLY, allowNull: true },
      nationalCode: { type: DataTypes.STRING, allowNull: true },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
      role: { type: DataTypes.ENUM(...Object.values(Roles)), defaultValue: null },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("profile");
  },
};
