const Expense = require( './api/models/expense' )

const fancyCar = new Expense({
	description: 'Huyndai',
	cost: 100
})

module.exports = async () => {
	try {
		// Remove all existing students from the database
		await Expense.remove({})
		const doc = await fancyCar.save()
		// Log the object
		console.log( doc )
	} catch (e) {
		// Log the error
		console.log( e )
	}
}
