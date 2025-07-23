"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate({ User, Flight, Seat, Payment }) {
      Booking.belongsTo(User, {
        foreignKey: "user_id",
        onDelete: "SET NULL",
      });
      Booking.belongsTo(Flight, {
        foreignKey: "flight_id",
        onDelete: "CASCADE",
      });
      Booking.belongsTo(Seat, {
        foreignKey: "seat_id",
        onDelete: "SET NULL",
      });
      Booking.hasOne(Payment, {
        foreignKey: "booking_id",
      });
    }
  }
  Booking.init(
    {
      booking_references: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      flight_id: DataTypes.INTEGER,
      seat_id: DataTypes.INTEGER,
      passenger_first_name: DataTypes.STRING,
      passenger_last_name: DataTypes.STRING,
      passenger_passport: DataTypes.STRING,
      class: DataTypes.STRING,
      price: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
