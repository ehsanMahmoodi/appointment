"use strict";
const { DataTypes } = require("sequelize");
const { AppointmentStatus } = require("../src/common/constant/appointment.constant");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("appointment", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(AppointmentStatus)),
        defaultValue: AppointmentStatus.Pending,
      },
      doctorId: { type: DataTypes.INTEGER, allowNull: false },
      patientId: { type: DataTypes.INTEGER, allowNull: false },
      timeId: { type: DataTypes.INTEGER, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("appointment");
  },
};
