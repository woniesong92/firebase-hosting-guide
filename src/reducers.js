import { combineReducers } from 'redux'
import UserSignUpDemo from './components/UserSignUpDemo/reducer'
import UploaderDemo from './components/UploaderDemo/reducer'

const reducers = combineReducers({
  UserSignUpDemo,
  UploaderDemo,
});

export default reducers
