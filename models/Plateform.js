const Sequelize = require("sequelize");
const db = require("../config/database");

const Plateform = db.define(
  "plateform",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Plateform;
