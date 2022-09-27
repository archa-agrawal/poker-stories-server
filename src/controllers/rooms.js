const { Router } = require("express");
const { createRoom, getRoom, getAllRooms } = require("../helpers/rooms");
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
  router.get("/all", loginRequired, async (req, res) => {
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
      res.send(room);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  return router;
};
