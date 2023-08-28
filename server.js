/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnitedTopology: true
});

mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', error => console.error(error));

////////////////////////////////////////////////////////////////
// Create our Express Application Object
///////////////////////////////////////////////////////////////
const app = express();
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx');

/////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////
app.use(morgan('tiny')); // logging
app.use(methodOverride('_method')); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true }));    // parse urlencoded request bodies (ie. req.body)
app.use(express.static("public"));  // serve files public statically