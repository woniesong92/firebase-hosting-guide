import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import * as Actions from './actions'
import './user-sign-up-demo.css'

class UserSignUpDemo extends Component {
  constructor(props) {
    super(props)

    // NOTE: use internal state when this is ONLY used in this specific component (i.e. UI changes)
    // for anything that's related to DATA, use global redux store
    this.state = {
      isSignUp: true,
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    // NOTE: this is how you check whether the user just signed up/in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const { email, uid } = user

        this.props.dispatch(Actions.signIn({
          email,
          uid,
        }))
      } else {
        this.props.dispatch(Actions.signOut())
      }
    }.bind(this))
  }

  onToggleSignUp = (event) => {
    event.preventDefault()

    // NOTE: this is a good example of using a local state instead of global store
    this.setState({
      isSignUp: !this.state.isSignUp,
    })
  }

  onSignUp = (event) => {
    event.preventDefault()
    const { email, password } = this.state

    // NOTE: this is how you create a user on firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      const { uid, email} = user

      // Store this user into our firebase DB
      // User authentication and DB are separate on Firebase, so it's necessary
      // to store a user object into DB explicitly one more time
      firebase.database().ref('users/' + uid).set({
        email
      })

      // Store this user object into our global store
      this.props.dispatch(Actions.signIn({
        email,
        uid,
      }))
    })
    .catch(error => {
      console.log(error)
    })
  }

  onSignIn = (event) => {
    event.preventDefault()
    const { email, password } = this.state

    // NOTE: this is how you login a user from firebase
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error)
    })
  }

  onSignOut = () => {
    firebase.auth().signOut().catch(function(error) {
      console.log("failed to signout")
    })
  }

  onFieldChange = (field, event) => {
    // TODO: use redux-form
    this.setState({
      [field]: event.target.value,
    })
  }

  render() {
    // Explicitly deconstruct props and states that are going to be used
    const { currentUser } = this.props
    const { isSignUp, email, password } = this.state

    if (currentUser) {
      return (
        <div>
          <h1>Welcome! {currentUser.email} </h1>
          <ul>
            <li><a href='#' onClick={this.onSignOut}>Sign Out</a></li>
            <li><Link to="/uploader">Uploader</Link></li>
            <li><Link to="/users">All Users</Link></li>
            <li><Link to="/">Home</Link></li>
          </ul>
        </div>
      )
    }

    return (
      <div className="user-sign-up-demo">
        <h1>UserSignUpDemo</h1>

        { isSignUp ?
          (<div className="user-sign-up-demo__signup">
            <h5>Sign Up!</h5>
            <form className="user-sign-up-demo__signup"
              onSubmit={this.onSignUp}
            >
              <div>
                <label>Email</label>
                <input type="email"
                       placeholder="email" 
                       onChange={this.onFieldChange.bind(this, 'email')}
                       value={email}
                />
              </div>
              <div>
                <label>Password</label>
                <input type="password"
                       placeholder="password"
                       onChange={this.onFieldChange.bind(this, 'password')}
                       value={password}
                />
              </div>
              <button type="submit">Sign Up</button>
            </form>

            <a href="" onClick={this.onToggleSignUp}>Already have an account?</a>
          </div>) :
          (<div className="user-sign-up-demo__signin">
            <h5>Sign In</h5>
            <form className="user-sign-up-demo__signup"
              onSubmit={this.onSignIn}
            >
              <div>
                <label>Email</label>
                <input type="email"
                       placeholder="email" 
                       onChange={this.onFieldChange.bind(this, 'email')}
                       value={email}
                />
              </div>
              <div>
                <label>Password</label>
                <input type="password"
                       placeholder="password" 
                       onChange={this.onFieldChange.bind(this, 'password')}
                       value={password}
                />
              </div>
              <button type="submit">Login</button>
            </form>
            <a href="" onClick={this.onToggleSignUp}>Don't have an account?</a>
          </div>)
        }
      </div>
    )
  }
}

// NOTE: "state" is the global state (i.e. global store's state)
// NOTE: state.UserSignUpDemo is the state from ./reducer
const mapStateToProps = (state, ownProps) => {
  // 1. only select some states to use
  return {
    currentUser: state.UserSignUpDemo.currentUser,
  }

  // Or 2. select the entire state in ./reducer
  // return state.UserSignUpDemo
}

export default connect(
  mapStateToProps,
  null // NOTE: to fire actions for redux store, we can just do this.props.dispatch(someAction(someArg))
)(UserSignUpDemo)
