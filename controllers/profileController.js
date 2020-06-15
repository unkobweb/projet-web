const User = require("../models/").User;

function index(req, res) {
  res.render("profile.ejs", {
    session: req.session.user,
    nbPage: 6,
  });
}

module.exports = { index };
