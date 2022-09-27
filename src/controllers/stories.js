const { Router } = require("express");
const { isRoomOwner } = require("../helpers/rooms");
const { createStory } = require("../helpers/stories");
const { loginRequired } = require("../helpers/users");

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

  return router;
};
