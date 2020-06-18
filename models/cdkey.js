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
    CdKey.belongsTo(models.Product);
  };
  return CdKey;
};
