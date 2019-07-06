
exports.up = function(knex,Promise) {
  return knex.schema.createTable('education', table => {
      table.increments('id').primary();
      table.integer('app_id').references('id').inTable('application').notNullable();
      table.string('school_name').notNullable();
      table.string('subject').notNullable();
      table.boolean('graduate').defaultTo(false);
      table.string('degree').notNullable();
  })
};

exports.down = function(knex,Promise) {
  return knex.schema.dropTableIfExists('education');
};
