"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("available_time", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      doctorId: { type: DataTypes.INTEGER, allowNull: false },
      day: { type: DataTypes.DATEONLY, allowNull: false },
      patientCapacity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("available_time");
  },
};
