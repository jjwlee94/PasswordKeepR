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

// Renders Login page
router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  res.redirect("/passwords");
});

module.exports = router;
