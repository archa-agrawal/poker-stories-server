const knex = require("../db");

const createRoom = async (user, { name }) => {
  const [room] = await knex("rooms").insert(
    {
      name,
      user_id: user.id,
    },
    ["id", "name"]
  );
  room.isRoomOwner = true;

  return room;
};

const getRoom = async (id) => {
  const [room] = await knex.select("id", "name").from("rooms").where("id", id);
  return room;
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

const getAllRooms = async (user) => {
  const rooms = await knex("rooms")
    .leftJoin("voters", "rooms.id", "voters.room_id")
    .select("rooms.*")
    .where({
      "rooms.user_id": user.id,
    })
    .orWhere({
      "voters.user_id": user.id,
    })
    .groupBy("rooms.id");
  return rooms.map(({ id, name, user_id }) => ({
    id,
    name,
    isRoomOwner: user.id === user_id,
  }));
};

module.exports = {
  createRoom,
  getRoom,
  getAllRooms,
  isRoomOwner,
};
