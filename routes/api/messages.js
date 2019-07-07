const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../../knexfile');
const passport = require('passport');
const db = knex(knexConfig.development);

const validateMessageInputs = require('../../validators/message_post');

router.get('/test', (req, res) => res.json({message: 'Working'}));

router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    db('messages').where('creator_id', req.params.id).returning('*').then(messages => {
        console.log(messages);
        res.json(messages);
    }).catch(err => {
        res.status(400).json(err);
    })
});

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    db('messages').select().returning('*').then(messages => {
        console.log(messages);
        res.json(messages);
    }).catch(err => {
        console.log(err);
        res.status(400).json({messages: 'Please try your request later'});
    })
});

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const {errors, isValid} = validateMessageInputs(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    try {
        const messages = await db.insert(req.body).into('messages').returning('*');
        res.json(messages);
    } catch (error) {
        res.status(400).json({addMessage: 'Please try your request again later'});
    }
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const id = req.params.id;
    db('messages').where('id', id).del().returning('*').then(messages => {
        console.log(messages);
        res.json(messages)
    }).catch(err => {
        console.log(err);
        res.status(400).json({deleteMessage: 'Please try your request again later'})
    })
});

module.exports = router;