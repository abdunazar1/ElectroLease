const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Contract = require("./contracts.model");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    contract_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "contracts",
        key: "contract_id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.ENUM("cash", "card", "transfer"),
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    receipt_number: {
      type: DataTypes.STRING(50),
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

Payment.belongsTo(Contract);
Contract.hasMany(Payment);

module.exports = Payment;
