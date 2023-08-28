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
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send("Your server is running... better catch it.");
});