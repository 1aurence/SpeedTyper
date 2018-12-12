import React from 'react'
import { Link } from 'react-router-dom'
import './login.css'
export default function Login(props) {
  return (
    <div id="login">
      <h1>Enter a name to get started</h1>
      <input
      onChange={props.handleChange}
      placeholder="Enter a name..."
      ></input> 
      <br />
      <button 
        onClick={props.submitUsername}
        className="btn btn-primary">Let's go!</button>
    </div>
  )
}
