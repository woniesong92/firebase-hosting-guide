import CONSTANTS from './constants'

const initialState = {
  datasets: {},
  ui: {
    isLoading: false,
  },
};

export default function MyFilesDemo(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.FETCH_FILES:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: true,
        }
      };

    case CONSTANTS.FETCH_FILES_RESULT:
      return {
        ...state,
        datasets: action.payload || {},
        ui: {
          ...state.ui,
          isLoading: false,
        }
      };

    default:
      return state;
  }
}
