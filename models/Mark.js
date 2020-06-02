const Sequelize = require("sequelize");

const Mark = sequelize.define(
  "mark",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.STRING,
    },
    game_id: {
      type: Sequelize.INTEGER,
    },
    mark: {
      type: Sequelize.INTEGER,
    },
    review: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Mark;