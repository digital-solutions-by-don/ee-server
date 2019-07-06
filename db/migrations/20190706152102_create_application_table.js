
exports.up = function(knex,Promise) {
  return knex.schema.createTable('application', table => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('user').notNullable();
      table.string('middle_name');
      table.string('preferred_name');
      table.string('address').notNullable();
      table.string('address2');
      table.string('city').notNullable();
      table.string('zip_code').notNullable();
      table.string('phone_number').notNullable();
      table.string('alt_phone_number');
      table.boolean('weekdays').defaultTo(false);
      table.boolean('weekends').defaultTo(false);
      table.boolean('evenings').defaultTo(false);
      table.boolean('nights').defaultTo(false);
      table.boolean('full_time').defaultTo(false);
      table.boolean('part_time').defaultTo(false);
      table.boolean('temporary').defaultTo(false);
      table.string('position').notNullable();
      table.date('start_date').notNullable();
      table.string('referred_by').notNullable();
      table.string('start_pay').notNullable();
      table.boolean('auth_yes').defaultTo(false);
      table.boolean('auth_no').defaultTo(false);
      table.boolean('under_yes').defaultTo(false);
      table.boolean('under_no').defaultTo(false);
      table.boolean('permit_yes').defaultTo(false);
      table.boolean('permit_no').defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex,Promise) {
    return knex.schema.dropTableIfExists('application');
};
