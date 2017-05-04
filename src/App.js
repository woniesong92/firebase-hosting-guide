import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './store'
import Home from './components/Home'
import UserSignUpDemo from './components/UserSignUpDemo'
import { FIREBASE_CONFIG } from './config'

// Initialize firebase
firebase.initializeApp(FIREBASE_CONFIG)


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signup" component={UserSignUpDemo}/>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
