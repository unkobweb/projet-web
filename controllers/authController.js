const User = require("../models/").User;
const Cart = require("../models").Cart;
const Game = require("../models").Game;
const Plateform = require("../models").Plateform;

async function register(req, res) {
  let request = req.body;
  let error = false;
  await auth
    .createUserWithEmailAndPassword(request.mail, request.password)
    .then(async () => {
      let newUser = await User.create({
        id: auth.currentUser.uid,
        username: request.username,
        email: request.mail,
        date_of_birth: request.date,
      });
      req.session.user = newUser.dataValues;
      req.session.user.Carts = [];
    })
    .catch((err) => {
      console.log(err);
      error = "Une erreur est survenue !";
      switch (err.code) {
        case "auth/weak-password":
          error = "Mot de passe faibles (6 caractères minimum)";
          break;
        case "auth/email-already-in-use":
          error = "Cette adresse mail est déjà lié à un compte";
          break;
      }
    });
  res.send({
    err: error,
  });
}

async function login(req, res) {
  if (req.session.user != undefined) {
    res.redirect("/");
  }
  let request = req.body;
  let error = false;
  await auth
    .signInWithEmailAndPassword(request.mail, request.password)
    .then(async () => {
      let user = await User.findOne({
        where: { id: auth.currentUser.uid },
        include: [
          { model: Cart, include: [{ model: Game, include: [Plateform] }] },
        ],
      });
      req.session.user = user;
    })
    .catch((err) => {
      console.log(err);
      error = "Une erreur est survenue !";
      switch (err.code) {
        case "auth/wrong-password":
          error = "Mauvaise combinaison Adresse mail / Mot de passe !";
          break;
        case "auth/invalid-email":
          error = "Cette adresse mail n'est attribuée à aucun compte";
          break;
      }
    });
  res.send({
    err: error,
  });
}

async function externalConnexion(req, res) {
  let currentUser = await User.findOne({
    where: { id: req.body.id },
    include: [
      { model: Cart, include: [{ model: Game, include: [Plateform] }] },
    ],
  });
  if (currentUser == null) {
    let newUser = await User.create({
      id: req.body.id,
      username: req.body.name,
      email: req.body.mail,
    });
    req.session.user = newUser.dataValues;
    req.session.user.Carts = [];
  } else {
    req.session.user = currentUser;
  }
  res.send(200);
}

function indexLogin(req, res) {
  if (req.session.user != undefined) {
    res.redirect("/");
  }
  res.render("login.ejs");
}

function indexRegister(req, res) {
  if (req.session.user != undefined) {
    res.redirect("/");
  }
  res.render("register.ejs");
}

function disconnect(req, res) {
  req.session.user = undefined;
  res.redirect("/login");
}

module.exports = {
  register,
  indexRegister,
  externalConnexion,
  login,
  indexLogin,
  disconnect,
};
