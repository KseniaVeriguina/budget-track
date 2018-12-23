const express        = require('express');
const router         = express.Router();
const timestampModel = require('../models/timestamp');

// GET /timestamp
router.route( '/' )
	.get( async ( req, res, next ) => {
		// 1) Get all timestamp in our database
		const docs = await timestampModel.find({})
		try {
			// 2) If successful send timestamp back
			res.status( 200 ).send({
				data: docs
			})
		} catch ( e ) {
			// 3) If unsuccessfull, send error through middleware.
			next( e )
		}
	} )
// POST /timestamp
router.route('/')
	.post( async ( req, res, next ) => {
		// 1. Get timestamp number from the request body
		const timestampItem = req.body.timestamp
		// 2. Instantiate incomeModel
		// Get all timestamp items from database, this should return an array
		const timestampDbItemsArray = await timestampModel.find({})
		if ( 0 === timestampDbItemsArray.length ) {
			const timestampForDb = new timestampModel({
				timestamp: timestampItem
			})

			// 3. Save it
			try {
				const doc = await timestampForDb.save()
				// 4. Respond with the timestamp
				
				res.status( 201 ).send({
					data: [doc] // even one item is sent as an array.
				})
			} catch (e) {
				// 5. Send error to error handler
				next( e )
			}
		} else {
			// If the item already exists in database, change its timestamp number and save.
			existingTimestampItem = timestampDbItemsArray[0];
			existingTimestampItem.timestamp = timestampItem;
			// 3. Save it
			try {
				const doc = await existingTimestampItem.save()
				// 4. Respond with the income
				
				res.status( 201 ).send({
					data: [doc] // even one item is sent as an array.
				})
			} catch (e) {
				// 5. Send error to error handler
				next( e )
			}
		}

	})

exports.router = router