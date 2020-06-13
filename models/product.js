"use strict";

const cdkey = require("./cdkey");

module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "product",
    {
      orderId: DataTypes.INTEGER,
      gameId: DataTypes.INTEGER,
      keyId: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      discount: DataTypes.INTEGER,
    },
    {}
  );
  product.associate = function (models) {
    // associations can be defined here
    product.belongsTo(models.Cdkey, { foreignKey: "keyId" });
    product.belongsTo(models.Game, { foreignKey: "gameId" });
  };
  return product;
};
