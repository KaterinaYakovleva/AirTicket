"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "Flights",
      [
        {
          id: 1,
          flight_number: 555,
          airline_id: 1,
          aircraft_id: 1,
          departure_airport_id: 1,
          arrival_airport_id: 2,
          departure_time: new Date(Date.now() + 86400000), 
          arrival_time: new Date(Date.now() + 86400000 + 5 * 3600000),
          duration: 300,
          economy_price: 15000,
          business_price: 45000,
          available_seats: 189,
          status: "scheduled",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Flights", null, {});
  },
};