// Import modules
const express = require("express");

// Database
const db = require("./config/database");

// Test DB connection
db.authenticate()
  .then(() => console.log("Database connected.."))
  .catch((err) => console.log("DB Error : " + err));

const app = express();

app.use("/users", require("./routes/users"));

const PORT = 8000;
app.listen(PORT, console.log(`Server started on ${PORT}`));
