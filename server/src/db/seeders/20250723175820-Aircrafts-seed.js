'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert(
      "Aircraft",
      [
        {
          airline_id: 1,
          model: "Boeing 737-800",
          seats_capacity: 189,
          seats_economy: 150,
          seats_business: 39,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 2,
          model: "Airbus A380",
          seats_capacity: 517,
          seats_economy: 399,
          seats_business: 118,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Aircrafts", null, {});
  }
};
