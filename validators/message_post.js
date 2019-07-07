const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateMessageInputs(data) {
    let errors={};

    data.message_subject = !isEmpty(data.message_subject) ? data.message_subject : '';
    data.message_body = !isEmpty(data.message_body) ? data.message_body : '';

    if (Validator.isEmpty(data.message_subject)) {
        errors.message_subject = "*Required";
    }

    if (Validator.isEmpty(data.message_body)) {
        errors.message_body = "*Required";
    }

    if (data.message_body.length > 254) {
        errors.message_body = "Message can't be more than 255 characters"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};