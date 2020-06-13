"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      userId: DataTypes.STRING,
      state: DataTypes.INTEGER,
    },
    {}
  );
  order.associate = function (models) {
    // associations can be defined here
    order.belongsTo(models.User, { foreignKey: "userId" });
    order.hasMany(models.Product, { foreignKey: "orderId" });
  };
  return order;
};
