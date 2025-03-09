"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("medical_system", [
      { title: "دندانپزشک", description: "" },
      { title: "مامایی", description: "" },
      { title: "چشم پزشک", description: "" },
      { title: "جراح مغز و اعصاب", description: "" },
      { title: "مغز و اعصاب (نورولوژی)", description: "" },
      { title: "روانپزشک (اعصاب و روان)", description: "" },
      { title: "روانشناس", description: "" },
      { title: "قلب و عروق", description: "" },
      { title: "پوست، مو و زیبایی", description: "" },
      { title: "داخلی", description: "" },
      { title: "بیهوشی", description: "" },
      { title: "ارتوپدی", description: "" },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("medical_system", null, {});
  },
};
