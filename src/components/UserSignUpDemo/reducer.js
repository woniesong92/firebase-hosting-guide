import CONSTANTS from './constants';

const initialState = {
  currentUser: null,
};

export default function UserSignUpDemo(state = initialState, action) {
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
