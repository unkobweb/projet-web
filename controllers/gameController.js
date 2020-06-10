const User = require("../models/User");
const Game = require("../models/Game");
const CdKey = require("../models/CdKey");
const Mark = require("../models/Mark");
const Order = require("../models/Order");
const Plateform = require("../models/Plateform");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

Game.belongsTo(Plateform, { as: "Plateform", foreignKey: "plateform_id" });

async function index(req, res) {
  //Plateform.hasMany(Game, { as: "Jeux", foreignKey: "plateform_id" });

  let games = await Game.findAll({
    raw: true,
    nest: true,
    include: [{ model: Plateform, as: "Plateform" }],
  });

  console.log(games[0]);
  res.render("index.ejs", {
    games: games,
  });
}

async function show(req, res) {
  let game = await Game.findOne({ raw: true, where: { id: req.params.id } });
  console.log(game);
  res.render("game.ejs", { game: game });
}

module.exports = { index, show };
