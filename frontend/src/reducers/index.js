import { combineReducers } from 'redux'
import errors from './errors'
import messages from './messages'
import auth from './auth'
import profile from './profile'

export default combineReducers({
    errors,
    messages,
    auth,
    profile,
})