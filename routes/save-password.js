const express = require("express");
// const bodyParser = require("body-parser");
// const cookieSession = require("cookie-session");

const app = express();
const router = express.Router();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["key"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );

// router.post("/", (req, res) => {
//   console.log("it's here");
//   res.redirect("/passwords");
//   return router;
// });
// const password = req.body.password;
const queryString = `
    INSERT INTO passwords (user_id, website_url, website_username, website_password, category_id)
    VALUES ($1, $2, $3, $4, $5);
    `;

const createPassword = function (db, queryString, queryParams) {
  return db
    .query(queryString, queryParams)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = (db) => {
  router.post("/", (req, res) => {
    const id = req.session["user_id"];
    const queryParams = [
      id,
      req.body.website_url,
      req.body.website_username,
      req.body.password,
      req.body.category_id,
    ];
    createPassword(db, queryString, queryParams).then(() => {
      res.redirect("/passwords");
    });

    console.log("it's at the end");
  });
  return router;
};
// module.exports = router;
