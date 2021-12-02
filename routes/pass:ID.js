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

// const getCategoryId = (categoryName,db) => {
//   const queryString =
//     `
//     SELECT id
//     FROM categories
//     WHERE category_name = $1;
//     `
//   const val = categoryName;
//   db.query(queryString, val)
//     .then((res)=> {
//       return res.rows[0];
//     })
// }





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
    // console.log("reached post /passwords in PASS:ID line 40-----");

    // console.log("req.body---->", req.body);
    // console.log("req.body.category_id----->", req.body.category_id); // 'work'

    // const upperCase = (string) => {
    //   let catId = "";
    //   for (let i = 0; i < string.length; i++) {
    //     i === 0 ? (catId += string[i].toUpperCase()) : (catId += string[i]);
    //   }
    //   return catId;
    // };

    // let catName = upperCase(req.body.category_id); //"Work"
    // console.log("catName---->", catName);

    // 1st query to get the catergory id from CATEGORIES
    // const queryOne = `
    // SELECT id
    // FROM categories
    // WHERE category_name = $1;
    // `;
    // const val = [catName];

    // return db.query(queryOne, val)
    //   .then((res) => {
    //     console.log("res", res.row[0]); // {id: 2}
    //     let idCat = res.rows[0]; // {id:2}
    //     return idCat;
    //   })
    //   .then((idCat)=> {
    //     const templateVars = {
    //       user: req.session.user_id,
    //       url: req.body.website_url,
    //       username: req.body.website_username,
    //       password: req.body.password,
    //       category: idCat.id, //category: 2
    //       organizationID: 1,
    //     };


/******* */

        console.log("this is social media's req.body------>", req.body.category_id);

        const categories = {
          social: 1,
          work: 2,
          entertainment: 3
        }

        // req.body.category_id ----> work

        const getCategoryId = (categoryName) => {
          for (let category in categories) {
            if (category === categoryName) {
              return categories[category]
            }
          }
        }

        // console.log("calling function---->,", getCategoryId(req.body.category_id));

        const templateVars = {
          user: req.session.user_id,
          url: req.body.website_url,
          username: req.body.website_username,
          password: req.body.password,
          category: getCategoryId(req.body.category_id),
          organizationID: 1,
        }

        // console.log("TEMPLATE VARS 111----->", templateVars);

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
         //second query
         return db.query(queryString, values)
          .then((data) => {
            // console.log("dataaaa----->", data);
            res.redirect("/passwords");
          })
          .catch((err)=> {
            console.log(err.message);
          })

      //    .catch((err) => {
      //      console.error(err.message)
      // });

    });
  return router;
};
//second query
return db.query(queryString, values)
