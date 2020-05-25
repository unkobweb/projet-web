const Sequelize = require("sequelize");
module.exports = new Sequelize(
  "kobweb_projet_web",
  "kobweb_node",
  "simonandalex44200",
  {
    host: "postgresql-kobweb.alwaysdata.net",
    dialect: "postgres",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
global.sequelize = sequelize;
