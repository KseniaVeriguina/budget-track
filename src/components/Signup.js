import React, { Component } from "react";
import axios from 'axios';

class Signup extends Component {
  state = {
    email: "",
    password: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async e => {
    e.preventDefault();
    // 1. Grab email and password from the state
    const { email, password } = this.state
    // 2. POST them to our API
    try {
      const res = await axios.post('/signup', {
        email, password
      })
      this.props.setUser( res.data )
    } catch ( e ) {
      console.log( e )
    }

  }

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              onChange={this.handleChange}
              name="email"
              id="email"
              placeholder="email"
            />
          </div>
          <div>
            <label htmlFor="email">Password: </label>
            <input
              type="password"
              onChange={this.handleChange}
              name="password"
              id="password"
              placeholder="Enter your desired password"
            />
          </div>
          <div>
            <input type="submit" value="Signup" />
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
