"use strict";
module.exports = (sequelize, DataTypes) => {
  const Mark = sequelize.define(
    "Mark",
    {
      userId: DataTypes.STRING,
      gameId: DataTypes.INTEGER,
      mark: DataTypes.INTEGER,
      review: DataTypes.TEXT,
    },
    {}
  );
  Mark.associate = function (models) {
    // associations can be defined here
    Mark.belongsTo(models.User, { foreignKey: "userId" });
    Mark.belongsTo(models.Game, { foreignKey: "gameId" });
  };
  return Mark;
};
