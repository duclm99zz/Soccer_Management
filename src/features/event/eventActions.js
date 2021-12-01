import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENT, UPDATE_EVENT } from "./eventConstants"
import {asyncError, asyncFinish, asyncStart} from '../async/asyncAction'
import { fetchSample } from "../../app/data/mockAPI"
// import { ASYNC_ACTION_START } from "../async/asyncConstant"
import { toastr } from "react-redux-toastr"
export const createEvent = (event) => {
  return async dispatch => {
    try {
      console.log(event)
      dispatch( {
        type: CREATE_EVENT,
        payload: {event}
      })
      toastr.success('Success!', 'Event has been created')
    } catch (error) {
      toastr.error('Opps', 'Something went wrong')
    }
    
  }
  
}

export const updateEvent = (event) => {
  return async dispatch => {
    try {
      dispatch({type: UPDATE_EVENT, payload: {event}})
      toastr.success('Success!', 'Event has been updated')
    } catch (error) {
      toastr.error('Oops!', 'Something went wrong')
    }
  }
}


// export const updateEvent = (event) => ({
//   type: UPDATE_EVENT,
//   payload: {event}
// })

export const deleteEvent = (eventId) => {
  return async dispatch => {
    dispatch({type: DELETE_EVENT, payload: eventId})
    toastr.success('Success!', 'Event has been deleted')
  }
}

// export const deleteEvent = (eventId) => ({
//   type: DELETE_EVENT,
//   payload: {eventId}
// })



export const loadEvent = () => {
  return async dispatch => {
    try {
      dispatch(asyncStart())
      const events = await fetchSample()
      dispatch({type: FETCH_EVENT, payload: {events}})
      dispatch(asyncFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncError())
    }
  }
}