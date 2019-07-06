const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = knex(knexConfig.development);
const jwt = require('jsonwebtoken');

const validateLoginInputs = require('../../../validators/users_login');
const validateRegisterInputs = require('../../../validators/users_register');
router.get('/test', (req, res) => res.json({message: 'working'}));

router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInputs(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const {first_name, last_name, email, password} = req.body;

    db('user').where('email', email).then(result => {
        if (result.length > 0) {
            errors.email = 'This email address has already been registered.';
            return res.status(400).json(errors);
        }
        const newUserLogin = {email};
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                newUserLogin.hash = hash;
                console.log(newUserLogin);
                db
                    .transaction(trx => {
                        trx
                            .insert(newUserLogin)
                            .into('login')
                            .returning('email')
                            .then(loginEmail => {
                                return trx('user').insert({
                                    email: loginEmail[0],
                                    first_name,
                                    last_name
                                }).returning('*').then(user => {
                                    console.log(user[0]);
                                    const payload = {
                                        id: user[0].id,
                                        email: user[0].email,
                                        first_name: user[0].first_name,
                                        last_name: user[0].last_name
                                    };
                                    jwt.sign(payload, process.env.SECRETS_OR_KEY, {expiresIn: 3600}, (err, token) => {
                                        return res.json({success: true, token: `Bearer ${token}`});
                                    });
                                });
                            })
                            .then(trx.commit)
                            .catch(trx.rollback);
                    })
                    .catch(err => console.log(err));
            });
        });
    });
});
router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInputs(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const {email, password} = req.body;
    db('login').where('email', email).then(user => {
        if (user.length === 0) {
            errors.email = 'This email is not registered';
            return res.status(404).json(errors);
        }
        bcrypt.compare(password, user[0].hash).then(isMatch => {

            if (isMatch) {
                db('user').where('email', user[0].email).then(currentUser => {
                    const payload = {
                        id: currentUser[0].id,
                        email: currentUser[0].email,
                        first_name: currentUser[0].first_name,
                        last_name: currentUser[0].last_name,
                        isAdmin: currentUser[0].is_admin
                    };
                    jwt.sign(payload, process.env.SECRETS_OR_KEY, {expiresIn: 3600}, (err, token) => {
                        return res.json({success: true, token: `Bearer ${token}`});
                    });
                });
            } else {
                errors.password = 'Password Incorrect';
                return res.status(400).json(errors);
            }
        });
    });
});
module.exports = router;
