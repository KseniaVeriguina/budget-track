// This is a model for each expense item

// Require mongoose
const mongoose = require('mongoose')

// Create expense schema
const expenseSchema = new mongoose.Schema({
	description: String,
	cost: Number
})

// export expense schema
module.exports = mongoose.model( 'Expense', expenseSchema )