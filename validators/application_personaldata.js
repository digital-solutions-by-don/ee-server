const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validatePersonalDataInputs(data) {
    let errors = {};
    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.address = !isEmpty(data.address) ? data.address : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.state = !isEmpty(data.state) ? data.state : '';
    data.zip_code = !isEmpty(data.zip_code) ? data.zip_code : '';
    data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.position = !isEmpty(data.position) ? data.position : '';
    data.start_pay = !isEmpty(data.start_pay) ? data.start_pay : '';
    data.start_date = !isEmpty(data.start_date) ? data.start_date : '';

    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = '*Required';
    }

    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = '*Required';
    }

    if (Validator.isEmpty(data.address)) {
        errors.address = '*Required';
    }

    if (Validator.isEmpty(data.city)) {
        errors.city = '*Required';
    }

    if (!Validator.isLength(data.state, {min: 2, max: 2})) {
        errors.state = 'Must provide the State Abbreviation'
    }

    if (Validator.isEmpty(data.state)) {
        errors.state = '*Required';
    }

    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(data.zip_code)) {
        errors.zip_code = 'Please provide a valid zipcode';
    }

    if (Validator.isEmpty(data.zip_code)) {
        errors.zip_code = '*Required';
    }

    if (/(^\d{10}$)|(^\d{3}-\d{3}-\d{4}$)|(^\d{1}-\d{3}-\d{3}-\d{4}$)|(^\(\d{3}\)\s\d{3}-\d{4}$)/.test(data.phone_number)) {
        errors.phone_number = 'Please provide a valid phone number';
    }

    if (Validator.isEmpty(data.phone_number)) {
        errors.phone_number = '*Required'
    }

    if (!isEmpty(data.alt_phone_number) && /(^\d{10}$)|(^\d{3}-\d{3}-\d{4}$)|(^\d{1}-\d{3}-\d{3}-\d{4}$)|(^\(\d{3}\)\s\d{3}-\d{4}$)/.test(data.alt_phone_number)) {
        errors.alt_phone_number = 'Please provide a valid phone number';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email address';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = '*Required';
    }

    if (Validator.isEmpty(data.position)) {
        errors.position = '*Required';
    }

    if (Validator.isEmpty(data.start_pay)) {
        errors.start_pay = '*Required';
    }

    if (!data.full_time && !data.part_time && !data.temporary) {
        errors.schedule = 'Please select at least one preference';
    }

    if (!data.weekends && !data.weekdays && !data.evenings && !data.nights) {
        errors.shift = 'Please select at least one preference';
    }

    if (!data.auth_yes && !data.auth_no || data.auth_yes && data.auth_no) {
        errors.auth = 'Please select either yes or no';
    }

    if (!data.under_yes && !data.under_no || data.under_yes && data.under_no) {
        errors.under = 'Please select either yes or no';
    }

    if ((data.under_yes && !data.permit_yes && !data.permit_no) || (data.under_yes && data.permit_yes && data.permit_no)) {
        errors.permit = 'Please select either yes or no';
    }

    if (data.under_no && data.permit_yes || data.permit_no) {
        data.permit_yes = false;
        data.permit_no = false;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};