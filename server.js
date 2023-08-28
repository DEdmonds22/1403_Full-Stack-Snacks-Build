/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const Snack = require('./models/Snack');
const { error } = require('console');

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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

/////////////////////////////////////////////
// Seed Route
/////////////////////////////////////////////
app.get('/snacks/seed', (req, res) => {
    // array of starter snacks
    const starterSnacks = [
        {name: "Chips", cost: 3.99, calories: 200},
        {name: "Cookies", cost: 4.99, calories: 1000},
        {name: "Chocolate", cost: 3.99, calories: 400},
        {name: "Nuts", cost: 2.99, calories: 500}
    ];

    // delete all snacks
    Snack.deleteMany({})
    .then(date => {
        Snack.create(starterSnacks)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(error => {
                res.status(400).json(error)
            });
    })
    .catch(error => {
        res.status(400).json(error);
    });
});

/////////////////////////////////////////////
// Server Listener
/////////////////////////////////////////////
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));