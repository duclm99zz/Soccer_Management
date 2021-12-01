import { createReducer } from "../../app/common/utils/reducerUtils"
import { LOGIN_USER, SIGN_OUT_USER } from "./authConstant"

const initialState = {
  authenticated: false,
  currentUser: null
}

const loginUser = (state, payload) => {
  return {
    authenticated: true,
    currentUser: payload.creds.email
  }
}

const signOut = () => {
  return {
    authenticated: false,
    currentUser: null
  }
}
// const socialLogin = (state, payload) => {
//   return {
//     authenticated: true,
//     currentUser: payload.
//   }
// }

export default createReducer(initialState, {
  [LOGIN_USER]: loginUser,
  [SIGN_OUT_USER]: signOut
})