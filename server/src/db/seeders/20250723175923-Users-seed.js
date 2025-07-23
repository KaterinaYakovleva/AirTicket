"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [user] = await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          first_name: "Ivan",
          last_name: "Petrov",
          email: "ivan@example.com",
          password: "$2a$10$hashedPassword",
          phone: 79161234567,
          passport_number: "1234567890",
          passport_country: "Russia", 
          is_verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { return: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
