const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const { addPassword } = require("../db/helpers");

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

module.exports = function (router, db) {};
// GET requests

// Renders homepage
router.get("/", (req, res) => {
  res.render("index");
  return router;
});

// Renders passwords page
router.get("/passwords", (req, res) => {
  res.render("password_all");
  return router;
});

// Renders updated passwords page
router.post("/passwords", (req, res) => {
  // const password = generatePassword();
  const templateVars = {
    url: req.body.website_url,
    username: req.body.website_username,
    password: "password",
    category: req.body.category_id,
  };

  res.render("password_all", templateVars);
  return router;
});

module.exports = router;
