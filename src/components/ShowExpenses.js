import React from 'react'
import Expense from './Expense' 

const ShowExpenses = props => {
	const { expenses, removeExpense, editExpense, handleItemDescriptionChange, handleItemCostChange, saveEditedItem } = props
	return (
		<div>
		<h2>Your expenses</h2>
			<ul className='ShowExpenses'>
			{expenses.map((expense, i) => (
				<Expense
					saveEditedItem={saveEditedItem}
					handleItemCostChange={handleItemCostChange}
					handleItemDescriptionChange={handleItemDescriptionChange}
					removeExpense={removeExpense}
					editExpense={editExpense}
					description={expense.description}
					cost={expense.cost}
					id={expense._id}
					key={expense._id}
				/>
			))}
			</ul>
		</div>

	)
}

export default ShowExpenses