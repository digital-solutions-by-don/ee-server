
exports.up = function(knex, Promise) {
  return knex.schema.createTable('employment', table => {
      table.increments('id').primary();
      table.integer('app_id').references('id').inTable('application').notNullable();
      table.string('employer').notNullable();
      table.string('location').notNullable();
      table.date('start_date').notNullable();
      table.date('end_date');
      table.boolean('contact').defaultTo(false);
      table.string('reason_for_leaving').notNullable();
      table.string('supervisor').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('employment');
};
