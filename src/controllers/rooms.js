const { Router } = require("express");
const { createRoom, getRoom, getAllRooms } = require("../helpers/rooms");
const { getStories } = require("../helpers/stories");
const { loginRequired } = require("../helpers/users");
const { getVoter, registerVoter } = require("../helpers/voters");

module.exports = () => {
  const router = Router();

  router.post("/", loginRequired, async (req, res) => {
    try {
      const room = await createRoom(req.user, req.body);
      res.send(room);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });
  router.get("/", loginRequired, async (req, res) => {
    try {
      const rooms = await getAllRooms(req.user);
      res.send(rooms);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const room = await getRoom(req.params.id);
      const stories = await getStories(req.params.id);
      room.stories = stories;
      const existingVoter = await getVoter(req.user, req.params.id);
      if (existingVoter) {
        room.voterId = existingVoter.id;
      } else {
        const voter = await registerVoter(req.user, req.params.id);
        room.voterId = voter.id;
      }
      res.send(room);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  return router;
};
