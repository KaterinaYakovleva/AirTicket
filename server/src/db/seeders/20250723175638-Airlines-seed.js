"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Airlines",
      [
        {
          id: 1,
          name: "Aeroflot",
          country: "Russia",
          logo_url: "https://logo.clearbit.com/aeroflot.ru",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Emirates",
          country: "UAE",
          logo_url: "https://logo.clearbit.com/emirates.com",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Airlines", null, {});
  },
};
