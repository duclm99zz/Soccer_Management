import { ASYNC_ACTION_ERROR, ASYNC_ACTION_FINISH, ASYNC_ACTION_START } from "./asyncConstant"


export const asyncStart = () => {
  return {
    type: ASYNC_ACTION_START
  }
}

export const asyncFinish = () => {
  return {
    type: ASYNC_ACTION_FINISH
  }
}
export const asyncError = () => {
  return {
    type: ASYNC_ACTION_ERROR
  }
}