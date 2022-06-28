const mongoose = require('mongoose')


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObject = function (object) {
    return mongoose.Types.Object.isValid(object)
}

const isValidString = function (value) {
    return Object.prototype.toString.call(value) === "[object String]"
}

const isValidNumber = function (value) {
    return Object.prototype.toString.call(value) === "[object Number]"
}

const isValidDate = function (dateform) {
    // in form dd/mm/yyyy
    let split = dateform.split('/')
    let day = Number(split[0])
    let month = Number(split[1])
    let year = Number(split[2])

    if ( month > 12)
        return false

    if(month <= 0)
        return false

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    if (day > monthLength[month - 1])
        return false

    return true
}

const isValidAge = function (dateForm) {
    var today = new Date();
    let split = dateForm.split('/')
    let date = split[0];
    let month = split[1];
    let year = split[2];

    let tempdate = year + '/' + month + '/' + date

    let birthDate = new Date(tempdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18 ;
}



module.exports = {
    isValid,
    isValidRequestBody,
    isValidObject,
    isValidString,
    isValidNumber,
    isValidDate,
    isValidAge
};