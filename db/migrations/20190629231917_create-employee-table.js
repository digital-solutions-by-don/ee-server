
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', table => {
      table.increments('id').primary();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('email',255).notNullable().unique();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
