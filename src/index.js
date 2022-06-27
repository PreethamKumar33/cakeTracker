const express = require('express');
var bodyParser = require('body-parser');
const multer = require('multer')

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://bpreetham99:ZephyrusM%4020@cluster0.u3oms.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useFindAndModify: false})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});