const express = require('express');
var bodyParser = require('body-parser');
const multer = require('multer')
const cors = require('cors')

const route = require('./routes/route.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://bpreetham99:ZephyrusM%4020@cluster0.u3oms.mongodb.net/Datavid?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, 
    err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
    }
);

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});