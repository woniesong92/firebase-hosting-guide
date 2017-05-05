import * as firebase from 'firebase'
import CONSTANTS from './constants'

export const fetchFiles = () => {
  return (dispatch, getState) => {
    const currentUser = getState().UserSignUpDemo.currentUser
    if (!currentUser) {
      return false
    }

    dispatch({ type: CONSTANTS.FETCH_FILES })
    const myFilesRef = firebase.database().ref(`/datasets/${currentUser.uid}`)
    
    myFilesRef.once('value').then((snapshot) => {
      dispatch({
        type: CONSTANTS.FETCH_FILES_RESULT,
        payload: snapshot.val(), // Contains all the dataset paths
      })
    })
  }
}
