"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "Bookings",
      [
        {
          user_id: 1,
          flight_id: 1,
          passenger_first_name: "Ivan",
          passenger_last_name: "Petrov",
          passenger_passport: "1234567890",
          class: "economy",
          price: 15000,
          status: "confirmed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookings", null, {});
  },
};
