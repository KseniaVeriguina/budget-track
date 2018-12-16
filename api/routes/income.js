const express     = require('express');
const router      = express.Router();
const incomeModel = require('../models/income');

// Get /expenses
router.route('/')
	.get( async ( req, res, next ) => {
		// 1) Get all income in our database
		const docs = await incomeModel.find({})
		try {
			// 2) If successful send todos to user
			res.status( 200 ).send({
				data: docs
			})
		} catch ( e ) {
			// 3) If unsuccessfull, send error through middleware.
			next( e )
		}
	})

// POST /income
router.route('/')
	.post( async ( req, res, next ) => {
		// 1. Get income number from the request body
		const incomeItem = req.body.income
		// 2. Instantiate incomeModel
		// Get all income items from database, this should return an array
		const incomeDbItemsArray = await incomeModel.find({})
		if ( 0 === incomeDbItemsArray.length ) {
			const incomeForDb = new incomeModel({
				income: incomeItem
			})

			// 3. Save it
			try {
				const doc = await incomeForDb.save()
				// 4. Respond with the income
				
				res.status( 201 ).send({
					data: [doc] // even one item is sent as an array.
				})
			} catch (e) {
				// 5. Send error to error handler
				next( e )
			}
		} else {
			// If the item already exists in database, change its income number and save.
			existingIncomeItem = incomeDbItemsArray[0];
			existingIncomeItem.income = incomeItem;
			// 3. Save it
			try {
				const doc = await existingIncomeItem.save()
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