
import React, { Component } from 'react'
import {  Grid } from 'semantic-ui-react'
import {connect} from 'react-redux'

import EventList from '../EventList/EventList'
import {createEvent, updateEvent} from '../eventActions'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import EventActivity from '../EventActivity/EventActivity'
import { firestoreConnect } from 'react-redux-firebase'

// const eventsFromDashboard = []
const mapState = (state) => ({
  events: state.firestore.ordered.Events,
  loading: state.async.loading
})

const mapDispatch = {
  createEvent,
  updateEvent
}

class EventDashboard extends Component {




  render() {
    const {events, loading} = this.props
    
    if (loading) return <LoadingComponent />
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <EventList 
              events= {events} 
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <EventActivity />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)( firestoreConnect([{collection: 'Events'}])(EventDashboard))