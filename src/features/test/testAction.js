import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "./testConstants";

export const incrementAction = () => ({
  type: INCREMENT_COUNTER,
  payload: 10
})

export const decrementAction = () => ({
  type: DECREMENT_COUNTER,
  payload: 10
})