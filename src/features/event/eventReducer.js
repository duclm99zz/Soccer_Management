import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENT, UPDATE_EVENT } from "./eventConstants"
import {createReducer } from '../../app/common/utils/reducerUtils'
const initialState = []

 const createEvent = (state, payload) => {
  return [...state, payload.event]
}


const updateEvent = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.event.id), payload.event
  ]
}

const deleteEvent = (state, payload) => {
  return [...state.filter(event => event.id !== payload.eventId)] 
}



const fetchEvent = (state, payload) => {
  return payload.events
}
export default createReducer(initialState, {
  [CREATE_EVENT]: createEvent,
  [UPDATE_EVENT]: updateEvent,
  [DELETE_EVENT]: deleteEvent,
  [FETCH_EVENT]: fetchEvent
})