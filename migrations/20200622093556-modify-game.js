"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Games", "quantity");
  },

  down: (queryInterface, Sequelize) => {},
};
