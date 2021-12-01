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

// const createPassword = function (db) {
//   queryString = `
//   INSERT INTO passwords (user_id, website_url, website_username, website_password, category_id, organization_id)
//   VALUES ($1, $2, $3, $4, $5, $6)
//   RETURNING *;
//   `;
//   queryParams = [
//     passwords.user_id,
//     passwords.website_url,
//     passwords.website_username,
//     passwords.website_password,
//     passwords.category_id,
//     passwords.organization_id,
//   ];
//   return db
//     .query(queryString, queryParams)
//     .then((res) => {
//       return res.rows[0];
//     })
//     .catch((err) => {
//       return console.log(err);
//     });
// };

// Renders Create New Password page
router.get("/", (req, res) => {
  res.render("password_create");
  return router;
});

module.exports = router;
