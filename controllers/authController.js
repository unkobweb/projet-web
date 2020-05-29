const User = require("../models/User");

function register(req, res) {
  let request = req.body;
  if (request.password == request.confirmPassword) {
    auth
      .createUserWithEmailAndPassword(request.mail, request.password)
      .then(async () => {
        console.log(`Utilisateur ${request.username} créé !`);
        await User.create({
          username: request.username,
          email: request.mail,
        });
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  } else {
    console.log("Pas les mêmes mots de passe");
    res.sendStatus(500);
  }
}

function login(req, res){
  
}

function indexLogin(req, res) {
  
}

function indexRegister(req, res) {
  res.render("../views/register.ejs");
}

module.exports = { register, indexRegister, login, indexLogin };
