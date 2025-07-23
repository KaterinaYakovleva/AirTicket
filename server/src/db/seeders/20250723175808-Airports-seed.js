'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert(
      "Airports",
      [
        {
          id: 1,
          name: "Sheremetyevo",
          city: "Moscow",
          country: "Russia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Dubai International",
          city: "Dubai",
          country: "UAE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Airports", null, {});
  }
};
