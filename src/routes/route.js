const express = require('express');

const router = express.Router();

const cakeTrackerController = require('../controllers/cakeTrackerController')

router.post('/adddetails', cakeTrackerController.createEntry);

router.get('/getdetails', cakeTrackerController.getData);


module.exports = router;