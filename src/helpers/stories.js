const knex = require("../db");

const createStory = async (title, roomId) => {
  const [story] = await knex("stories").insert(
    {
      title: title,
      room_id: roomId,
    },
    ["id", "title"]
  );
  return story;
};

const getStories = async (roomId) => {
  const stories = await knex("stories").where("room_id", roomId);
  return stories;
};

module.exports = {
  createStory,
  getStories,
};
