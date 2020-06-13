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

app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.use("/", require("./routes/web"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server started on ${PORT}`));
