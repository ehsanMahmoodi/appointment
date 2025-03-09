"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("patient", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      profileId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("patient");
  },
};
