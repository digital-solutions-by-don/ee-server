
exports.up = function(knex, Promise) {
  return knex.schema.createTable('login', table => {
      table.increments('id').primary();
      table.string('hash', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.timestamp('createAt').defaultTo(knex.fn.now());
      table.timestamp('lastLogIn').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('login');
};
