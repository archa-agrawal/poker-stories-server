const knex = require("../db");
const { findVoterName } = require("./voters");

const givePoints = async (pointsData) => {
  const [storyPoints] = await knex("story_points").insert(
    {
      points: pointsData.points,
      voter_id: pointsData.voterId,
      story_id: pointsData.storyId,
    },
    ["id", "points", "story_id"]
  );
  if (storyPoints.id) {
    storyPoints.hasVoted = true;
  }
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

const hasUserVoted = async (voterId, storyId) => {
  const vote = await knex("story_points")
    .where({
      story_id: storyId,
      voter_id: voterId,
    })
    .first();
  if (vote) {
    return true;
  }
  return false;
};

module.exports = {
  givePoints,
  getStoryPoints,
  hasUserVoted,
};
