const { Router } = require("express");
const { givePoints } = require("../helpers/storyPoints");
const { loginRequired } = require("../helpers/users");
const { isVoterRegistered, getVoter } = require("../helpers/voters");

module.exports = () => {
  const router = Router();

  router.post("/", loginRequired, async (req, res) => {
    try {
      const voter = await getVoter(req.user, req.body.roomId);
      const isRegistered = await isVoterRegistered(voter.id, req.body.roomId);
      if (!isRegistered) {
        return res.send("please register to the room");
      }
      const vote = {
        points: req.body.points,
        voterId: voter.id,
        storyId: req.body.storyId,
      };
      const storyData = await givePoints(vote);
      storyData.voter = voter.name;
      return res.send(storyData);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });
  return router;
};
