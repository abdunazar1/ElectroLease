const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Contract = require("./contracts.model");

const Damage = sequelize.define(
  "damage",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    contract_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    damage_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    repair_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    repair_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photos_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "damages",
    timestamps: true,
    underscored: true,
  }
);

Damage.belongsTo(Contract);
Contract.hasMany(Damage);


module.exports = Damage;
