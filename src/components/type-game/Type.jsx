import React, { Component } from 'react'
import './type.css'
import Leaderboard from '../leaderboard/Leaderboard'
import firebase from '../../firebase-config'
import Button from '@material-ui/core/Button';

export default class Type extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [
        "able",
        "about",
        "above",
        "accept",
        "according",
        'account',
        "across",
        'act',
        'action',
        'activity',
        "actually",
        'add'
      ],
      users: [],
      inputValue: '',
      currentWord: 'actually',
      timeLeft: 3,
      totalCorrect: -1,
      gameOver: false,
      gameRunning: false,
      listIndex: 0,
      currentUser: '',
      userKey: null
    };
  }
  componentWillMount() {
    //Update user list
    let userRef = firebase.database().ref("users")
    let userList = []
    userRef.on('value', snap => {
      let users = snap.val()
      let keys = Object.keys(users)
      let userKey = keys[keys.length - 1]
      //Set local storage for user
      localStorage.setItem('user', userKey);
      let currentUsersKey = localStorage.getItem('user', userKey)
      userRef.child(currentUsersKey)
      .once('value')
      .then(snap => this.setState({currentUser: snap.val().username}))
      snap.forEach(childNodes => {
        let username = childNodes.val().username
        let highscore = childNodes.val().highscore
        userList.push({ username, highscore, userKey })
        this.setState({
          users: userList,
          userKey
        })
      })
    })
  }

  componentDidMount() {
    this.requestNewWord()
  }

  requestNewWord = () => {
    let index = this.state.listIndex;
    this.setState({
      listIndex: this.state.listIndex + 1
    })
    if (this.state.timeLeft !== 0) {
      this.setState({
        inputValue: '',
        totalCorrect: this.state.totalCorrect + 1,
        currentWord: this.state.words[index]
      })
    }

  }

  gameOver = () => {
    this.setState({
      gameOver: true,
      inputValue: '',
    })
    const { totalCorrect, userKey } = this.state;
   firebase.database().ref(`users/${userKey}`).update({highscore: totalCorrect})
  }

  resetGame = () => {
    this.setState({
      inputValue: '',
      currentWord: 'actually',
      timeLeft: 3,
      totalCorrect: 0,
      gameOver: false,
      gameRunning: false,
      listIndex: 0,
    })
  }

  startTimer = () => {
    setInterval(() => {
      if (this.state.timeLeft === 0) {
        return this.gameOver()
      }
      this.setState({
        timeLeft: this.state.timeLeft - 1
      })
    }, 1000)
  }

  updateInputValue = (e) => {
    if (!this.state.gameRunning) {
      this.setState({
        gameRunning: true
      })
      this.startTimer()
    }
    else if (this.state.inputValue === this.state.currentWord) {
      this.requestNewWord();
    } else {
      this.setState({
        inputValue: e.target.value
      })
    }
  }
  render() {    const { currentWord, inputValue, totalCorrect } = this.state;
    const showCurrentWord = !this.state.gameOver ?
      (<p id="word">{currentWord}</p>) :
      (<p id="word">You scored: {totalCorrect}!</p>);
    return (
      <div className="type-container container-fluid">
        <h4>Hello, <strong>{this.state.currentUser}</strong></h4>
        <h3>Type The Given Word Within <span id="counter">{this.state.timeLeft}</span> seconds</h3>
        {showCurrentWord}
        <input
          id="game-input"
          value={this.state.inputValue}
          onChange={this.updateInputValue}
          placeholder="Start typing..."
        />
        <br />
        <br />
        {this.state.gameOver ? (      
          <Button 
          variant="contained" 
          color="default" 
          onClick={this.resetGame}>Play again?</Button>
        ) : null}
        <div className="instructions">
          <h3>Instructions</h3>
          <p>Type each word in the
          given amount of seconds to score. To play again,
          just type the current word. Your score will reset</p>
        </div>
        <Leaderboard users={this.state.users} />
      </div>
    )
  }
}
