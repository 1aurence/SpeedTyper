import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { withStyles, createMuiTheme  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const Login = (props) => {
  return (
    <div>
      <div id="login">
        <h1>Enter a name to get started</h1>
        <input
          id="login-input"
          onChange={props.handleChange}
          onKeyDown={props.keyPress}
          placeholder="Enter a name..."
        ></input>
        <br />
        <br />
           <Button 
           onClick={props.submitUsername}
           variant="contained" 
           color="primary">
        Let's Go!
      </Button>
      </div>
      {props.showAlert ? (
        <div class="alert" role="alert">
          <strong>Warning!</strong> Username already in use
</div>
      ) : null
      }

    </div>
  )
}

export default Login

