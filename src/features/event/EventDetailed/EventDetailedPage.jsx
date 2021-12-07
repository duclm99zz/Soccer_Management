import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedSidebar from './EventDetailedSidebar'
import {connect} from 'react-redux'
import {withFirestore} from 'react-redux-firebase'
import { toastr } from 'react-redux-toastr'
import { objectToArray } from '../../../app/common/utils/helpers'
import { goingToEvent, cancelGoingEvent } from '../eventActions'

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id
  let event = {}
  if (state.firestore.ordered.Events && state.firestore.ordered.Events.length > 0) {
    
    event = state.firestore.ordered.Events.filter(e => e.id === eventId)[0] || {}
  }
  return {
    event,
    auth: state.firebase.auth
  }
}
const actions = {
  goingToEvent,
  cancelGoingEvent
}


class EventDetailedPage extends Component {


  async componentDidMount () {
    const {firebase, match, history} = this.props
    const event = await firebase.firestore().collection('Events').doc(`${match.params.id}`)
    event.get().then((docSnapshot) => {
      if(!docSnapshot.exists) {
        history.push('/events')
        toastr.error('Sorry', 'Event not found')
      }
    })
  }

  async componentWillUnmount () {
    const {firestore, match} = this.props
    await firestore.unsetListener(`Events/${match.params.id}`)
  }

  render() {
    const {event, auth, goingToEvent, cancelGoingEvent} = this.props
    const attendees = event && event.attendees && objectToArray(event.attendees)
    const isHost = event.hostUid === auth.uid
    const isGoing = attendees && attendees.some(a => a.id === auth.uid)
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader cancelGoingEvent={cancelGoingEvent} goingToEvent={goingToEvent} event={event} isGoing={isGoing} isHost={isHost}/>
          <EventDetailedInfo event={event}/>
          <EventDetailedChat/>
        </Grid.Column>
        <Grid.Column width={6}>
          {attendees.length > 0 && <EventDetailedSidebar attendees={attendees}/>}
          
        </Grid.Column>
      </Grid>
  
    )
  }
 
}

export default withFirestore(connect(mapState, actions)(EventDetailedPage))