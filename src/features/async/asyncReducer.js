import { createReducer } from "../../app/common/utils/reducerUtils"
import { ASYNC_ACTION_ERROR, ASYNC_ACTION_FINISH, ASYNC_ACTION_START } from "./asyncConstant"


const initialState = {
  loading: false
}


const asyncStarted = (state, payload) => {
  return {
    ...state,
    loading: true,
    elementName: payload
  }
}

const asyncFinished = (state, payload) => {
  return {
    ...state,
    loading: false,
    elementName: null
  }
}

const asyncError = (state) => {
  return {
    ...state,
    loading: false,
    elementName: null
  }
}



export default createReducer(initialState, {
  [ASYNC_ACTION_START]: asyncStarted,
  [ASYNC_ACTION_FINISH]: asyncFinished,
  [ASYNC_ACTION_ERROR]: asyncError
})