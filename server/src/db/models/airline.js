"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airline extends Model {
    static associate({ Aircraft, Flight }) {
      Airline.hasMany(Aircraft, {
        foreignKey: "airline_id",
      });
      Airline.hasMany(Flight, {
        foreignKey: "airline_id",
      });
    }
  }
  Airline.init(
    {
      name: DataTypes.STRING,
      country: DataTypes.STRING,
      logo_url: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Airline",
    }
  );
  return Airline;
};
