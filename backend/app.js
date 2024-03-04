const express = require("express");
const passport = require("passport");
const cors = require("cors");

const app = express();

// Express built-in middleware for parsing JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to PennyPincherPro");
});
app.use("/api/users", require("./routes/api/users"));
app.use("/api/plaid", require("./routes/api/plaid"));


module.exports = app;

