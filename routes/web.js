const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/User");
const Game = require("../models/Game");
const CdKey = require("../models/CdKey");
const Mark = require("../models/Mark");
const Order = require("../models/Order");
const Plateform = require("../models/Plateform");

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
router.get("/marks", (req, res) => {
  Mark.findAll()
    .then((marks) => res.send(marks))
    .catch((err) => console.log(err));
});
router.get("/orders", (req, res) => {
  Order.findAll()
    .then((orders) => res.send(orders))
    .catch((err) => console.log(err));
});
router.get("/plateforms", (req, res) => {
  Plateform.findAll()
    .then((orders) => res.send(orders))
    .catch((err) => console.log(err));
});

module.exports = router;
