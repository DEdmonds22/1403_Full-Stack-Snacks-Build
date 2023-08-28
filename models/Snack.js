/////////////////////////////////////////////
// Our Models
/////////////////////////////////////////////
// pull schema and model from mongoose using object destructuring
const { Schema, model } = require('mongoose');

// make snack schema
const snackSchema = new Schema({
    name: String,
    cost: Number,
    calories: Number
});

// make snack model
const Snack = model('Snack', snackSchema)

// export model
module.exports = Snack;