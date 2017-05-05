import CONSTANTS from './constants'

export const signIn = (user) => {
  return {
    type: CONSTANTS.SIGN_IN,
    payload: user,
  }
}

export const signOut = () => {
  return {
    type: CONSTANTS.SIGN_OUT,
  }
}

// TODO: add redux-thunk to return after some kind of callback (e.g. some ajax callback from server)
