const User = require("../models/User");
const Game = require("../models/Game");
const CdKey = require("../models/CdKey");
const Mark = require("../models/Mark");
const Order = require("../models/Order");
const Plateform = require("../models/Plateform");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

function index(req, res) {
  //Plateform.hasMany(Game, { as: "Jeux", foreignKey: "plateform_id" });
  Game.belongsTo(Plateform, { as: "Plateform", foreignKey: "plateform_id" });

  Game.findAll({
    include: [{ model: Plateform, as: "Plateform" }],
  })
    .then((users) => res.send(JSON.stringify(users, null, 4)))
    .catch((err) => console.log(err));
}

module.exports = { index };
