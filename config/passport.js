const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETS_OR_KEY;

module.exports = passport => {
    new JwtStrategy(opts, (jwt_payload, done) => {
        db('login').where('id', jwt_payload.id).then(user => {
            if (user !== []) {
                return done(null, user);
            }
            return done(null, false);
        }).catch(err => console.log(err));
    })
};
