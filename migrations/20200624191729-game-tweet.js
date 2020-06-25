"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn("Games", "tweetedDiscount", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      });
      await queryInterface.addColumn("Games", "tweetedLate", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn(
        "Games",
        "tweetedDiscount",
        Sequelize.BOOLEAN
      );
      await queryInterface.removeColumn(
        "Games",
        "tweetedLate",
        Sequelize.BOOLEAN
      );
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
