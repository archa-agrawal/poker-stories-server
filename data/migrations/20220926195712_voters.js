exports.up = async function (knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("voters", (t) => {
    t.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    t.string("name").notNullable();
    t.uuid("room_id").references("id").inTable("rooms").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("voters");
};
