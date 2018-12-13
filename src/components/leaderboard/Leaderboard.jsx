import React, { Component } from 'react'
import './leaderboard.css'
import firebase from '../../firebase-config'
import { isArray } from 'util';
export default class Leaderboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userSearch: '',
      leaderboardUsers: [],
      filteredUsers: []
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = (e) => {
    this.setState({userSearch: e.target.value})
  }
  // Method that listens for user input and filters the leaderboard array accordingly
  filterUsers = () => {
    if (this.state.userSearch === '') {
      return this.leaderboardUsers
    } else {
      let localFilteredUsers = this.leaderboardUsers.filter((user) => {
        if (user.username !== undefined) {
          return user.username.toString().toLowerCase().includes(this.state.userSearch.toString().toLowerCase())
        }
        return false
        })
      return localFilteredUsers    
    }
  }
  render() {
    this.leaderboardUsers = this.props.users.sort((a,b) => b.highscore - a.highscore)
    this.filteredUsers = this.filterUsers()
    return (
      <div id="leaderboard">
        <nav>
          <h1>Leaderboard</h1>
          <input
            onChange={this.handleChange}
            value={this.state.userSearch}
            id="leaderboard-input" placeholder="Search for user..." />
        </nav>
        <ul>
          {this.filteredUsers.map(user => {
            return (
            <li key={user.userKey}> 
              <span>User: <span className="user-info">{user.username}</span></span>
              <span>Highscore: <span className="user-info">{user.highscore}</span></span>
            </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
