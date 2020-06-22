const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
require("dotenv").config();

const gameController = require("../controllers/gameController");
const authController = require("../controllers/authController");
const profileController = require("../controllers/profileController");
const adminController = require("../controllers/adminController");

router.use("/", (req, res, next) => {
  req.session.style = process.env.STYLE || "simon";
  console.log(req.session);
  next();
});
router.get("/", gameController.index);
router.get("/register", authController.indexRegister);
router.post("/register", urlencodedParser, authController.register);
router.get("/login", authController.indexLogin);
router.post("/login", authController.login);
router.post("/externalConnexion", authController.externalConnexion);
router.get("/game/:id", gameController.show);
router.get("/disconnect", authController.disconnect);
router.post("/buy/:id", gameController.addToCart);
router.get("/cart", gameController.cart);
router.post("/removeFromCart/:id", gameController.removeFromCart);
router.get("/profile", profileController.index);
router.get("/checkout", profileController.checkout);
router.post("/succeed", profileController.succeed);
router.get("/purchases", profileController.purchaseIndex);
router.post("/getDiscount", gameController.getDiscount);
router.post("/getLate", gameController.getLate);
router.get("/mark/:id", gameController.markIndex);
router.post("/addMark", gameController.createMark);
router.post("/updateUser", urlencodedParser, profileController.updateUser);
router.get("/admin", adminController.index);
router.get("/getDashInfo", adminController.getDashInfo);

module.exports = router;
