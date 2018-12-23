import React from 'react'

const ShowRemainder = props => {
	let { income, expenses, timestamp } = props;

	// Define calculation function here:
	function calculateRemainder() {
		let remainder = income;

		if ( 0 === expenses.length ) { // Why does it run with empty array 1st time?
			return remainder;
		}
		
		for ( let i = 0; i < expenses.length; i++ ) {
			let current_expense = expenses[ i ];
			remainder = remainder - current_expense.cost;
		}

		return remainder;
	}

	function calculateDaysRemaining() {
		// Get current timestamp
		let currentTimestamp = new Date().getTime();
		// Convert timestamp to seconds
		currentTimestamp = Math.round( currentTimestamp / 1000 );

		let secondsLeft  = timestamp - currentTimestamp;
		let daysLeft     = secondsLeft / 60 / 60 / 24;
		let daysLeftText = 1 > daysLeft ? 'Less than 1 day left' : `${Math.round( daysLeft )} days left`;

		return daysLeftText;
	}

	return (
		
		<div className='ShowRemainder'>
			<h2>Your remainder</h2>
			<div className='RemainderNumber'>
				{ calculateRemainder() }
			</div>
			<h2>Countdown</h2>
			<div>
				{ calculateDaysRemaining() }
			</div>
		</div>
	)
}

export default ShowRemainder