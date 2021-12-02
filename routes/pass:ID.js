const express = require("express");
const router = express.Router();
const getEmailUserPass = (user_id, db) => {
  return db
    .query(
      `
      SELECT website_url, website_username, website_password, categories.category_name AS category
      FROM passwords
      JOIN categories ON categories.id = category_id
      WHERE user_id = $1
      ORDER BY category;
      `,

      [user_id]
    )
    .then((result) => {
      return result.rows;
    });
};

// GET email, username and password
module.exports = (db) => {
  router.get("/", (req, res) => {
    getEmailUserPass(req.session.user_id, db)
      .then((data) => {
        const templateVars = {
          user: req.session.user_id,
          rows: data,
        };
        console.log("rows", templateVars);
        res.render("password_all", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const categories = {
      social: 1,
      work: 2,
      entertainment: 3,
    };

    const getCategoryId = (categoryName) => {
      for (let category in categories) {
        if (category === categoryName) {
          return categories[category];
        }
      }
    };

    const templateVars = {
      user: req.session.user_id,
      url: req.body.website_url,
      username: req.body.website_username,
      password: req.body.password,
      category: getCategoryId(req.body.category_id),
      organizationID: 1,
    };

    const queryString = `INSERT INTO passwords (
                  user_id,
                  website_url,
                  website_username,
                  website_password,
                  category_id,
                  organization_id
                  ) VALUES ($1,$2,$3,$4,$5,$6)
                  RETURNING *;`;

    const values = [
      templateVars.user,
      templateVars.url,
      templateVars.username,
      templateVars.password,
      templateVars.category,
      templateVars.organizationID,
    ];

    return db
      .query(queryString, values)
      .then((data) => {
        // console.log("dataaaa----->", data);
        res.redirect("/passwords");
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  return router;
};
