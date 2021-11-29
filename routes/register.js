const express = require("express");
const dbFns = require("../db/helpers");
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

module.exports = (db) => {
  const addUser =  function(users) {
    const queryString = `
    INSERT INTO users (name, email, password, organization_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`

    const values = [users.name, users.email, users.Password, users.organization_id];
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

    // addUser(newUser)
     const queryString = `SELECT * FROM users`;
     const emailQuery = `SELECT email FROM users`;
     return db.query(emailQuery, null)

       .then ((response) => {
         console.log(response)
         const responseArray = response.rows
        //  responseArray.forEach(item => (item.email === newUser.email) ? console.log(true): console.log(false))
        console.log(responseArray.length)
        for (let i = 0; i < responseArray.length; i++) {
          console.log(responseArray[i])
          if (responseArray[i].email === newUser.email) {
            res.status(500).json({ error: "Email already exists" });
            return
          }

        }
        addUser(newUser)

         res.redirect('/')
        // for (let item of response.rows) {

          //   console.log(item.email)
          //   if (item.email === newUser.email) {
            //     console.log('it exists')


            //   } else {
              //     return
              //   }
              // }

            })
            // .then (() => {
            //   res.redirect('/');
            // })







      // .then((newUser) => {
      //   if (newUser === users.db) {
      //     res.send({ error: "error" });
      //     return;
      //   }else {
      //     res.redirect('/')
      //   }
      // })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
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





app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["key"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// GET requests

// Renders Login page

module.exports = router;

