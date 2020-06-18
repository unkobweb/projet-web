const User = require("../models/").User;
const Cart = require("../models/").Cart;
const Game = require("../models/").Game;

const stripe = require("stripe")(
  "sk_test_51GukP3KkoFC8y2MeU06o6UMEHXUGNVOtlig0hsIEaodq7S75Uv7D9OF1Ghs6QHjXHOiqorh34qMpwRZwlFn3OBEs00Vxtzhy8A",
  { apiVersion: "" }
);

function index(req, res) {
  res.render("profile.ejs", {
    session: req.session.user,
    nbPage: 6,
  });
}

async function checkout(req, res) {
  if (req.session.user != undefined && req.session.user.Carts.length > 0) {
    let total = 0;
    req.session.user.Carts.forEach((jeu) => {
      total += parseFloat(
        (jeu.Game.price - jeu.Game.price * (jeu.Game.discount / 100)).toFixed(
          2
        ) * jeu.quantity
      );
    });
    console.log(total);
    total = total.toString().split(".").join("");
    console.log(total);
    let paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "eur",
      metadata: { integration_check: "accept_a_payment" },
    });
    res.render("checkout.ejs", {
      session: req.session.user,
      nbPage: 0,
      paymentIntent: paymentIntent,
    });
  } else {
    res.redirect("/cart");
  }
}

async function succeed(req, res) {
  let oldCarts = await Cart.findAll({ where: { userId: req.session.user.id } });
  oldCarts.forEach((old) => {
    old.destroy();
  });
  let newUser = await User.findOne({
    where: { id: req.session.user.id },
    include: [{ model: Cart, include: [Game] }],
  });
  req.session.user = newUser;
  res.sendStatus(200);
}

module.exports = { index, checkout, succeed };
