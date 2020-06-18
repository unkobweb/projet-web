"use strict";
module.exports = (sequelize, DataTypes) => {
  const Plateform = sequelize.define(
    "Plateform",
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {}
  );
  Plateform.associate = function (models) {
    // associations can be defined here
    Plateform.hasMany(models.Game, { foreignKey: "plateform_id" });
  };
  return Plateform;
};
