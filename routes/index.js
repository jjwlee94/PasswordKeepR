const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

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

// Renders main page
router.get("/", (req, res) => {
  res.render("index");
});
// Renders passwords page
router.get("/passwords", (req, res) => {
  res.render("user_interface");
});

module.exports = router;
