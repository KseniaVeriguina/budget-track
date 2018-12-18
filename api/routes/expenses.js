const express      = require( 'express' );
const router       = express.Router();
const expenseModel = require( '../models/expense' );

// GET /expenses
router.route('/')
	.get( async ( req, res, next ) => {
		// 1) Get all expenses in our database
		const docs = await expenseModel.find({})
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

// POST /expenses
router.route('/')
	.post( async ( req, res, next ) => {
		// 1. Grab the new expense item from the request body
		const expenseItem = req.body.expense
		// 2. Instantiate expenseModel
		const expenseForDb = new expenseModel({
			description: expenseItem.description,
			cost: expenseItem.cost
		})
		// 3. Save it
		try {
			const doc = await expenseForDb.save()
			// 4. Respond with the created expense
			res.status( 201 ).send({
				data: [doc] // even one item is sent as an array.
			})
		} catch (e) {
			// 5. Send error to error handler
			next( e )
		}

	})

// DELETE /expenses/{id}
router.route('/:id') // url is based on id now, not index.
	.delete( async ( req, res, next ) => {
		// 1. Grab the expense object id from the url params.
		const { id } = req.params

		try {
			// 2. Find the matching expense in database by id and remove it.
			const doc = await expenseModel.findByIdAndRemove({
				_id: id
			})
			// 3. Respond with the updated list of expenses
			res.status( 202 ).send( {
			  data: [doc] // Send over just the deleted expense.
			} )
		} catch ( e ) {
			// 4. Send error to error handler
			next( e )
		}

	})

// PATCH /expenses/{id}
router.route('/:id')
	.patch( async (req, res, next) => {
		// 1. Grab the expense id from the url params.
		// this is the same as writing id = req.params.id
		const { id } = req.params
		// 2. Grab the new expense item from the request body
		const expenseItem = req.body.expense

		try {
			// 3. Find an item in database with matching ID.
			const expenseInDb = await expenseModel.findById( id )
			// 4. change that items description and cost.
			expenseInDb.cost        = expenseItem.cost
			expenseInDb.description = expenseItem.description
			// 5. save the item again.
			const doc = await expenseInDb.save()
			// 6. send back response - updated item.
			res.status( 201 ).send({
				data: [doc] // even one item is sent as an array.
			})
		} catch (e) {
			// 7. Send error to error handler
			next( e )
		}

	})

exports.router = router