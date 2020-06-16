const User = require("../models/").User;

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

module.exports = { index, checkout, succeed };
