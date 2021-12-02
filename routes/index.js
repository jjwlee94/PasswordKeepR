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

// Renders homepage
router.get("/", (req, res) => {
  const templateVars = {
    user: req.session.user_id,
  };

  res.render("index", templateVars);
});

// Renders updated passwords page
// router.post("/passwords", (req, res) => {
//   const templateVars = {
//     user: req.session.user_id,
//     url: req.body.website_url,
//     username: req.body.website_username,
//     password: req.body.password,
//     category: req.body.category_id,
//   };
//   res.render("password_all", templateVars);
//   return router;
// });

module.exports = router;
