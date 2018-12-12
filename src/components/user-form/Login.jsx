import React, { Component } from 'react'
import './login.css'
import { Link } from 'react-router-dom'

export default class Login extends Component {
  render() {
    return (
      <div>
           <div id="login">
      <h1>Enter a name to get started</h1>
      <input
      onChange={this.props.handleChange}
      placeholder="Enter a name..."
      ></input> 
      <br />
      <button 
        onClick={this.props.submitUsername}
        className="btn btn-primary">Let's go!</button>
    </div>
    {this.props.showAlert ? (
 <div class="alert alert-warning" role="alert">
 <strong>Warning!</strong> Username already in use
</div>
    ) : null
  }
   
      </div>
    )
  }
}
