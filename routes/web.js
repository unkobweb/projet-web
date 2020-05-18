const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/User");
const Game = require("../models/Game");

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

module.exports = router;
