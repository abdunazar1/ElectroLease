const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Contract = require("./contracts.model");
const Product = require("./Product.model");

const ContractItem = sequelize.define(
  "contract_item",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    contract_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

ContractItem.belongsTo(Contract, { foreignKey: "contract_id" });
Contract.hasMany(ContractItem, { foreignKey: "contract_id" });

ContractItem.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(ContractItem, { foreignKey: "product_id" });

module.exports = ContractItem;
