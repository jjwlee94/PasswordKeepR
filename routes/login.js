const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const { getUserWithOrgId } = require("../db/helpers");

const app = express();
const router = express.Router();
const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["key"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );

// GET requests

// Renders Login page

router.get("/", (req, res) => {
  res.render("login");
});



router.post("/", (req, res) => {
  const id = req.params.id;

  res.redirect("/passwords");
});


module.exports = router;
