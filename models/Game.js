"use strict";
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    "Game",
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      slug: DataTypes.STRING,
      price: DataTypes.FLOAT,
      discount: DataTypes.INTEGER,
      plateform_id: DataTypes.INTEGER,
      tweetedDiscount: DataTypes.BOOLEAN,
      tweetedLate: DataTypes.BOOLEAN,
    },
    {}
  );
  Game.associate = function (models) {
    // associations can be defined here
    Game.hasMany(models.Cart, { foreignKey: "gameId" });
    Game.hasMany(models.Mark, { foreignKey: "gameId" });
    Game.hasMany(models.Product, { foreignKey: "gameId" });
    Game.belongsTo(models.Plateform, { foreignKey: "plateform_id" });
    Game.hasMany(models.CdKey, { foreignKey: "gameId" });
  };
  return Game;
};
