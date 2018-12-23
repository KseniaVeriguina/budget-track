// This is a model for income item

// Require mongoose
const mongoose = require('mongoose')

// Create income schema
const incomeSchema = new mongoose.Schema({
	income: Number
})

// export income schema
module.exports = mongoose.model( 'Income', incomeSchema )