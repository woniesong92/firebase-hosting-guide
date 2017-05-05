import { combineReducers } from 'redux'
import UserSignUpDemo from './components/UserSignUpDemo/reducer'
import UploaderDemo from './components/UploaderDemo/reducer'
import AllUsersDemo from './components/AllUsersDemo/reducer'
import MyFilesDemo from './components/MyFilesDemo/reducer'

const reducers = combineReducers({
  UserSignUpDemo,
  UploaderDemo,
  AllUsersDemo,
  MyFilesDemo,
});

export default reducers
