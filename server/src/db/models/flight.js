"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    static associate({ Airline, Aircraft, Airport, Booking }) {
      Flight.belongsTo(Airline, {
        foreignKey: "airline_id",
      });
      Flight.belongsTo(Aircraft, {
        foreignKey: "aircraft_id",
        onDelete: "RESTRICT",
      });
      Flight.belongsTo(Airport, {
        foreignKey: "departure_airport_id",
        onDelete: "RESTRICT",
      });
      Flight.belongsTo(Airport, {
        foreignKey: "arrival_airport_id",
        onDelete: "RESTRICT",
      });
      Flight.hasMany(Booking, {
        foreignKey: "flight_id",
      });
    }
  }
  Flight.init(
    {
      flight_number: DataTypes.INTEGER,
      airline_id: DataTypes.INTEGER,
      aircraft_id: DataTypes.INTEGER,
      departure_airport_id: DataTypes.INTEGER,
      arrival_airport_id: DataTypes.INTEGER,
      departure_time: DataTypes.TIME,
      arrival_time: DataTypes.TIME,
      duration: DataTypes.INTEGER,
      economy_price: DataTypes.INTEGER,
      business_price: DataTypes.INTEGER,
      available_seats: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Flight",
    }
  );
  return Flight;
};
