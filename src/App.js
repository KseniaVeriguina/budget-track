import React, { Component } from 'react';
import './App.css';
import ShowExpenses from './components/ShowExpenses';
import AddExpense from './components/AddExpense';
import ShowIncome from './components/ShowIncome';
import ShowRemainder from './components/ShowRemainder';
import axios from 'axios';

class BudgetApp extends Component {
	state = {
		income: 0, // Number
		expense: {
			description: '',
			cost: 0
		},
		expenses: [] // Array of expenses.
	}

	async componentDidMount() {
		this.refresh()
	}

	// Functions for adding/removing a single component

	clearInput = () => {
		let expense = {
			description : '',
			cost: 0
		}
		this.setState({
			expense: expense
		})
	}

	refresh = async () => {
		try {
			// 1. GET /expenses to get all expenses
			const response = await axios.get( '/expenses' ) // any code after this will have to wait until this line is exacuted, when using await
			const expenses = response.data.data;
			this.setState( { expenses } ) // Syntactical sugar to set expenses: expenses
			const response2 = await axios.get( '/income' ) // any code after this will have to wait until this line is exacuted, when using await
			const income    = response2.data.data[0].income;
			this.setState( { income } )
		} catch ( e ) {
			console.log( e );
		}
	}

	addExpense = async () => {
		try {
			await axios.post('/expenses', {
				expense: this.state.expense
			})
			this.refresh();
		} catch ( e ) {
			console.log( e )
		}

		this.clearInput();
	}

	removeExpense = async id => {
		try {
			await axios.delete( `/expenses/${id}` );
			this.refresh();
		} catch ( e ) {
			console.log( e )
		}
	  
	}

	handleDescriptionChange = e => {
		let expense = {
			'description' : e.target.value,
			'cost' : this.state.expense.cost,
		}
		this.setState({
			expense: expense
		})
	}

	handleCostChange = e => {
		let expense = {
			'description' : this.state.expense.description,
			'cost' : e.target.value,
		}
		this.setState({
			expense: expense
		})
	}

	// Functions for editing single expense cost or description

	handleItemDescriptionChange = e => {
		console.log( 'item description change' )
		let expense = {
			'description' : e.target.value,
			'cost' : this.state.expense.cost,
		}
		this.setState({
			expense: expense
		})
	}

	handleItemCostChange = e => {
		console.log( 'item cost change' )
		let expense = {
			'description' : this.state.expense.description,
			'cost' : e.target.value,
		}
		this.setState({
			expense: expense
		})
	}

	editExpense = id => {
		// This function will only be making edit fields visible.
		console.log( 'clicked Edit expense' );

	}

	saveEditedItem = async id => {
		console.log( 'clicked Save Edited Item' )
		try {
			await axios.patch(`/expenses/${id}`, {
				expense: this.state.expense
			});
			this.refresh();
		} catch ( e ) {
			console.log( e ) 
		}
	}

	// Income-related functions start.
	incomeSave = async () => {
		try {
			await axios.post('/income', {
				income: this.state.income
			})
			this.refresh();
		} catch ( e ) {
			console.log( e )
		}
	}

	handleIncomeChange = e => {
		this.setState({
			income: e.target.value
		})
	}

	render() {
		return (
			<div>
				<ShowIncome
					handleIncomeChange={this.handleIncomeChange}
					incomeSave={this.incomeSave}
					income={this.state.income}
				/>
				<AddExpense
					handleDescriptionChange={this.handleDescriptionChange}
					handleCostChange={this.handleCostChange}
					addExpense={this.addExpense}
					expense={this.state.expense}
				/>
				<ShowExpenses
					saveEditedItem={this.saveEditedItem}
					handleItemDescriptionChange={this.handleItemDescriptionChange}
					handleItemCostChange={this.handleItemCostChange}
					expenses={this.state.expenses}
					removeExpense={this.removeExpense}
					editExpense={this.editExpense}
				/>
				<ShowRemainder
					income={this.state.income}
					expenses={this.state.expenses}
				/>
			</div>
		);
	}
}

export default BudgetApp;
