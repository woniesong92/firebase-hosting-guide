import React, { Component } from 'react'
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

    this.props.dispatch(Actions.signUp({
      email,
      password,
    }))
  }

  onSignIn = (event) => {
    event.preventDefault()
    const { email, password } = this.state

    this.props.dispatch(Actions.signIn({
      email,
      password,
    }))
  }

  onSignOut = (event) => {
    event.preventDefault()
    this.props.dispatch(Actions.signOut())
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
      console.log("You're signed in... Let me redirect you home")
      this.props.history.push('/')
      return null
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
