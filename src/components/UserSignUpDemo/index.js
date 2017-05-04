import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import './user-sign-up-demo.css';

class UserSignUpDemo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSignUp: true,
      email: '',
      password: '',
      currentUser: null,
    }
  }

  componentDidMount() {
    // NOTE: this is how you check whether the user just signed up/in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.setState({ currentUser: user })
      } else {
        this.setState({ currentUser: null })
      }
    }.bind(this));
  }

  onToggleSignUp = (event) => {
    event.preventDefault()
    this.setState({
      isSignUp: !this.state.isSignUp,
    })
  }

  onSignUp = (event) => {
    event.preventDefault()
    const { email, password } = this.state

    // NOTE: this is how you create a user on firebase
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error)
    });
  }

  onSignIn = (event) => {
    event.preventDefault()
    const { email, password } = this.state

    // NOTE: this is how you login a user from firebase
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error)
    });
  }

  onSignOut = () => {
    firebase.auth().signOut().then(function() {
      // this.setState({ currentUser: null })
    }.bind(this)).catch(function(error) {
      console.log("failed to signout")
    });
  }

  onFieldChange = (field, event) => {
    this.setState({
      [field]: event.target.value,
    })
  }

  render() {
    if (this.state.currentUser) {
      return (
        <div>
          <h1>Welcome! {this.state.currentUser.email} </h1>
          <ul>
            <li><a href='#' onClick={this.onSignOut}>Sign Out</a></li>
            <li><Link to="/">Home</Link></li>
          </ul>
        </div>
      )
    }

    return (
      <div className="user-sign-up-demo">
        <h1>UserSignUpDemo</h1>

        { this.state.isSignUp ?
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
                       value={this.state.email}
                />
              </div>
              <div>
                <label>Password</label>
                <input type="password"
                       placeholder="password"
                       onChange={this.onFieldChange.bind(this, 'password')}
                       value={this.state.password}
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
                       value={this.state.email}
                />
              </div>
              <div>
                <label>Password</label>
                <input type="password"
                       placeholder="password" 
                       onChange={this.onFieldChange.bind(this, 'password')}
                       value={this.state.password}
                />
              </div>
              <button type="submit">Login</button>
            </form>
            <a href="" onClick={this.onToggleSignUp}>Don't have an account?</a>
          </div>)
        }
      </div>
    );
  }
}

export default UserSignUpDemo;
