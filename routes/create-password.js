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

// Renders Create New Password page
router.get("/", (req, res) => {
  const templateVars = {
    user: req.session.user_id,
  };
  res.render("password_create", templateVars);
  return router;
});

router.post("/", (req, res) => {
  console.log("it's here");
  res.redirect("/passwords");
  return router;
});

module.exports = router;
