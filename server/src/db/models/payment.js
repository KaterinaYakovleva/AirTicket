"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate({ Booking, User }) {
      Payment.belongsTo(Booking, {
        foreignKey: "booking_id",
        onDelete: "CASCADE",
      });
      Payment.belongsTo(User, {
        foreignKey: "user_id",
        onDelete: "SET NULL",
      });
    }
  }
  Payment.init(
    {
      booking_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      payment_method: DataTypes.STRING,
      transaction_id: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
