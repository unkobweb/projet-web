const User = require("../models").User;
const Mark = require("../models").Mark;
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
module.exports = { index, getDashInfo };
