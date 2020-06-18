"use strict";

const cdkey = require("./cdkey");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      orderId: DataTypes.INTEGER,
      gameId: DataTypes.INTEGER,
      keyId: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      discount: DataTypes.INTEGER,
    },
    {}
  );
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.CdKey, { foreignKey: "keyId" });
    Product.belongsTo(models.Game, { foreignKey: "gameId" });
  };
  return Product;
};
