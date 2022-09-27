const knex = require("../db");

const registerVoter = async (user, roomId) => {
  const [voter] = await knex("voters").insert(
    {
      name: user.name,
      user_id: user.id,
      room_id: roomId,
    },
    ["id", "room_id"]
  );
  return voter;
};

const getVoter = async (user, roomId) => {
  const voter = await knex("voters")
    .where({
      user_id: user.id,
      room_id: roomId,
    })
    .select("id", "room_id")
    .first();
  return voter;
};

module.exports = {
  registerVoter,
  getVoter,
};
