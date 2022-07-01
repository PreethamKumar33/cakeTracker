const mongoose = require('mongoose');

const express = require("express");

const employeeDataModel = require('../models/employeeDataModel');

const { validator } = require('../utils')



const createEntry = async function (req, res) {
    try {
        const requestBody = req.body;
        // Checks if the data in body is present.
        if (!validator.isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide details' })
            return
        }
        let { firstName, lastName, birthDate, country, city } = requestBody;
        // Checks if the required details in body is present.
        if (!validator.isValid(firstName)) {
            res.status(400).send({ status: false, message: 'firstName is required' })
            return
        }
        if (!validator.isValid(lastName)) {
            res.status(400).send({ status: false, message: 'lastName is required' })
            return
        }
        if (!validator.isValid(birthDate)) {
            res.status(400).send({ status: false, message: 'birthDate is required' })
            return
        }
        if (!validator.isValid(country)) {
            res.status(400).send({ status: false, message: 'country is required' })
            return
        }
        if (!validator.isValid(city)) {
            res.status(400).send({ status: false, message: 'city is required' })
            return
        }
        // Checks if the details are similar to assigned types.
        if (!validator.isValidString(firstName)) {
            res.status(400).send({ status: false, message: `${firstName} should be a string` })
        }
        if (!validator.isValidString(lastName)) {
            res.status(400).send({ status: false, message: `${lastName} should be a string` })
        }
        if (!validator.isValidDate(birthDate)) {
            res.status(400).send({ status: false, message: `${birthDate} is not a valid Date` })
            return
        }
        if (!validator.isValidAge(birthDate)) {
            res.status(400).send({ status: false, message: `Employee is under 18` })
            return
        }
        if (!validator.isValidString(country)) {
            res.status(400).send({ status: false, message: `${country} is not a valid Country` })
            return
        }

        if (country == "Select Option") {
            res.status(400).send({ status: false, message: `Please Select a Country` })
            return
        }

        if (!validator.isValidString(city)) {
            res.status(400).send({ status: false, message: `${city} should be a string` })
            return
        }
        // Checks if there is some similar data in database
        let employee = await employeeDataModel.findOne({firstName, lastName, country, city})
        if(validator.isValid(employee)){
            res.status(400).send({ status: false, message: `An Employee already exists` })
            return
        }

        const employeeData = {
            firstName,
            lastName,
            birthDate,
            country,
            city
        }
        const newEmployee = await employeeDataModel.create(employeeData)
        res.status(201).send({ status: true, message: 'Employee Details added successfully', data: newEmployee })
    }
    catch (error) {
    console.log(error)
    res.status(500).send({ status: false, message: error.message });
    }
}
const getData = async function (req, res) {
    try{
        const employeeData = await employeeDataModel.find();
        res.status(201).send({ status: true, employeeData})
    }
    catch(error){
        console.log(error)
        res.status(500).send({ status: false, message: error.message });
    }
}
module.exports = {
    createEntry,
    getData
}