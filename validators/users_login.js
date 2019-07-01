const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function valaditeLoginInputs(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = '*Invalid Email Address'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "*Required"
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "*Required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
