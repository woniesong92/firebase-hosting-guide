import React, { Component } from 'react'
import * as firebase from 'firebase'
import Home from './components/Home'
import UserSignUpDemo from './components/UserSignUpDemo'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { FIREBASE_CONFIG } from './config'

// Initialize firebase
firebase.initializeApp(FIREBASE_CONFIG)

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signup" component={UserSignUpDemo}/>
        </div>
      </Router>
    )
  }
}

export default App
