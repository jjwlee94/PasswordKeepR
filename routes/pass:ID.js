const express = require('express');
const router = express.Router();
const getEmailUserPass = (organization_id,db) => {
  return db.query(`SELECT website_url, website_username, website_password FROM passwords WHERE organization_id =$1`,[organization_id])
    .then((result) => {
      return result.rows;
    });
};

// GET email, username and password;
module.exports = (db) => {
  router.get('/:id',(req,res) => {
    getEmailUserPass(req.params.id,db)
      .then((data) => {
        res.json(data)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
