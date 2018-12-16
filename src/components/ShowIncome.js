import React from 'react'

const ShowIncome = props => {
	const { income, incomeSave, handleIncomeChange } = props
	return (
		<div className='AddIncome'>
			<label>Income input</label>
			<input type='text' onChange={handleIncomeChange} value={income} />
			<button onClick={incomeSave}>Save income</button>
		</div>
	)
}

export default ShowIncome