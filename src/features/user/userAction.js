import { toastr } from "react-redux-toastr"
import { asyncError, asyncFinish, asyncStart } from "../async/asyncAction"
import cuid from "cuid"


export const updateProfile = (user) => {
  return async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()
    const {isLoaded, isEmpty, ...updatedUser} = user
    try {
      await firebase.updateProfile(updatedUser)
      
      toastr.success('Success', 'Your profile has been updated')
    } catch (error) {
      console.log(error)
    }
  }
}



export const updateProfileImage = (file, fileName) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    const user = firebase.auth().currentUser
    const imageName = cuid()
    const path = `${user.uid}/user_images`
    const options = {
      name: imageName
    }
    try {
      dispatch(asyncStart())
      //upload the file to firebase storage
      let uploadedFile = await firebase.uploadFile(path, file, null, options)
      // get url of image
      let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL()
      // get userdoc
      let userDoc = await firestore.get(`Users/${user.uid}`)
      // check if user has photo, if not update profile
      if (!userDoc.data().photoURL) {
        await firebase.updateProfile({
          photoURL: downloadURL
        })

        await user.updateProfile({
          photoURL: downloadURL
        })

      }
      // add the image to firestore
      await firestore.add({
        collection: 'Users',
        doc: user.uid,
        subcollections: [{collection: 'photos'}]
      },{
        name: imageName,
        url: downloadURL
      })

      dispatch(asyncFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncError())
    }
  }
}


export const deletePhoto = (photo) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    const user = firebase.auth().currentUser
    try {
      dispatch(asyncStart())
      console.log('user == ', user)
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`)
      await firestore.delete({
        collection: 'Users',
        doc: user.uid,
        subcollections: [{collection: 'photos', doc: photo.id}]
      })
      toastr.success('Success!', 'Photo has been deleted')
      dispatch(asyncFinish())
    } catch (error) {
      console.log(error)
      throw new Error('Problem with deleting photo')
    }
  }
}
 

export const setMainPhoto = (photo) => {
  return async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()
    try {
      return  await firebase.updateProfile({
        photoURL: photo.url
      })
    } catch (error) {
      console.log(error)
      throw new Error('Problem setting main photo')
    }
  }
}