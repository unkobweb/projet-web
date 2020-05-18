const Sequelize = require("sequelize");
const db = require("../config/database");

const Order = db.define(
  "order",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.STRING,
    },
    date_of_sale: {
      type: Sequelize.DATE,
    },
    state: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Order;
