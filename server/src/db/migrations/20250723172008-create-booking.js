'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      booking_references: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      flight_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Flights",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      seat_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Seats",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      passenger_first_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      passenger_last_name: {
        type: Sequelize.STRING,
      },
      passenger_passport: {
        type: Sequelize.STRING,
      },
      class: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      status: {
        defaultValue: "reserved",
        type: Sequelize.STRING,
      },
      createdAt: {
        defaultValue: new Date(),
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        defaultValue: new Date(),
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};