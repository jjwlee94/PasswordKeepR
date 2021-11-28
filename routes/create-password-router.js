const express = require("express");
const router = express.Router();

// GET /passwords/create
router.get("/", (req, res) => {
  res.render("password_create");
});

module.exports = router;
