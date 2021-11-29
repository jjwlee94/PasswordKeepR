const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

const verifyEmail = function (newUser, databaseEmailsArray) {
  for (let item of databaseEmailsArray) {
    if (item.email === newUser.email) {
      // res.status(500).JSON({ error: "Email already exists" });
      return true

    } else {
      console.log('im hanging')
      return false
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
const createUserAccount = function (userDataObj, db) {
  const query = `
    INSERT INTO users (name, email, password,)
    VALUES ($1, $2, $3,)
    ;
  `;
  const values = [
    `${userDataObj.name}`,
    `${userDataObj.email}`,
    `${userDataObj.password}`,
  ];
  return db.query(query, values).then((res) => {
    logQueries ? console.log(res.rows) : null;
    return res.rows;
  });
};
const getUserByEmail = function (email, db) {
  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1
    ;
  `;
  const values = [`${email}`];
  return db.query(queryString, values).then((res) => {
    logQueries ? console.log(res.rows) : null;
    return res.rows;
  });
};
const verifyRegisterInfo = (email, password, user) => {
  return !!(email && password && email.length <= 255 && password.length <= 255,
  email.length >= 1 && password.length <= 1,
  !user);
};
module.exports = {
  getUserByEmail,
  users,
  createUserAccount,
  verifyRegisterInfo,
  verifyEmail,
};
