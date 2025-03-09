"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("otp", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      code: { type: DataTypes.INTEGER, defaultValue: 0 },
      expiresIn: { type: DataTypes.DATE, defaultValue: null },
      profileId: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("otp");
  },
};
