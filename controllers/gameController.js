const User = require("../models/User");
const Game = require("../models/Game");
const CdKey = require("../models/CdKey");
const Mark = require("../models/Mark");
const Order = require("../models/Order");
const Plateform = require("../models/Plateform");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

Game.belongsTo(Plateform, { as: "Plateform", foreignKey: "plateform_id" });
Game.hasMany(Mark, { as: "avis", foreignKey: "game_id" });
Mark.belongsTo(User, { as: "author", foreignKey: "user_id" });

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
    session: req.session.user,
  });
}

async function show(req, res) {
  let game = await Game.findOne({
    include: [
      { model: Plateform, as: "Plateform" },
      { model: Mark, as: "avis", include: [{ model: User, as: "author" }] },
    ],
    where: { id: req.params.id },
  });
  console.log(JSON.stringify(game, null, 4));
  res.render("game.ejs", { game: game });
}

module.exports = { index, show };
