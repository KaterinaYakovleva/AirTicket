"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    static associate({ Flight }) {
      Airport.hasMany(Flight, {
        foreignKey: "departure_airport_id",
      });
      Airport.hasMany(Flight, {
        foreignKey: "arrival_airport_id",
      });
    }
  }
  Airport.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Airport",
    }
  );
  return Airport;
};
