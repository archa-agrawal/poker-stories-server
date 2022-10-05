const { Router } = require("express");
const { isRoomOwner } = require("../helpers/rooms");
const {
  createStory,
  getStory,
  updateFinalPoint,
  getRoomId,
} = require("../helpers/stories");
const { getStoryPoints, hasUserVoted } = require("../helpers/storyPoints");
const { loginRequired } = require("../helpers/users");
const { isVoterRegistered, getVoter } = require("../helpers/voters");

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
      const storyId = req.params.id;
      const roomId = await getRoomId(storyId);
      const voter = await getVoter(req.user, roomId.room_id);
      const isRegistered = await isVoterRegistered(voter.id, roomId.room_id);
      if (!isRegistered) {
        return res.send("please register to the room");
      }
      const isOwner = await isRoomOwner(req.user, roomId.room_id);
      const points = await getStoryPoints(storyId);
      const hasVoted = await hasUserVoted(voter.id, storyId);
      const story = await getStory(storyId);
      story.isOwner = isOwner;
      story.points = points;
      story.hasVoted = hasVoted;
      res.send(story);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });
  router.post("/", loginRequired, async (req, res) => {
    try {
      const voter = await getVoter(req.user, req.body.roomId);
      const isRegistered = await isVoterRegistered(voter.id, req.body.roomId);
      if (!isRegistered) {
        return res.send("please register to the room");
      }
      const isOwner = await isRoomOwner(req.user, req.body.roomId);
      if (!isOwner) {
        return res.send("unauthorized");
      }
      const updatedstory = await updateFinalPoint(
        req.body.storyId,
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
