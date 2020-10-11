import { combineReducers, createStore } from 'redux'
import userReducer from './Reducer/userReducer'

const rootReducer = combineReducers({
  userLogin: userReducer
})

const store = createStore(rootReducer);

export default store;