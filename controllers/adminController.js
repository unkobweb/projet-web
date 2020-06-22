const moment = require("moment");
const { Op } = require("sequelize");
const User = require("../models").User;
const Order = require("../models").Order;
const Product = require("../models").Product;
const Mark = require("../models").Mark;
const Game = require("../models").Game;

async function index(req, res) {
  if (req.session.user != undefined && req.session.user.role > 0) {
    let members = await User.findAll();
    let marks = await Mark.findAll({ include: [Game, User] });
    console.log(marks);
    res.render("admin", {
      session: req.session.user,
      nbPage: 7,
      members: members,
      marks: marks,
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

module.exports = { index, getDashInfo };
