// This is a model for each expense item

// Require mongoose
const mongoose = require('mongoose')

// Create expense schema
const incomeSchema = new mongoose.Schema({
	income: Number
})

// export expense schema
module.exports = mongoose.model( 'Income', incomeSchema )