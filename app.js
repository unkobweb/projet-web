// Import modules
const express = require("express");
const session = require("express-session");

// Database
require("./config/database");
//Firebase
require("./config/authentication");

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected.."))
  .catch((err) => console.log("DB Error : " + err));

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
