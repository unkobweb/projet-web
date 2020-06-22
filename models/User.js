"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      date_of_birth: DataTypes.DATEONLY,
      role: DataTypes.INTEGER,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Cart, { foreignKey: "userId" });
    User.hasMany(models.Mark, { foreignKey: "userId" });
  };
  return User;
};
