const session = require("express-session");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const User = require("../models/").User;
const Cart = require("../models/").Cart;
const Game = require("../models/").Game;
const Order = require("../models/").Order;
const Product = require("../models/").Product;
const CdKey = require("../models/").CdKey;
const Plateform = require("../models/").Plateform;

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
    total = total.toFixed(2).toString().split(".").join("");
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
  let oldCarts = await Cart.findAll({
    include: [{ model: Game, include: [Plateform] }],
    where: { userId: req.session.user.id },
  });
  let newOrder = await Order.create({
    userId: req.session.user.id,
  });
  let date = new Date();
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("./invoices/facture" + newOrder.id + ".pdf"));
  doc.image("./public/alex/img/logo/togames-together.png", 15, 15, {
    width: 100,
  });
  doc.font("Helvetica-Bold").fontSize(25).text("FACTURE", {
    height: 100,
    align: "center",
  });
  doc
    .fontSize(15)
    .text(
      `Facture n° ${newOrder.id}\n${req.session.user.username}\n${
        date.getDate() +
        "/" +
        (parseInt(date.getMonth()) + 1 > 9
          ? parseInt(date.getMonth()) + 1
          : "0" + (parseInt(date.getMonth()) + 1)) +
        "/" +
        date.getFullYear()
      }`,
      20,
      130
    );
  doc.text("Jeu", 20, 200);
  doc.text("Plateforme", 150, 200);
  doc.text("Clé", 260, 200);
  doc.text("Prix", 500, 200);
  doc.font("Helvetica").fontSize(12);
  let compteur = 0;
  for (let i = 0; i < oldCarts.length; i++) {
    let old = oldCarts[i];
    console.log(old);
    for (let i = 0; i < old.quantity; i++) {
      doc
        .moveTo(600, 220 + 20 * compteur)
        .lineTo(10, 220 + 20 * compteur)
        .stroke(); //moveTo = point final et lineTo d'où ça part

      let newCdKey = await CdKey.findOne({ where: { gameId: old.gameId } });
      doc.text(`${old.Game.title}`, 20, 220 + 20 * compteur + 10);
      doc.text(`${old.Game.Plateform.name}`, 150, 220 + 20 * compteur + 10);
      doc.text(`${newCdKey.cd_key}`, 260, 220 + 20 * compteur + 10);
      console.log(
        `Prix ${(
          old.Game.price -
          old.Game.price * (old.Game.discount / 100)
        ).toFixed(2)} €`
      );
      doc.text(
        `${(
          old.Game.price -
          old.Game.price * (old.Game.discount / 100)
        ).toFixed(2)}€`,
        500,
        220 * compteur + 10
      );
      newCdKey.is_used = true;
      await newCdKey.save();
      compteur++;
      await newOrder.createProduct({
        gameId: old.gameId,
        keyId: newCdKey.id,
        price: old.Game.price,
        discount: old.Game.discount,
      });
    }
    await old.destroy();
    if (i == oldCarts.length - 1) {
      let newUser = await User.findOne({
        where: { id: req.session.user.id },
        include: [
          { model: Cart, include: [{ model: Game, include: [Plateform] }] },
        ],
      });
      doc.end();
      app.mailer.send(
        "mail",
        {
          to: req.session.user.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
          subject: "Votre commande", // REQUIRED.
          otherProperty: { session: req.session.user, oldCarts: oldCarts },
          attachments: [
            {
              fileName: "facture" + newOrder.id + ".pdf",
              filePath: "./invoices/facture" + newOrder.id + ".pdf",
            },
          ],
        },
        function (err) {
          if (err) {
            // handle error
            console.log(err);
            return;
          }
        }
      );
      req.session.user = newUser;
      res.sendStatus(200);
    }
  }
}

async function purchaseIndex(req, res) {
  if (req.session.user != undefined) {
    let purchases = await Order.findAll({
      where: { userId: req.session.user.id },
      include: [{ model: Product, include: [CdKey, Game] }],
    });
    res.render("purchases.ejs", {
      session: req.session.user,
      nbPage: 5,
      purchases: purchases,
    });
  } else {
    res.redirect("/");
  }
}

module.exports = { index, checkout, succeed, purchaseIndex };
