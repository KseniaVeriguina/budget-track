'use strict';

const server = require('./api/server');
const { PORT, MONGODB_URI } = require('./api/utils/constants');

// Require mongoose package
const mongoose = require( 'mongoose' );

mongoose
	// Connects to database
	.connect( MONGODB_URI )
	// if successful
	.then(() => {
		// Log this response
		console.log( `Successfully connected to: ${MONGODB_URI}` )
	})
	.catch(err => console.log(err.message))

// Note:
// If you run this file in console and it can't connect to post 27017,
// daemon is not running
// open new console window and run mongod

// If you are 'Successfully connected' in the console, click Control C to disconnect, then
// node app.js
// It will log the 'doc' object from seeds function
// If you look at the logged object, there is 'id' and '__v' keys that we did not add
// That's something is added automatically - id is unique identifier for this object
// __v is version

server.listen(PORT, () => console.log(`App listening on port ${PORT}`));


