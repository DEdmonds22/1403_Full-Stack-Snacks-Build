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
// setup inputs for our connect function:
const MONGO_URI = process.env.MONGO_URI;    /* Used in combination with line 4, this line accesses the ENV variables; "process.env" is an object in Node.js that holds various ENV variables; By appending "MONGO_URI" to the end of it, we're specifically accessing the ENV variable named MONGO_URI. */
const CONFIG = {    /* this contains the configuration options for establishing a connection to the MongoDB database using Mongoose; also handles any deprecated features or changes in behavior in MongooseDB and Mongoose.*/
    useNewUrlParser: true,  /* tells Mongoose to use the new URL parser when connecting to the MongoDB server; important for hadling modern connection string in MongoDB. */
    useUnitedTopology: true /* enables the new unified topology engine in Mongoose, which is used for server discovery and monitoring; helps to ensure a reliable and stable connection. */
};

// establish connection:
mongoose.connect(MONGO_URI, CONFIG);    /* "MONGO_URI" serves as the connection string; the "CONFIG" object provides the configuration options for the connect. */

// events for when connection opens/disconnects/errors
mongoose.connection /* not neccessary, mainly serves as a debugger helper */
    .on('open', () => console.log('Connected to Mongoose')) /* console.logs when the connection to the MongoDB database is successfully established */
    .on('close', () => console.log('Disconnected from Mongoose'))   /* console.logs when the connection to the MongoDB database is closed */
    .on('error', error => console.error(error));    /* console.logs when an error occurs during the database connection proccess */