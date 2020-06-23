const moment = require("moment");
const { Op } = require("sequelize");
const User = require("../models").User;
const Order = require("../models").Order;
const Product = require("../models").Product;
const Mark = require("../models").Mark;
const Game = require("../models").Game;
const Plateform = require("../models").Plateform;

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
    user.date_of_birth = req.body.date_of_birth;
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
  } else {
    res.send(501);
  }
}
async function addGame(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    res.render("addGame.ejs", {
      session: req.session.user,
      nbPage: 0,
    });
  } else {
    res.redirect("/");
  }
}
async function createGame(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
  } else {
    res.send(501);
  }
}
async function modifyGame(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    res.render("modifyGame.ejs", {
      session: req.session.user,
      nbPage: 0,
    });
  } else {
    res.redirect("/");
  }
}
async function changeGame(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
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
};
