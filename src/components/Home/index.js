import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { signInSimple, signOut } from '../UserSignUpDemo/actions'
import './home.css';

class Home extends Component {
  onSignOut = (event) => {
    this.props.dispatch(signOut())
  }

  componentDidMount() {
    // NOTE: Check if the user is already signed into Firebase.
    // if they are, just store the user object into our global redux store.
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { email, uid } = user

        this.props.dispatch(signInSimple({
          email,
          uid,
        }))
      }
    })
  }

  render() {
    const { currentUser } = this.props

    return (
      <div className="home">
        <h1>Home</h1>

        { currentUser ?
          <div className="home-menus">
            <h1>Welcome! {currentUser.email} </h1>
            <ul>
              <li><a href='' onClick={this.onSignOut}>Sign Out</a></li>
              <li><Link to="/uploader">Uploader</Link></li>
              <li><Link to="/users">All Users</Link></li>
              <li><Link to="/my-files">My Files</Link></li>
              <li><Link to="/">Home</Link></li>
            </ul>
          </div>
          : <Link to="/signup">Sign Up</Link>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.UserSignUpDemo.currentUser,
  }
}

export default connect(
  mapStateToProps,
  null,
)(Home)
