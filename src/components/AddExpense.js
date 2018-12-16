import React from 'react'

const AddExpense = props => {
  const { handleDescriptionChange, handleCostChange, addExpense, expense } = props
  return (
    <div className='AddExpense'>
    	<h2>Add an expense</h2>
    	<input onChange={handleDescriptionChange} value={expense.description} placeholder='Name'/>
    	<input onChange={handleCostChange} value={expense.cost} placeholder='Cost' />
    	<button onClick={addExpense}>Add Expense</button>
    </div>
  )
}

export default AddExpense