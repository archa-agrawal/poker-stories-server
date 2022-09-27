const knex = require("../db");

const createRoom = async (user, { name }) => {
  const [room] = await knex("rooms").insert(
    {
      name,
      user_id: user.id,
    },
    ["id", "name"]
  );

  return room;
};

const getRoom = async (id) => {
  const [room] = await knex.select("id", "name").from("rooms").where("id", id);
  return room;
};

const getAllRooms = async (user) => {
  const rooms = await knex("rooms")
    .where("user_id", user.id)
    .select("id", "name");
  return rooms;
};

const isRoomOwner = async (user, roomId) => {
  const ownerId = await knex
    .select("user_id")
    .from("rooms")
    .where("id", roomId)
    .first();
  if (ownerId.user_id === user.id) {
    return true;
  }
  return false;
};

module.exports = {
  createRoom,
  getRoom,
  getAllRooms,
  isRoomOwner,
};
