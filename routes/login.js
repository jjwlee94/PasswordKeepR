const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const dbParams = require("../lib/db");
const router = express.Router();

// GET requests

// Renders Login page
module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      user: req.session.user_id,
    };
    res.render("login", templateVars);
  });
  // POST route
  router.post("/", (req, res) => {
    const newUser = req.body;
    // verifyEmail to check if it is already in the db
    const emailQuery = `SELECT * FROM users WHERE email = $1`;
    db.query(emailQuery, [newUser.email]).then((response) => {
      if (!response.rows[0]) {
        res.status(400).send("Invalid email");
        return;
      } else {
        req.session.user_id = response.rows[0].id;
        req.session.username = response.rows[0].name;
        console.log(response.rows[0]);
        res.redirect("/passwords");
      }
    });
  });

  return router;
};
