"use strict";
module.exports = (sequelize, DataTypes) => {
  const CdKey = sequelize.define(
    "CdKey",
    {
      gameId: DataTypes.INTEGER,
      cd_key: DataTypes.STRING,
      is_used: DataTypes.BOOLEAN,
    },
    {}
  );
  CdKey.associate = function (models) {
    // associations can be defined here
    CdKey.hasOne(models.Product, { foreignKey: "keyId" });
    CdKey.belongsTo(models.Game, { foreignKey: "gameId" });
  };
  return CdKey;
};
