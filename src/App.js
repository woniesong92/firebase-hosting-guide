import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './store'
import { FIREBASE_CONFIG } from './config'

import Home from './components/Home'
import UserSignUpDemo from './components/UserSignUpDemo'
import UploaderDemo from './components/UploaderDemo'
import AllUsersDemo from './components/AllUsersDemo'
import MyFilesDemo from './components/MyFilesDemo'

firebase.initializeApp(FIREBASE_CONFIG)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={UserSignUpDemo} />
            <Route exact path="/uploader" component={UploaderDemo} />
            <Route exact path="/users" component={AllUsersDemo} />
            <Route exact path="/my-files" component={MyFilesDemo} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
