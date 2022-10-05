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
    .select("*")
    .first();
  return voter;
};

const isVoterRegistered = async (voterId, roomId) => {
  const id = await knex("voters")
    .where({
      id: voterId,
      room_id: roomId,
    })
    .select("id");
  if (id.length) {
    return true;
  }
  return false;
};

const findVoterName = async (voterId) => {
  const voter = await knex("voters")
    .where("id", voterId)
    .select("name")
    .first();
  return voter.name;
};

module.exports = {
  registerVoter,
  getVoter,
  isVoterRegistered,
  findVoterName,
};
