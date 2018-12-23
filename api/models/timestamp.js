// This is a model for timestamp

// Require mongoose
const mongoose = require('mongoose')

// Create timestamp schema
const timestampSchema = new mongoose.Schema({
	timestamp: Number
})

// export timestamp schema
module.exports = mongoose.model( 'Timestamp', timestampSchema )