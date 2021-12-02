// We can ignore this page since we don't need to implement this function

const express = require("express");

const router = express.Router();

// GET requests

// Renders Login page
router.post("/", (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = router;
