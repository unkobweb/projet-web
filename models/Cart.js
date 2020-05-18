const Sequelize = require("sequelize");
const db = require("../config/database");

const Cart = db.define(
  "cart",
  {
    user_id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    game_id: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Cart;
