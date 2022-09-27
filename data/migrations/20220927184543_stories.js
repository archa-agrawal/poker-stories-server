exports.up = async function (knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("stories", (t) => {
    t.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    t.string("title").notNullable();
    t.string("final_points");
    t.uuid("room_id").references("id").inTable("rooms").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("stories");
};
