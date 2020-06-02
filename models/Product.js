const Sequelize = require("sequelize");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    order_id: {
      type: Sequelize.INTEGER,
    },
    game_id: {
      type: Sequelize.INTEGER,
    },
    key_id: {
      type: Sequelize.INTEGER,
    },
    price: {
      type: Sequelize.FLOAT,
    },
    discount: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Product;