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
        console.log(req.session.user_id);
        // console.log(db);
        // console.log(data);
        res.render("password_all", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
