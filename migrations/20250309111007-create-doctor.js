"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("doctor", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      officeAddress: { type: DataTypes.STRING, defaultValue: null },
      hospitalAddress: { type: DataTypes.STRING, defaultValue: null },
      medicalSystemCode: { type: DataTypes.INTEGER, defaultValue: null },
      visitDuration: { type: DataTypes.INTEGER, defaultValue: 15 },
      description: { type: DataTypes.TEXT, defaultValue: null },
      medicalSpecialtyId: { type: DataTypes.INTEGER, defaultValue: null },
      profileId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("doctor");
  },
};
