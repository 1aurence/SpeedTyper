import React, { Component } from 'react'
import './leaderboard.css'
import firebase from '../../firebase-config'
import { isArray } from 'util';
export default class Leaderboard extends Component {
  state = {
    userSearch: ''
  }
  handleChange = (e) => {
    this.setState({userSearch: e.target.value})
  }
  render() {
    // const filteredList = this.props.users.filter(user => {
    //   if(user.username === this.state.userSearch) {
    //     return (<li> <span>User: <span className="user-info">{user.username}</span> 
    //     </span> <span>Highscore: <span className="user-info">{user.highscore}</span></span></li>) 

    //   }
    // })
     const userList = this.props.users.map(user => {
      return (<li> <span>User: <span className="user-info">{user.username}</span> 
      </span> <span>Highscore: <span className="user-info">{user.highscore}</span></span></li>)
      
  }) 
    return (
      <div id="leaderboard">
      <nav>   
        <h1>Leaderboard</h1>
        <input 
        onChange={this.handleChange}
        value={this.state.userSearch}
        id="leaderboard-input"placeholder="Search for user..."/>
        </nav>
        <ul>
          {userList}
        </ul>
      </div>
    )
  }
}
