// Import modules
const express = require("express");
const session = require("express-session");

const User = require("./models").User;
const Game = require("./models").Game;
const Cart = require("./models").Cart;
const Plateform = require("./models").Plateform;

//Firebase
require("./config/authentication");

const app = express();
app.use(
  session({
    secret: "togametogethersecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(
  express.static(__dirname + "/public/" + (process.env.STYLE || "simon"))
);
app.set("views", "./views/" + (process.env.STYLE || "simon") + "/");
app.use(express.json());

app.use("/", require("./routes/web"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server started on ${PORT}`));

/*
Game.create({
  title: "Cyberpunk 2077",
  description:
    "Cyberpunk 2077 pour PC est un jeu de tir à la première personne, mais avec une différence. Dans un État libre dystopique de Californie, les règles de la nation et de l'Etat ne s'appliquent plus. Au lieu de cela, jouant comme un mercenaire nommé V, le joueur doit travailler sur le chemin qu'il emprunte autour de la ville, atteignant ses buts et se battant contre des ennemis qui apparaissent au fur et à mesure du jeu.",
  slug: "cyberpunk_2077",
  quantity: 20,
  price: 69.99,
  discount: 20,
  plateform_id: 2,
});

User.create({
  id: "abc123",
  username: "kobweb",
  email: "pom@pom.com",
}).then((user) => {
  Cart.create({
  userId: "abc123",
  gameId: 1,
  quantity: 2,
});
});

Game.create({
  title: "Cyberpunk 2077",
  description:
    "Cyberpunk 2077 pour PC est un jeu de tir à la première personne, mais avec une différence. Dans un État libre dystopique de Californie, les règles de la nation et de l'Etat ne s'appliquent plus. Au lieu de cela, jouant comme un mercenaire nommé V, le joueur doit travailler sur le chemin qu'il emprunte autour de la ville, atteignant ses buts et se battant contre des ennemis qui apparaissent au fur et à mesure du jeu.",
  slug: "cyberpunk_2077",
  quantity: 20,
  price: 69.99,
  discount: 20,
  plateform_id: 4,
});
Game.create({
  title: "Cyberpunk 2077",
  description:
    "Cyberpunk 2077 pour PC est un jeu de tir à la première personne, mais avec une différence. Dans un État libre dystopique de Californie, les règles de la nation et de l'Etat ne s'appliquent plus. Au lieu de cela, jouant comme un mercenaire nommé V, le joueur doit travailler sur le chemin qu'il emprunte autour de la ville, atteignant ses buts et se battant contre des ennemis qui apparaissent au fur et à mesure du jeu.",
  slug: "cyberpunk_2077",
  quantity: 20,
  price: 69.99,
  discount: 20,
  plateform_id: 1,
});
Plateform.create({
  name: "Steam",
  slug: "steam",
});
Plateform.create({
  name: "Playstation 4",
  slug: "playstation_4",
});
Plateform.create({
  name: "Switch",
  slug: "switch",
});
Plateform.create({
  name: "Xbox One",
  slug: "xbox_one",
});
*/
