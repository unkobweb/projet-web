// Import modules
const express = require("express");

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

app.use(express.static(__dirname + "/public"));

app.use("/", require("./routes/web"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server started on ${PORT}`));
