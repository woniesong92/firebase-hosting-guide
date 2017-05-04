import { createStore } from 'redux'
import reducers from './reducers'

// Initialize Redux global store
const store = createStore(reducers)

// TODO: add redux logger and localStorage persistance
export default store
