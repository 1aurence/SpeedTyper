import React, { Component } from 'react'
import './leaderboard.css'
import firebase from '../../firebase-config'
import { isArray } from 'util';
export default class Leaderboard extends Component {
  state = {
    userSearch: '',
  }
  handleChange = (e) => {
    this.setState({ userSearch: e.target.value })
  }
  render() {
    const userList = this.props.users.sort((a, b) => b.highscore - a.highscore).map(user => {
      return (
        <li key={this.props.userKey}>
          <span>User: <span className="user-info">{user.username}</span></span>
          <span>Highscore: <span className="user-info">{user.highscore}</span></span>
        </li>
      )
    })
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
          {userList}
        </ul>
      </div>
    )
  }
}
