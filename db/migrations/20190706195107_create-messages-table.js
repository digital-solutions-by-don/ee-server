
exports.up = function(knex) {
  return knex.schema.createTable('messages', table=> {
      table.increments('id').primary();
      table.integer('creator_id').references('id').inTable('user').notNullable().onDelete('CASCADE');
      table.string('message_subject').notNullable();
      table.string('message_body').notNullable();
      table.string('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('messages');
};
