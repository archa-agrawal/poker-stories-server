const knex = require("../db");

const givePoints = async (pointsData) => {
  const [storyPoints] = await knex("story_points").insert(
    {
      points: pointsData.points,
      voter_id: pointsData.voterId,
      story_id: pointsData.storyId,
    },
    ["id", "points"]
  );
  return storyPoints;
};

module.exports = {
  givePoints,
};
