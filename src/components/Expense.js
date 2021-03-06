import React, { Component } from 'react'

	class Expense extends Component {
	// Note: props are passes into this component from ShowExpenses component
	// However can't define them here as a constant, so using them in render
	// directly as this.props.id ... etc.

	state = {
		showEditFields : false,
		editedItem : {
			cost : this.props.cost,
			description : this.props.description
		}
	}

	editExpense = () => {
		this.setState({
			showEditFields : true
		})
	}

	handleSaveEditedItem = () => {
		// Hide the edit fields
		this.setState({
			showEditFields : false
		})
		// Then save this item in db
		this.props.saveEditedItem( this.props.id, this.state.editedItem )
	}

	handleInputChange = (e, property ) => {
		let expense = {};
		if ( 'cost' === property ) {
				expense.description = this.state.editedItem.description;
				expense.cost = e.target.value;
		} else if ( 'description' === property ) {
				expense.description = e.target.value;
				expense.cost = this.state.editedItem.cost;
		}

		this.setState({
			editedItem : expense
		})
	}

	render() {
		return (
			<li key={this.props.id} id={this.props.id}>
				{this.props.description}
				:
				{this.props.cost}
				<button onClick={() => this.props.removeExpense( this.props.id )}>Remove Expense</button>
				<button className='button' onClick={() => this.editExpense()}>Edit Expense</button>
				{ this.state.showEditFields ?
				<div className='edit-fields'>
					<label>Description</label>
					<input type="text" value={this.state.editedItem.description} className="expense-description" onChange={ (e) => this.handleInputChange( e, 'description' ) } />
					<label>Cost</label>
					<input type="text" value={this.state.editedItem.cost} className="expense-cost" onChange={ (e) => this.handleInputChange( e, 'cost' ) } />
					<button onClick={ () => this.handleSaveEditedItem() }>Save item chages</button>
				</div>
				: null }
		  
			</li>
		)
	}

}

export default Expense