import { asyncFinish } from "../async/asyncAction";
import { ASYNC_ACTION_START } from "../async/asyncConstant";
import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "./testConstants";

export const incrementAction = () => ({
  type: INCREMENT_COUNTER,
  payload: 10
})

export const decrementAction = () => ({
  type: DECREMENT_COUNTER,
  payload: 10
})



const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const asyncIncrement = (name) => {
  return async dispatch => {
    dispatch({type: ASYNC_ACTION_START, payload: name})
    await delay(1000)
    dispatch(incrementAction())
    dispatch(asyncFinish())
  }
}


export const asyncDecrement = (name) => {
  return async dispatch => {
    dispatch({type: ASYNC_ACTION_START, payload: name})
    await delay(1000)
    dispatch(decrementAction())
    dispatch(asyncFinish())
  }
}