const mongoose = require('mongoose')
const { validator } = require('../utils')
const employeeDataSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'First Name of Employee is required',
        Comment: 'Holds First Name of the Employee'
    },
    lastName: {
        type: String,
        required: 'Last Name of Employee is Required',
        Comment: 'Holds Last Name of the Employee'
    },
    birthDate: {
        type: String,
        required: 'birthDate of Employee is required',
        Comment: 'Holds birth date of the Employee',
    },
    country: {
        type: String,
        required: 'country of Employee is Required',
        Comment: 'Holds country of employee'
    },
    city: {
        type: String,
        required: 'city of Employee is Required',
        Comment: 'Holds city of employee'
    }
}, { timestamps: true })
module.exports = mongoose.model('EmployeeData', employeeDataSchema, 'employeedata')