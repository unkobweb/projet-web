const User = require("../models").User;
const Game = require("../models").Game;
const Mark = require("../models").Mark;
const Plateform = require("../models").Plateform;
const Cart = require("../models").Cart;
const CdKey = require("../models").CdKey;

async function index(req, res) {
  //Plateform.hasMany(Game, { as: "Jeux", foreignKey: "plateform_id" });

  let gamesDiscount = await Game.findAll({
    raw: true,
    nest: true,
    include: [{ model: Plateform, as: "Plateform" }],
    order: [
      ["discount", "DESC"],
      ["id", "DESC"],
    ],
    limit: 6,
    offset: 0,
  });
  let gamesDate = await Game.findAll({
    raw: true,
    nest: true,
    include: [{ model: Plateform, as: "Plateform" }],
    order: [["id", "DESC"]],
    limit: 6,
    offset: 0,
  });
  res.render("index.ejs", {
    gamesDiscount: gamesDiscount,
    gamesDate: gamesDate,
    session: req.session.user,
    nbPage: 1,
  });
}

async function show(req, res) {
  let game = await Game.findOne({
    include: [
      { model: Plateform },
      { model: CdKey, where: { is_used: false } },
      { model: Mark, include: [{ model: User }] },
    ],
    where: { id: req.params.id },
  });
  res.render("game.ejs", {
    game: game,
    session: req.session.user,
    nbPage: 0,
  });
}

async function addToCart(req, res) {
  if (req.session.user != undefined) {
    let game = await Game.findOne({ raw: true, where: { id: req.params.id } });
    let cartExist = await Cart.findOne({
      where: { userId: req.session.user.id, gameId: game.id },
    });
    if (cartExist) {
      await cartExist.increment("quantity", { by: 1 });
    } else {
      await Cart.create({
        userId: req.session.user.id,
        gameId: game.id,
        quantity: 1,
      });
    }
    let userWithNewCart = await User.findOne({
      where: { id: req.session.user.id },
      include: [
        { model: Cart, include: [{ model: Game, include: [Plateform] }] },
      ],
    });
    req.session.user = userWithNewCart.dataValues;
    res.send({ status: "success" });
  } else {
    res.send({ status: "error" });
  }
}

async function removeFromCart(req, res) {
  if (req.session.user) {
    let cart = await Cart.findOne({
      where: {
        id: req.params.id,
        userId: req.session.user.id,
      },
    });
    await cart.destroy();
    let userWithNewCart = await User.findOne({
      where: { id: req.session.user.id },
      include: [
        { model: Cart, include: [{ model: Game, include: [Plateform] }] },
      ],
    });
    req.session.user = userWithNewCart.dataValues;
    res.sendStatus(200);
  } else {
    res.sendStatus(501);
  }
}

function cart(req, res) {
  if (req.session.user) {
    res.render("cart.ejs", {
      session: req.session.user,
      nbPage: 4,
    });
  } else {
    res.redirect("/");
  }
}

module.exports = { index, show, addToCart, removeFromCart, cart };
