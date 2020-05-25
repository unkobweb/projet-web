const Sequelize = require("sequelize");

const Plateform = sequelize.define(
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
