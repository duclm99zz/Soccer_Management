import { combineReducers } from "redux"
import eventReducer from "../../features/event/eventReducer"
import testReducer from "../../features/test/testReducer"
import {reducer as FromReducer} from 'redux-form'
import modalReducer from "../../features/modals/modalReducer"
import authReducer from "../../features/auth/authReducer"

const rootReducer = combineReducers({
  form: FromReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer
})

export default rootReducer