const knex = require("../db");
const { findVoterName } = require("./voters");

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

const getStoryPoints = async (storyId) => {
  const points = await knex("story_points").where("story_id", storyId);
  if (!points.length) {
    return points;
  }
  for (const point of points) {
    const voter = await findVoterName(point.voter_id);
    point.voter = voter;
    delete point.voter_id;
  }
  return points;
};

module.exports = {
  givePoints,
  getStoryPoints,
};
