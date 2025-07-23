'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Seats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      aircraft_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Aircraft",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      seat_number: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      class: {
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
    await queryInterface.dropTable('Seats');
  }
};