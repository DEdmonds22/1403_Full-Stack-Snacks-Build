/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const Snack = require('./models/Snack');
const { error } = require('console');

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

app.use('/snacks', require('./controllers/snacks'));

/////////////////////////////////////////////
// Server Listener
/////////////////////////////////////////////
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));