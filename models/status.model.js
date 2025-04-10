const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Status = sequelize.define(
  "status",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);



module.exports = Status;
