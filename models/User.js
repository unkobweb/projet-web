const Sequelize = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    date_of_birth: {
      type: Sequelize.DATEONLY,
    },
    balance: {
      type: Sequelize.FLOAT,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = User;
