import CONSTANTS from './constants';
import * as firebase from 'firebase'

const initialState = {
  users: [],
  ui: {
    isLoading: false,
  }
};

export default function UploaderDemo(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.FETCH_USERS:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: true,
        }
      };

    case CONSTANTS.FETCH_USERS_RESULT:
      // NOTE: Firebase DB is JSON based, so the snapshot will look like this:
      // {
      //   userIdA: 'howon92@gmail.com',
      //   userIdB: 'howon91@gmail.com',
      //   ...
      // }

      const users = Object.keys(action.payload).map(uid => {
        const user = action.payload[uid]
        return {
          uid,
          email: user.email,
        }
      })

      return {
        ...state,
        users,
        ui: {
          ...state.ui,
          isLoading: false,
        }
      };

    default:
      return state;
  }
}
