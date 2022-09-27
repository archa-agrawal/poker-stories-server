const { Router } = require("express");
const { loginRequired } = require("../helpers/users");
const { registerVoter, getVoter } = require("../helpers/voters");

module.exports = () => {
  const router = Router();

  router.post("/register", loginRequired, async (req, res) => {
    try {
      const existingVoter = await getVoter(req.user, req.body.roomId);
      if (existingVoter) {
        return res.send(existingVoter);
      }
      const voter = await registerVoter(req.user, req.body.roomId);
      return res.send(voter);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  return router;
};
