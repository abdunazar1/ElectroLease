const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// const Product = require("./Product.model");

const Category = sequelize.define(
  "Category",
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
    tableName: "categories",
    timestamps: true,
    underscored: true,
  }
);

// Category.hasMany(Product, {
//   foreignKey: "category_id",
//   as: "products",
// });



module.exports = Category;
