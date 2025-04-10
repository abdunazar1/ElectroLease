const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Client = require("./clients.model");
const Product = require("./Product.model");

const Wishlist = sequelize.define(
  "Wishlist",
  {
    wishlist_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "clients",
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "product_id",
      },
    },
    added_date: {
      type: DataTypes.DATE,
      allowNull: false,
      // defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "wishlists",
    timestamps: true,
  }
);

Wishlist.belongsTo(Product);
Product.hasMany(Wishlist);


Wishlist.belongsTo(Client);
Client.hasMany(Wishlist);


module.exports = Wishlist;
