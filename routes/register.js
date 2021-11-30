const express = require("express");
const dbFns = require("../db/helpers");
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

module.exports = (db) => {
  const addUser =  function(users) {
    const queryString = `
    INSERT INTO users (name, email, password, organization_id, admin)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`

    const values = [users.name, users.email, users.password, users.organization_id, users.isAdmin];
    return db.query(queryString, values)
      .then(res => {
        return res.rows[0];
      })
      .catch(err => {
        return console.log('query error:', err);
      })
  }
  const verifyEmail = function (newUser, databaseEmailsArray) {
    for (let item of databaseEmailsArray) {
      if (item.email === newUser.email) {
        return res.status(500).JSON({ error: "Email already exists" });

      } else {
        return
      }
    }
  };

  router.get("/", (req, res) => {

    res.render("register");
  });

  router.post("/", (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    // addUser(newUser)
     const queryString = `SELECT * FROM users`;
     const emailQuery = `SELECT email FROM users`;
     return db.query(emailQuery, null)

       .then ((response) => {
         console.log(newUser)
         const responseArray = response.rows
        //  responseArray.forEach(item => (item.email === newUser.email) ? console.log(true): console.log(false))
        // console.log(responseArray.length)
        for (let i = 0; i < responseArray.length; i++) {
          // console.log(responseArray[i])
          if (responseArray[i].email === newUser.email) {
            res.status(500).json({ error: "Email already exists" });
            return
          }
        }
        if(!newUser.isAdmin) {
          newUser.isAdmin = false
        }
        addUser(newUser)

         res.redirect('/')

            })









})
return router;
  }


// database.addUser(user)
//     .then(user => {
//       if (!user) {
//         res.send({error: "error"});
//         return;
//       }
//   router.post('/', (req, res) => {
//     const user = req.body;
//     user.password = bcrypt.hashSync(user.password, 12);
//     database.addUser(user)
//     .then(user => {
//       if (!user) {
//         res.send({error: "error"});
//         return;
//       }

//     })
//     .catch(e => res.send(e));
//   });

// return router

// }





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

// module.exports = router;

