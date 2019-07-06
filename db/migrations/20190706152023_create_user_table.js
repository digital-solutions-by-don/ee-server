
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', table => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable().unique('uq_user_email');
        table.boolean('is_admin').notNullable().defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user');
};
