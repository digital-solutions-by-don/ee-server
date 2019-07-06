
exports.up = function(knex,Promise) {
  return knex.schema.createTable('messages',table=> {
      table.increments('id').primary();
      table.integer('creator_id').references('id').inTable('user').notNullable();
      table.string('message_subject').notNullable();
      table.string('message_body').notNullable();
      table.integer('parent_message_id').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('messages');
};
