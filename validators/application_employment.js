const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateEmploymentInputs(data) {
    let errors = {};

    data.employer = !isEmpty(data.employer) ? data.employer : '';
    data.location = !isEmpty(data.location) ? data.location : '';
    data.reason_for_leaving = !isEmpty(data.reason_for_leaving) ? data.reason_for_leaving : '';
    data.supervisor = !isEmpty(data.supervisor) ? data.supervisor : '';
    data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : '';

    if (Validator.isEmpty(data.employer)) {
        errors.employer = "*Required";
    }
    if (Validator.isEmpty(data.location)) {
        errors.location = "*Required";
    }
    if (Validator.isEmpty(data.reason_for_leaving)) {
        errors.reason_for_leaving = "*Required"
    }
    if (Validator.isEmpty(data.supervisor)) {
        errors.supervisor = "*Required"
    }

    if (!/(^\d{10}$)|(^\d{3}-\d{3}-\d{4}$)|(^\d{1}-\d{3}-\d{3}-\d{4}$)|(^\(\d{3}\)\s\d{3}-\d{4}$)/.test(data.phone_number)) {
        errors.phone_number = 'Please provide a valid phone number';
    }

    if (Validator.isEmpty(data.phone_number)) {
        errors.phone_number = "*Required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};