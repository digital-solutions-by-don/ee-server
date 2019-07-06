// Update with your config settings.
require('dotenv').config();
module.exports = {

    development: {
        client: 'pg',
        connection: {
            database: 'ee_employees',
            host: '127.0.0.1',
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        },
        migrations: {
            directory: './db/migrations'
        },
        useNullAsDefault: true
    },
    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
