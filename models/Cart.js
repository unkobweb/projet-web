"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      userId: DataTypes.STRING,
      gameId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {}
  );
  Cart.associate = function (models) {
    // associations can be defined here
    Cart.belongsTo(models.Game, { foreignKey: "gameId" });
    Cart.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Cart;
};
