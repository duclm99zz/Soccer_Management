import { createReducer } from "../../app/common/utils/reducerUtils"
import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "./testConstants"

const initialState = {
  testData: 99
}

const incrementCounter = (state, payload) => {
  return {...state, testData: state.testData + payload}
}

const decrementCounter = (state, payload) => {
  return {...state, testData: state.testData - payload}
}


export default createReducer(initialState, {
  [INCREMENT_COUNTER]: incrementCounter,
  [DECREMENT_COUNTER]: decrementCounter
})
// const testReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case INCREMENT_COUNTER:
//       return {...state, testData: state.testData + 1}
//     case DECREMENT_COUNTER:
//       return {...state, testData: state.testData - 1}
//     default:
//       return state
//   }
// }




