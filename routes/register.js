const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

module.exports = (db) => {
  // Function to add a New user to the database
  const addUser = function (users) {
    const queryString = `
    INSERT INTO users (name, email, password, organization_id, admin)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`;

    const values = [
      users.name,
      users.email,
      users.password,
      users.organization_id,
      users.isAdmin,
    ];
    return db
      .query(queryString, values)
      .then((res) => {
        return res.rows[0];
      })
      .catch((err) => {
        return console.log("query error:", err);
      });
  };

  // GET ROUTE
  router.get("/", (req, res) => {
    const templateVars = {
      user: req.session.user_id,
    };
    res.render("register", templateVars);
  });
  // POST ROUTE
  router.post("/", (req, res) => {
    const newUser = req.body;
    const queryString = `SELECT * FROM users`;
    const emailQuery = `SELECT email FROM users`;
    return db
      .query(emailQuery, null)

      .then((response) => {
        //Checking if the email is already in the database
        const responseArray = response.rows;
        for (let i = 0; i < responseArray.length; i++) {
          if (responseArray[i].email === newUser.email) {
            res.status(500).send({ error: "Email already exists" });
            return;
          }
        }
        if (!newUser.isAdmin) {
          newUser.isAdmin = false;
        }
        // Add New User to database
        addUser(newUser, db);
        req.session.user_id = newUser.name;

        res.redirect("/");
      });
  });
  return router;
};
