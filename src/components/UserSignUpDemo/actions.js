import * as firebase from 'firebase'
import CONSTANTS from './constants'

export const signInSimple = (user) => {
  return {
    type: CONSTANTS.SIGN_IN,
    payload: user,
  }
}

export const signIn = ({ email, password }) => {
  return (dispatch, getState) => {
    // NOTE: this is how you login a user on firebase
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      const { uid, email } = user

      dispatch(signInSimple({
        email,
        uid,
      }))
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export const signUp = ({ email, password }) => {
  return (dispatch, getState) => {
    // NOTE: this is how you create a user on firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      const { uid, email } = user

      // Store this user into our firebase DB
      // User authentication and DB are separate on Firebase, so it's necessary
      // to store a user object into DB explicitly one more time
      firebase.database().ref('users/' + uid).set({
        email
      })

      // Store this user object into our global store
      dispatch(signInSimple({
        email,
        uid,
      }))
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export const signOut = () => {
  return (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
      dispatch({ type: CONSTANTS.SIGN_OUT })
    })
  }
}

// TODO: add redux-thunk to return after some kind of callback (e.g. some ajax callback from server)
