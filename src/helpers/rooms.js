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

module.exports = {
  createRoom,
  getRoom,
  getAllRooms,
};
