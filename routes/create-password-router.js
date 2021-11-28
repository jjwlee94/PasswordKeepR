const express = require("express");
const router = express.Router();

// GET requests

// Renders Create New Password page
router.get("/", (req, res) => {
  res.render("password_create");
});

// POST requests

module.exports = router;
