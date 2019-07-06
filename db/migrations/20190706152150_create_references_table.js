
exports.up = function(knex) {
  return knex.schema.createTable('references', table => {
      table.increments('id').primary();
      table.integer('app_id').references('id').inTable('application').notNullable();
      table.string('name').notNullable();
      table.string('relationship').notNullable();
      table.string('ref_phone_number').notNullable();
      table.string('years_known').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('references');
};
