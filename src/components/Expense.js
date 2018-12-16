import React from 'react'
// import PropTypes from 'prop-types'

const Expense = props => {
  const { description, cost, id, removeExpense, editExpense, handleItemDescriptionChange, handleItemCostChange } = props
  return (
	<li key={description}>
		{description}
		:
		{cost}
		<button onClick={() => removeExpense( id )}>Remove Expense</button>
		<button onClick={() => editExpense( id )}>Edit Expense</button>
		<div className='expense-edit-fields'>
			<label>Description</label>
			<input type="text" className="expense-description" onChange={handleItemDescriptionChange} />
			<label>Cost</label>
			<input type="text" className="expense-cost" onChange={handleItemCostChange} />
			<button >Save item chages</button>
		</div>
	  
	</li>
  )
}

export default Expense