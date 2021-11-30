const { Pool } = require("pg");
module.exports = (db) => {
  const addUser = function (users, db) {
    const queryString = `
    INSERT INTO users (name, email, password, organization_id, admin)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`;

    const values = [
      users.name,
      users.email,
      users.password,
      users.organization_id,
      users.isAdmin,
    ];
    return db
      .query(queryString, values)
      .then((res) => {
        return res.rows[0];
      })
      .catch((err) => {
        return console.log("query error:", err);
      });
  };

  const verifyEmail = function (newUser, databaseEmailsArray) {
    for (let item of databaseEmailsArray) {
      if (item.email === newUser.email) {
        return true;
      } else {
        console.log("im hanging");
        return false;
      }
    }
  };

  const users = function (db) {
    const queryString = `
    SELECT *
    FROM organization
    `;
    return db.query(queryString).then((res) => {
      console.log(res.rows);
      return res.rows[0];
    });
  };

  module.exports = {
    getUserByEmail,
    users,
    createUserAccount,
    verifyRegisterInfo,
    verifyEmail,
    addUser,
  };
};
