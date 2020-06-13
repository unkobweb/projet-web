"use strict";
module.exports = (sequelize, DataTypes) => {
  const cdKey = sequelize.define(
    "cdKey",
    {
      gameId: DataTypes.INTEGER,
      cd_key: DataTypes.STRING,
      is_used: DataTypes.BOOLEAN,
    },
    {}
  );
  cdKey.associate = function (models) {
    // associations can be defined here
    cdKey.belongsTo(models.Product);
  };
  return cdKey;
};
