const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

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

// GET requests



// Renders Login page
router.get("/", (req,res)=>{
  res.render('login')
})

router.get("/:id", (req, res) => {
  const id = req.params.id
  console.log("id--------->",id)
  // req.session = null;
  // req.session.user_id = id;

  res.redirect("/passwords");
});

             
router.post("/", (req, res) => {
  // req.session.user_id = "Mei";
  res.redirect("/passwords");
});

module.exports = router;
