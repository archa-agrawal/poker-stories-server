exports.up = async function (knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("rooms", (t) => {
    t.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    t.string("name").notNullable();
    t.uuid("user_id").references("id").inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("rooms");
};
