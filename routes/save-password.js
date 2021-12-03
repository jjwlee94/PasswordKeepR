const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

// router.post("/", (req, res) => {
//   console.log(req.session["user_id"]);
//   res.send("HEllo");
// });

module.exports = (db) => {
  // Function to add a New user to the database

  // POST ROUTE
  router.post("/", (req, res) => {
    console.log(req.body);

    category_id = 0;

    switch (req.body.category_id) {
      case "social":
        category_id = 1;
        break;
      case "work":
        category_id = 2;
        break;
      case "entertainment":
        category_id = 3;
    }

    const savePassword = function () {
      const queryString = `
        INSERT INTO passwords (user_id, website_url, website_username, category_id, website_password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`;

      const values = [
        req.session["user_id"],
        req.body.website_url,
        req.body.website_username,
        category_id,
        req.body.password,
      ];
      return db
        .query(queryString, values)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          return console.log("query error:", err);
        });
    };

    savePassword().then(() => {
      res.redirect("/passwords");
    });
  });
  return router;
};
