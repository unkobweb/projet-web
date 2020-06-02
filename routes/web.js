const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");

router.get("/", homeController.index);
router.get("/register", authController.indexRegister);
router.post("/register", urlencodedParser, authController.register);
router.get("/login", authController.indexLogin);
router.post("/login", authController.login);
router.post("/externalConnexion", authController.externalConnexion);

module.exports = router;
