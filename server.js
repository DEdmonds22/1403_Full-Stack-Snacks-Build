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


// INDUCES
// Index
app.get('/snacks', (req, res) => {
    Snack.find({})
        .then(foundSnacks => {
            res.render('snacks/Index', {snacks: foundSnacks});
        })
        .catch(error => res.status(400).json({ error }));
});

// New
app.get("/snacks/new", (req, res) => {
    res.render("snacks/new");
});

// Destroy / Delete
app.delete("/snacks/:id", (req, res) => {
    const id = req.params.id;

    Snack.deleteOne({_id: id})
        .then((data) => res.redirect("/snacks"))
        .catch(error => res.status(400).json({ error }));
});

// Update
app.put('/snacks/:id', (req, res) => {
    const id = req.params.id
    req.body.cost = parseFloat(req.body.cost);

    Snack.updateOne({ _id: id }, req.body, { new: true })
        .then(data => res.redirect('/snacks'))
        .catch(error => res.status(400).json({ error }));
});

// Create
app.post('/snacks', (req, res) => {
    req.body.cost = parseFloat(req.body.cost);
    Snack.create(req.body)
        .then(data => res.redirect('/snacks'))
        .catch(error => res.status(400).json({ error }));
});

// Edit
app.get('/snacks/:id/edit', (req, res) => {
    const id = req.params.id;

    Snack.findOne({ _id: id })
        .then(foundSnack => {
            res.render('snacks/Edit', { snack: foundSnack });
        })
        .catch(error => res.status(400).json({ error }));
});

// Show
app.get("/snacks/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;

    // find the particular snack from the database
    Snack.findOne({_id: id})
        .then((foundSnack) => {
        // render the template with the data from the database
        res.render("snacks/Show", { snack: foundSnack });
        })
        .catch(error => res.status(400).json({ error }));
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
        .then(data => {
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