const Sequelize = require("sequelize");

const CdKey = sequelize.define(
  "cdkey",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    game_id: {
      type: Sequelize.INTEGER,
    },
    cd_key: {
      type: Sequelize.STRING,
    },
    is_used: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = CdKey;
