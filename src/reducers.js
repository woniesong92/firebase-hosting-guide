import { combineReducers } from 'redux'
import UserSignUpDemo from './components/UserSignUpDemo/reducer'
import UploaderDemo from './components/UploaderDemo/reducer'
import AllUsersDemo from './components/AllUsersDemo/reducer'

const reducers = combineReducers({
  UserSignUpDemo,
  UploaderDemo,
  AllUsersDemo,
});

export default reducers
