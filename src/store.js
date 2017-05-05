import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducers from './reducers'

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

// TODO: add redux logger and localStorage persistance
export default store
