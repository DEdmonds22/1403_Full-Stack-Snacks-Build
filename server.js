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
// establish connection:
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnitedTopology: true
});

// events for when connection opens/disconnects/errors
mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', error => console.error(error));