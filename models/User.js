const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define(
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
