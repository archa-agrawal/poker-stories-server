const { Router } = require("express");
const { isRoomOwner } = require("../helpers/rooms");
const {
  createStory,
  getStory,
  updateFinalPoint,
} = require("../helpers/stories");
const { getStoryPoints } = require("../helpers/storyPoints");
const { loginRequired } = require("../helpers/users");
const { isVoterRegistered } = require("../helpers/voters");

module.exports = () => {
  const router = Router();

  router.post("/create", loginRequired, async (req, res) => {
    try {
      const isOwner = await isRoomOwner(req.user, req.body.roomId);
      if (!isOwner) {
        return res.send("unauthorized");
      }
      const story = await createStory(req.body.title, req.body.roomId);
      return res.send(story);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  router.get("/:id", loginRequired, async (req, res) => {
    try {
      const isRegistered = await isVoterRegistered(
        req.body.voterId,
        req.body.roomId
      );
      if (!isRegistered) {
        return res.send("please register to the room");
      }
      const isOwner = await isRoomOwner(req.user, req.body.roomId);
      const points = await getStoryPoints(req.params.id);
      const story = await getStory(req.params.id);
      story.isOwner = isOwner;
      story.points = points;
      res.send(story);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });
  router.post("/:id", loginRequired, async (req, res) => {
    try {
      const isRegistered = await isVoterRegistered(
        req.body.voterId,
        req.body.roomId
      );
      if (!isRegistered) {
        return res.send("please register to the room");
      }
      const isOwner = await isRoomOwner(req.user, req.body.roomId);
      if (!isOwner) {
        return res.send("unauthorized");
      }
      const updatedstory = await updateFinalPoint(
        req.params.id,
        req.body.finalPoints
      );
      return res.send(updatedstory);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  return router;
};
