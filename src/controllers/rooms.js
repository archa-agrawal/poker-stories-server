const { Router } = require("express");
const { createRoom, getRoom, getAllRooms } = require("../helpers/rooms");
const { getStories } = require("../helpers/stories");
const { loginRequired } = require("../helpers/users");

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
      res.send(room);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  return router;
};
