exports.up = async function (knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("story_points", (t) => {
    t.increments("id").primary();
    t.string("points").notNullable();
    t.uuid("voter_id").references("id").inTable("voters").notNullable();
    t.uuid("story_id").references("id").inTable("stories").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("story_points");
};
