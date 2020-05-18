const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/User");
const Game = require("../models/Game");
const CdKey = require("../models/CdKey");
const Cart = require("../models/Cart");

router.get("/users", (req, res) => {
  User.findAll()
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});
router.get("/games", (req, res) => {
  Game.findAll()
    .then((games) => res.send(games))
    .catch((err) => console.log(err));
});
router.get("/cdkeys", (req, res) => {
  CdKey.findAll()
    .then((cdkeys) => res.send(cdkeys))
    .catch((err) => console.log(err));
});
router.get("/carts", (req, res) => {
  Cart.findAll()
    .then((carts) => res.send(carts))
    .catch((err) => console.log(err));
});

module.exports = router;
