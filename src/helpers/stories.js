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

const getStory = async (storyId) => {
  const [story] = await knex("stories").where("id", storyId);
  return story;
};

const updateFinalPoint = async (storyId, points) => {
  const [story] = await knex("stories")
    .where("id", storyId)
    .update({ final_points: points }, ["*"]);
  return story;
};

module.exports = {
  createStory,
  getStories,
  getStory,
  updateFinalPoint,
};
