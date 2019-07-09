const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../../knexfile');
const passport = require('passport');
const db = knex(knexConfig.development);

const validatePersonalDataInputs = require('../../validators/application_personaldata');
const validateEmploymentInputs = require('../../validators/application_employment');

router.get('/test', (req,res)=> res.json({message: 'Working'}));

router.post('/personal-data', passport.authenticate('jwt',{session: false}), (req,res) => {
    const {errors, isValid} = validatePersonalDataInputs(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    db('application').insert(req.body).returning('id').then(app_id => {
        console.log(app_id[0]);
        res.json(app_id[0])
    }).catch(error=> {
        console.log(error);
        res.status(400).json({message: 'Please try your request later'});
    })
});

router.post('/employment', passport.authenticate('jwt',  {session: false}), (req,res) => {
    const {errors, isValid} = validateEmploymentInputs(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    db('application').insert(req.body).returning('*').then(record => {
        console.log(record);
        res.json(record);
    }).catch(err => {
        console.log(err);
        res.status(400).json({employment: 'Please try your request again'});
    })
});

router.get('/', passport.authenticate('jwt',{session: false}),(req,res) => {

    db('application').select().where('user_id',req.user[0].id).returning('*').then(pData => {
        console.log(pData);
        res.json(pData[0]);
    }).catch(err => {
        console.log(err);
        res.status(400).json({application: 'Please try your request later'});
    })

})

module.exports = router;