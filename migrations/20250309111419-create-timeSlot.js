"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("time_slot", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      start: { type: DataTypes.STRING, allowNull: false },
      end: { type: DataTypes.STRING, allowNull: true },
      isBooking: { type: DataTypes.BOOLEAN, allowNull: true },
      dayId: { type: DataTypes.INTEGER, allowNull: false },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("time_slot");
  },
};
