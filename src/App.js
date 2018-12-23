import React, { Component } from 'react';
import './App.css';
import ShowExpenses from './components/ShowExpenses';
import AddExpense from './components/AddExpense';
import ShowIncome from './components/ShowIncome';
import ShowRemainder from './components/ShowRemainder';
import SaveTimestamp from './components/SaveTimestamp';
import axios from 'axios';

class BudgetApp extends Component {
	state = {
		income: 0, // Number
		expense: {
			description: '',
			cost: 0
		},
		expenses: [], // Array of expenses.
		timestamp: 0
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
		console.log( 'refreshing' );
		try {
			// 1. GET /expenses to get all expenses
			const response = await axios.get( '/expenses' ) // any code after this will have to wait until this line is exacuted, when using await
			const expenses = response.data.data;
			this.setState( { expenses } ) // Syntactical sugar to set expenses: expenses
			const response2 = await axios.get( '/income' ) // any code after this will have to wait until this line is exacuted, when using await
			const income    = response2.data.data[0].income;
			this.setState( { income } )
			const response3 = await axios.get( '/timestamp' )
			const timestamp = response3.data.data[0].timestamp;
			this.setState( { timestamp } )
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

	// This may need to be moved to Expense.
	saveEditedItem = async (id, expense ) => {
		try {
			await axios.patch(`/expenses/${id}`, {
				expense: expense
			});
			this.refresh();
		} catch ( e ) {
			console.log( e ) 
		}
	}

	removeExpense = async id => {
		try {
			await axios.delete( `/expenses/${id}` );
			this.refresh();
		} catch ( e ) {
			console.log( e )
		}
	  
	}

	// Income-related functions start.
	handleIncomeChange = e => {
		this.setState({
			income: e.target.value
		})
	}

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

	// Record the timestamp and save it in app state.
	setTimeStamp = async () => {
		// Get current timestamp
		let currentTimestamp = new Date().getTime();
		// Convert timestamp to seconds
		currentTimestamp = Math.round( currentTimestamp / 1000 );
		// Then add 30 days to it
		const thirtyDays = 60 * 60 * 24 * 30;
		// Add 30 days to current timestamp.
		let thiryDaysFromNow = currentTimestamp + thirtyDays;
		// Then make a post request to record it.
		try {
			await axios.post('/timestamp', {
				timestamp: thiryDaysFromNow
			})
			this.refresh();
		} catch ( e ) {
			console.log( e )
		}
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
				/>
				<SaveTimestamp
					setTimeStamp={this.setTimeStamp}
				/>
				<ShowRemainder
					income={this.state.income}
					expenses={this.state.expenses}
					timestamp={this.state.timestamp}
				/>
			</div>
		);
	}
}

export default BudgetApp;
