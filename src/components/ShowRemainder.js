import React from 'react'

const ShowRemainder = props => {
	// It should be getting income state, and expenses array.

	// const { income, expenses } = props // This does not work if I try to pass it into calculetRemainder( income, expenses ).

	// Define calculation function here:
	function calculateRemainder() {
		let income    = props.income;
		let expenses  = props.expenses;
		let remainder = income;

		if ( 0 === expenses.length ) { // Why does it run with empty array 1st time?
			return remainder;
		}
		
		for ( let i = 0; i < expenses.length; i++ ) {
			let current_expense = expenses[ i ];
			remainder = remainder - current_expense.cost;
		}
		console.log( remainder )
		return remainder;
	}

	return (
		
		<div className='ShowRemainder'>
			<h2>Your remainder</h2>
			<div className='RemainderNumber'>
				{ calculateRemainder() }
			</div>
		</div>
	)
}

export default ShowRemainder