const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRegisterInputs(data) {
    let errors = {};

    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.first_name, {min: 2, max: 30})) {
        errors.first_name = "First name must be between 2 and 30 characters";
    }
    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = "*Required"
    }
    if (!Validator.isLength(data.last_name, {min: 2, max: 30})) {
        errors.last_name = "Last name must be between 2 and 30 characters";
    }
    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = "*Required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = '*Invalid Email Address'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "*Required"
    }
    if (!Validator.isLength(data.password, {min: 5, max:20})){
        errors.password = "Password must be between 5 and 20 characters";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "*Required"
    }

    if (data.password !== data.password2) {
        errors.password2 = "Passwords must match"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};