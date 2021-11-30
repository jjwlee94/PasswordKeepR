const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const users = require("../db/helpers");
const { emptyQuery } = require("pg-protocol/dist/messages");

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["key"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// GET requests

// Renders Create New Password page
router.get("/", (req, res) => {
  const templateVars = {
    user: users[req.body.email],
  };
  res.render("password_create", templateVars);
  return router;
});

// POST requests
router.post("/", (req, res) => {
  res.redirect("/");
});

module.exports = router;
