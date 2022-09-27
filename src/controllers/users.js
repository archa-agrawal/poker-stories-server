const { Router } = require("express");
const { createUser, login, loginRequired } = require("../helpers/users");

module.exports = () => {
  const router = Router();

  router.post("/register", async (req, res, next) => {
    try {
      await createUser(req.body);
      login(req, res, next);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  router.post("/login", (req, res, next) => {
    try {
      login(req, res, next);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  router.post("/logout", loginRequired, (req, res) => {
    req.logout(() => {
      res.sendStatus(200);
    });
  });

  router.get("/profile", loginRequired, async (req, res) => {
    res.send({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
    });
  });

  return router;
};
