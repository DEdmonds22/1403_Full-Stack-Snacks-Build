/////////////////////////////////////////////
// Our Models
/////////////////////////////////////////////
const mongoose = require('./connection');
const { Schema, model } = mongoose;

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