const bcrypt = require("bcrypt");
const knex = require("../db");
const passport = require("../auth/local");

const createUser = async (user) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);
  await knex("users").insert({
    email: user.email,
    name: user.name,
    password: hash,
  });
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }
    if (!user) res.sendStatus(401);
    else {
      req.logIn(user, (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        }
        res.send({
          id: user.id,
          email: user.email,
          name: user.name,
        });
      });
    }
  })(req, res, next);
};

const loginRequired = (req, res, next) => {
  if (!req.user) return res.status(401).json({ status: "Please log in" });
  return next();
};

module.exports = {
  createUser,
  login,
  loginRequired,
};
