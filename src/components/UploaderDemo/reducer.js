import CONSTANTS from './constants';
import * as firebase from 'firebase'

const initialState = {
  // currentUser: null,
  // storageRef: firebase.storage().ref()
};

export default function UploaderDemo(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.SIGN_IN:
      return {
        ...state,
        currentUser: action.payload,
      };

    case CONSTANTS.SIGN_OUT:
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
}
