const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const gameController = require("../controllers/gameController");
const authController = require("../controllers/authController");

router.get("/", gameController.index);
router.get("/register", authController.indexRegister);
router.post("/register", urlencodedParser, authController.register);
router.get("/login", authController.indexLogin);
router.post("/login", authController.login);
router.post("/externalConnexion", authController.externalConnexion);
router.get("/game/:id", gameController.show);
router.get("/disconnect", authController.disconnect);
router.get("/cart", gameController.cart);

module.exports = router;
