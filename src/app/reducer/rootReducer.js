import { combineReducers } from "redux"
import eventReducer from "../../features/event/eventReducer"
import testReducer from "../../features/test/testReducer"
import {reducer as FromReducer} from 'redux-form'
import modalReducer from "../../features/modals/modalReducer"
import authReducer from "../../features/auth/authReducer"
import asyncReducer from "../../features/async/asyncReducer"
import {reducer as ToastrReducer} from 'react-redux-toastr'
import { firebaseReducer } from "react-redux-firebase"
import {firestoreReducer} from 'redux-firestore'


const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: FromReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: ToastrReducer
})

export default rootReducer