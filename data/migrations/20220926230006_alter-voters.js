exports.up = async function (knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.alterTable("voters", (t) => {
    t.uuid("user_id").references("id").inTable("users").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("voters", (t) => {
    t.dropColumn("user_id");
  });
};
