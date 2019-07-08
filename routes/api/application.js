const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../../knexfile');
const passport = require('passport');
const db = knex(knexConfig.development);

const validatePersonalDataInputs = require('../../validators/application_personaldata');

router.get('/test', (req,res)=> res.json({message: 'Working'}));

router.post('/personal-data', passport.authenticate('jwt',{session: false}), (req,res) => {
    const {errors, isValid} = validatePersonalDataInputs(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

})

module.exports = router;