
import React, { Component } from 'react'
import {  Grid, Loader } from 'semantic-ui-react'
import {connect} from 'react-redux'

import EventList from '../EventList/EventList'
import {getEventsDashboard} from '../eventActions'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import EventActivity from '../EventActivity/EventActivity'
import { firestoreConnect } from 'react-redux-firebase'

// const eventsFromDashboard = []
const mapState = (state) => ({
  events: state.events,
  loading: state.async.loading
})

const mapDispatch = {
  getEventsDashboard
}

class EventDashboard extends Component {
  state = {
    moreEvent: true,
    loadingInitial: true,
    loadedEvent: []
  }
  async componentDidMount () {
    let next = await this.props.getEventsDashboard()

    if (next && next.docs & next.docs.length > 1) {
      this.setState({
        moreEvent: true,
        loadingInitial: false
      })
    }
  }
  async componentDidUpdate (prevProps) {
    if (this.props.events !== prevProps.events) {
      this.setState({
        loadedEvent: [...this.state.loadedEvent, ...this.props.events]
      })
    }
  }
  getNextEvent = async () => {
    const {events} = this.props
    let lastEvent = events && events[events.length - 1]
    let next  = await this.props.getEventsDashboard(lastEvent)
    if (next.docs.length <= 1) {
      this.setState({
        moreEvent: false
      })
    }
  }

  render() {
    const {loading} = this.props
    const {moreEvent, loadedEvent} = this.state
    if (!this.state.loadingInitial) return <LoadingComponent />
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <EventList 
              events= {loadedEvent}
              getNextEvent={this.getNextEvent}
              loading={loading}
              moreEvent= {moreEvent}

            />
          </Grid.Column>
          <Grid.Column width={6}>
            <EventActivity />
          </Grid.Column>
          <Grid.Column width={10}>
            <Loader active={loading} />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)( firestoreConnect([{collection: 'Events'}])(EventDashboard))