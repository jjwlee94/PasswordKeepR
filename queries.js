// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();
console.log("connected to the db")


const getUserWithEmail = function(email) {

  return pool
    .query('SELECT * FROM users WHERE email = $1', [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch(() => {
      return null;
    });
};
exports.getUserWithEmail = getUserWithEmail;