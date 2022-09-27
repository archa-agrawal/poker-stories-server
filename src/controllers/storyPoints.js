const { Router } = require("express");
const { givePoints } = require("../helpers/storyPoints");
const { loginRequired } = require("../helpers/users");
const { isVoterRegistered } = require("../helpers/voters");

module.exports = () => {
  const router = Router();

  router.post("/", loginRequired, async (req, res) => {
    try {
      const isRegistered = await isVoterRegistered(
        req.body.voterId,
        req.body.roomId
      );
      if (!isRegistered) {
        return res.send("please register to the room");
      }
      const storyData = await givePoints(req.body);
      return res.send(storyData);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });
  return router;
};
