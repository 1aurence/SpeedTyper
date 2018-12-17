import React, { Component } from 'react'
import './type.css'
import Leaderboard from '../leaderboard/Leaderboard'
import firebase from '../../firebase-config'
import Button from '@material-ui/core/Button'
import axios from 'axios'

export default class Type extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      inputValue: '',
      currentWord: null,
      timeLeft: 8,
      totalCorrect: -1,
      gameOver: false,
      gameRunning: false,
      currentUser: '',
      userKey: null,
      correctLetters: 0
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
      //Set local storage for user to handle page refresh on game page
      localStorage.setItem('user', userKey);
      let currentUsersKey = localStorage.getItem('user', userKey)
      userRef.child(currentUsersKey)
        .once('value')
        .then(snap => this.setState({ currentUser: snap.val().username }))
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
    // TODO: add random word api 
   axios.get('http://api.wordnik.com/v4/words.json/randomWord?api_key=98198eea1bbc3eef9800e0b79940146163e44155e8ff61f19')
   .then(res => this.setState({currentWord: res.data.word}))
    if (this.state.timeLeft !== 0) {
      this.setState({
        inputValue: '',
        totalCorrect: this.state.totalCorrect + 1,
      })
    }
  }
  gameOver = () => {
    this.setState({
      gameOver: true,
      inputValue: '',
    })
    // Set users highscore
    const { totalCorrect, userKey } = this.state;
    firebase.database().ref(`users/${userKey}`).update({ highscore: totalCorrect })
  }

  resetGame = () => {
    this.setState({
      inputValue: '',
      currentWord: 'actually',
      timeLeft: 8,
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
  render() {
    const { currentWord, inputValue, totalCorrect } = this.state;
    const showCurrentWord = !this.state.gameOver ?
      (<p id="word">{currentWord}</p>) :
      (<p id="word">You scored: {totalCorrect}!</p>);
    return (
      <div className="type-container">
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
