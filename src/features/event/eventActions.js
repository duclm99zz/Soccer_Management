
// import {asyncError, asyncFinish, asyncStart} from '../async/asyncAction'
// import { fetchSample } from "../../app/data/mockAPI"
// import { ASYNC_ACTION_START } from "../async/asyncConstant"
import firebase  from "../../app/config/firebase"
import { toastr } from "react-redux-toastr"
import {createNewEvent} from '../../app/common/utils/helpers'
import { FETCH_EVENT } from "./eventConstants"
import { asyncFinish, asyncStart } from "../async/asyncAction"



export const createEvent = (event) => {
  return async (dispatch, getState, {getFirestore, getFirebase}) => {
    const firestore = getFirestore()
    const firebase = getFirebase()
    const user = firebase.auth().currentUser
    const photoURL = getState().firebase.profile.photoURL
    const newEvent = createNewEvent(user, photoURL, event)
    try {
      let createdEvent = await firestore.add('Events',newEvent)
      
      await firestore.set(`Event_Attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userId: user.uid,
        eventDate: event.date,
        host: true
      })
      toastr.success('Success!', 'Event has been created')
      return createdEvent
    } catch (error) {
      toastr.error('Opps', 'Something went wrong')
    }
    
  }
  
}

export const updateEvent = (event) => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore()

    try {
      await firestore.update(`Events/${event.id}`, event)
      toastr.success('Success!', 'Event has been updated')
    } catch (error) {
      toastr.error('Oops!', 'Something went wrong')
    }
  }
}

export const cancelToggle = (cancelled, eventId) => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore()
    const message = cancelled ? 'Are you sure to cancel the event' : 'This will reactive the event'
    try {
      toastr.confirm(message, {
        onOk: async () => await firestore.update(`Events/${eventId}`, {cancelled: cancelled})
      })
      
    } catch (error) {
      console.log(error)
    }
  }
}

export const goingToEvent = (event) => {
  return async (dispatch, getState,  {getFirebase, getFirestore}) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    const user = firebase.auth().currentUser
    const profile = getState().firebase.profile
    const attendees = {
      going: true,
      joinDate: firestore.FieldValue.serverTimestamp(),
      photoURL: profile.photoURL || '/assets/user.png',
      displayName: profile.displayName,
      host: false
    }
    try {
      await firestore.update(`Events/${event.id}`, {
        [`attendees.${user.uid}`]: attendees
      })
      await firestore.set(`Event_Attendee/${event.id}_${user.uid}`, {
        eventId: event.id,
        userUid: user.uid,
        eventDate: event.date,
        host: false
      })
      toastr.success('Success!', 'You have signed up the event')
    } catch (error) {
      console.log(error)
      toastr.error('Oops!', 'Something went wrong')
    }
  }
}


export const getEventsDashboard = (lastEvent) => {
  return async (dispatch, getState) => {
    const today = new Date()
    const firestore = firebase.firestore()
    const eventsRef = firestore.collection('Events')
    try {
      dispatch(asyncStart())
      let startAfter = lastEvent && await firestore.collection('Events').doc(lastEvent.id).get()
      let query

      lastEvent ? query = eventsRef.where('date', '>=' ,today).orderBy('date').startAfter(startAfter).limit(2)
      : query = eventsRef.where('date', '>=' ,today).orderBy('date').limit(2)

      
      let querySnap = await query.get()

      if (querySnap.docs.length === 0) {
        dispatch(asyncFinish())
        return querySnap
      }


      // let querySnap = await eventsRef.get()
      let events = []
      for (let i = 0; i < querySnap.docs.length; i++) {
        let e = {...querySnap.docs[i].data(), id: querySnap.docs[i].id}
        events.push(e)
      }
      dispatch({type: FETCH_EVENT, payload: {events}})
      dispatch(asyncFinish())
      return querySnap
    } catch (error) {
      console.log(error)

    }
  }
}

export const cancelGoingEvent = (event) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    const user = firebase.auth().currentUser

    try {
      await firestore.update(`Events/${event.id}`, {
        [`attendees.${user.uid}`]: firestore.FieldValue.delete()
      })

      await firestore.delete(`Event_Attendee/${event.id}_${user.uid}`)
      toastr.success('Success!', 'You have removed yourself from the event')
    } catch (error) {
      console.log(error)
      toastr.error('Oops', 'Something went wrong')
    }
  }
}