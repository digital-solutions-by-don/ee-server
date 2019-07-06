
exports.up = function(knex) {
  return knex.schema.createTable('skills', table => {
      table.increments('id').primary();
      table.integer('app_id').references('id').inTable('application').notNullable();
      table.string('skill_name').notNullable();
      table.string('skill_years').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('skills');
};
