import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'


const Login = (props) => {
  return (
    <div>
      <div id="login">
        <h1>Enter a name to get started</h1>
        <input
          onChange={props.handleChange}
          onKeyDown={props.keyPress}
          placeholder="Enter a name..."
        ></input>
        <br />
        <button
          onClick={props.submitUsername}
          className="btn btn-primary">Let's go!</button>
      </div>
      {props.showAlert ? (
        <div class="alert alert-warning" role="alert">
          <strong>Warning!</strong> Username already in use
</div>
      ) : null
      }

    </div>
  )
}

export default Login

