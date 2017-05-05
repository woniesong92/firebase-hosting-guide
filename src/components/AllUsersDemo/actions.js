import * as firebase from 'firebase'
import CONSTANTS from './constants'

export const fetchUsers = () => {
  return (dispatch, getState) => {
    dispatch({ type: CONSTANTS.FETCH_USERS })
    
    firebase.database().ref('/users/').once('value').then((snapshot) => {
      dispatch({
        type: CONSTANTS.FETCH_USERS_RESULT,
        payload: snapshot.val()
      })
    })
  }
}
