const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = require("./category.model");
const Owner = require("./Owners.model");


const Product = sequelize.define(
  "Product",
  {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    rental_price_per_day: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deposit_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    purchase_date: {
      type: DataTypes.DATEONLY,
    },
    purchase_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    serial_number: {
      type: DataTypes.STRING(100),
    },
    image_url: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: "available",
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);


Product.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Product, { foreignKey: "category_id" });

Product.belongsTo(Owner, { foreignKey: "owner_id" });
Owner.hasMany(Product, { foreignKey: "owner_id" });
module.exports = Product;
