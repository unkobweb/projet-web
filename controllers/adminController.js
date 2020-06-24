const moment = require("moment");
const { Op } = require("sequelize");
const User = require("../models").User;
const Order = require("../models").Order;
const Product = require("../models").Product;
const Mark = require("../models").Mark;
const Game = require("../models").Game;
const Plateform = require("../models").Plateform;
const CdKey = require("../models").CdKey;

async function index(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    let members = await User.findAll();
    let marks = await Mark.findAll({ include: [Game, User] });
    let games = await Game.findAll({ include: [Plateform] });
    console.log(marks);
    res.render("admin", {
      session: req.session.user,
      nbPage: 7,
      members: members,
      marks: marks,
      games: games,
    });
  } else {
    res.redirect("/");
  }
}

async function getDashInfo(req, res) {
  if ((req.session.user != undefined, req.session.user.role > 0)) {
    let nbMembers = await User.count();
    let nbProducts = await Product.count();
    let lastOrders = await Order.findAll({
      include: [
        {
          model: Product,
          where: {
            createdAt: { [Op.gte]: moment().subtract(7, "days").toDate() },
          },
        },
      ],
    });
    let allSales = await Order.findAll({ include: [Product] });
    res.send({
      nbMembers: nbMembers,
      nbProducts: nbProducts,
      lastOrders: lastOrders,
      allSales: allSales,
    });
  } else {
    res.sendStatus(501);
  }
}

async function modifyMember(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    let member = await User.findOne({ where: { id: req.params.id } });
    res.render("modifyMember.ejs", {
      session: req.session.user,
      nbPage: 0,
      member: member,
    });
  } else {
    res.redirect("/");
  }
}
async function changeMember(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    console.log(req.body);
    let user = await User.findOne({ where: { id: req.body.id } });
    user.username = req.body.username;
    if (req.body.date_of_birth != "") {
      user.date_of_birth = req.body.date_of_birth;
    }
    user.role = parseInt(req.body.role);
    user.save();
    res.redirect("/admin");
  } else {
    res.send(501);
  }
}
async function deleteMember(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    let user = await User.findOne({ where: { id: req.params.id } });
    user.destroy();
    res.redirect("/admin");
  } else {
    res.send(501);
  }
}
async function modifyMark(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    let mark = await Mark.findOne({
      where: { id: req.params.id },
      include: [User, Game],
    });
    res.render("modifyMark.ejs", {
      session: req.session.user,
      nbPage: 0,
      mark: mark,
    });
  } else {
    res.redirect("/");
  }
}
async function changeMark(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    let mark = await Mark.findOne({
      where: { id: req.body.id },
    });
    mark.review = req.body.review;
    mark.save();
    res.redirect("/admin");
  } else {
    res.send(501);
  }
}
async function deleteMark(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    let mark = await Mark.findOne({ where: { id: req.params.id } });
    mark.destroy();
    res.redirect("/admin");
  } else {
    res.send(501);
  }
}
async function addGame(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    let plateforms = await Plateform.findAll();
    res.render("addGame.ejs", {
      session: req.session.user,
      nbPage: 0,
      plateforms: plateforms,
    });
  } else {
    res.redirect("/");
  }
}
async function createGame(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    console.log(req.body);
    Game.create({
      title: req.body.title,
      description: req.body.description,
      slug: req.body.slug,
      plateform_id: req.body.plateform,
      price: parseFloat(req.body.price),
      discount: parseInt(req.body.discount),
    });
    res.redirect("/admin");
  } else {
    res.send(501);
  }
}
async function genKey(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    function genKey() {
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      let key = "";
      for (let i = 0; i < 4; i++) {
        for (let y = 0; y < 5; y++) {
          key += chars[getRandomInt(getRandomInt(chars.length))];
        }
        if (i == 3) {
          break;
        } else {
          key += "-";
        }
      }
      return key;
    }
    for (let i = 0; i < req.body.number; i++) {
      let key = genKey();
      CdKey.create({
        gameId: req.body.id,
        cd_key: key,
        is_used: false,
      });
    }
  } else {
    res.redirect("/");
  }
}
async function modifyGame(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    let game = await Game.findOne({ where: { id: req.params.id } });
    let plateforms = await Plateform.findAll();
    res.render("modifyGame.ejs", {
      session: req.session.user,
      nbPage: 0,
      game: game,
      plateforms: plateforms,
    });
  } else {
    res.redirect("/");
  }
}
async function changeGame(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    let game = await Game.findOne({ where: { id: req.body.id } });
    game.title = req.body.title;
    game.description = req.body.description;
    game.slug = req.body.slug;
    game.plateform_id = req.body.plateform;
    game.price = parseFloat(req.body.price);
    game.discount = parseInt(req.body.discount);
    game.save();
    res.redirect("/admin");
  } else {
    res.send(501);
  }
}
async function deleteGame(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    let game = await Game.findOne({ where: { id: req.params.id } });
    game.destroy();
    res.redirect("/admin");
  } else {
    res.send(501);
  }
}

module.exports = {
  index,
  getDashInfo,
  modifyMember,
  deleteMember,
  modifyMark,
  deleteMark,
  modifyGame,
  deleteGame,
  changeMember,
  changeMark,
  changeGame,
  addGame,
  createGame,
  genKey,
};
