
exports.up = function(knex) {
  return knex.schema.createTable('message_routes', table=> {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('user').notNullable();
      table.integer('message_id').references('id').inTable('messages').notNullable();
      table.boolean('is_read').defaultTo(false);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('message_routes')
};
