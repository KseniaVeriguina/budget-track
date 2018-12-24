import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// Local dependencies
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
// import { getToken } from './services/tokenService';

class BudgetApp extends Component {
	state = {
	  user: null // {} if you add empty object, its a truthie, so it thinks there is a user and you can see the dashboard
	}

	setUser = user => {
	  // Set the current user into state.
	  this.setState({user})
	  console.log( 'set user' );
	};

	render() {
		return (
			<div>
				<Router>
				<div>
				  <Route
				    exact
				    path="/"
				    render={() => (
				      this.state.user ? <Dashboard setUser={this.setUser} /> : <Redirect to="/login" />
				    )}
				  />
				  <Route
				    path="/login"
				    render={() => (
				      this.state.user ?
				        <Redirect to="/" />
				      :
				        <Login setUser={this.setUser} />
				    )}
				  />
				  <Route
				    path="/signup"
				    render={() => (
				      this.state.user ?
				        <Redirect to="/" />
				      :
				        <Signup setUser={this.setUser} />
				    )}
				  />
				</div>
				</Router>
			</div>
		);
	}
}

export default BudgetApp;
