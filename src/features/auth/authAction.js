import { closeModal } from "../modals/modalAction"
import {SubmissionError} from 'redux-form'

export const login = (creds) => {
  return async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()
    try {
      await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
    } catch (error) {
      console.log(error)
      throw new SubmissionError({_error: 'Login Failed'})
    }
    dispatch(closeModal())
  }
}

export const socialLogin = (selectedProvider) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
  
    const firebase = getFirebase()
    const firestore = getFirestore()

    try {
      dispatch(closeModal())
      const user = await firebase.login({
        provider: selectedProvider,
        type: 'popup'
      })

      if(user.additionalUserInfo.isNewUser) {
        await firestore.set(`Users/${user.user.uid}`, {
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firestore.FieldValue.serverTimestamp()
        })
      }
    } catch (error) {
      console.log(error)
    }
  } 
} 



export const registerUser = user => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase()
  const firestore = getFirestore()

  try {

    let createdUser  = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

    await createdUser.user.updateProfile({
      displayName: user.displayName,
    })
    let newUser = {
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp()
    }
    await firestore.set(`Users/${createdUser.user.uid}`,{...newUser})
    dispatch(closeModal())
  } catch (error) {
    console.log(error)
  }


}


export const updatePassword = (creds) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase()
    const user = firebase.auth().currentUser
    try {
      await user.updatePassword(creds.newPassword1)
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      })
    }
  }
}