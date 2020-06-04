const User = require("../models/User");

async function register(req, res) {
  let request = req.body;
  let error = false;
  await auth
    .createUserWithEmailAndPassword(request.mail, request.password)
    .then(async () => {
      console.log(auth.currentUser.uid);
      let newUser = await User.build({
        id: auth.currentUser.uid,
        username: request.username,
        email: request.mail,
      });
      await newUser.save();
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
  let request = req.body;
  let error = false;
  console.log("oui");
  await auth
    .signInWithEmailAndPassword(request.mail, request.password)
    .then(async () => {
      console.log(auth.currentUser.uid);
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
  let currentUser = await User.findOne({ where: { id: req.body.id } });
  if (currentUser == null) {
    let newUser = await User.build({
      id: req.body.id,
      username: req.body.name,
      email: req.body.mail,
    });
    await newUser.save();
  }
  res.send(200);
}

function indexLogin(req, res) {
  res.render("../views/login.ejs");
}

function indexRegister(req, res) {
  res.render("../views/register.ejs");
}

module.exports = {
  register,
  indexRegister,
  externalConnexion,
  login,
  indexLogin,
};
