const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Client = require("./clients.model");
const Owner = require("./Owners.model");
const Status = require("./status.model");

const Contract = sequelize.define(
  "contract",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deposit_paid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    return_condition_note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    actual_return_date: {
      type: DataTypes.DATE,
      
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);


Contract.belongsTo(Client, { foreignKey: "client_id" });
Client.hasMany(Contract, { foreignKey: "client_id" });

Contract.belongsTo(Owner, { foreignKey: "owner_id" });
Owner.hasMany(Contract, { foreignKey: "owner_id" });

Contract.belongsTo(Status, { foreignKey: "status_id" });
Status.hasMany(Contract, { foreignKey: "status_id" });

module.exports = Contract;
