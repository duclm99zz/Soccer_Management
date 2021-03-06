import React, { Component, Fragment } from 'react'
import EventListItem from './EventListItem'
import InfiniteScroll from 'react-infinite-scroller'
class EventList extends Component {

  render() {
    const {events, getNextEvent, loading, moreEvent} = this.props
    return (
      <Fragment>
        {events && events.length !== 0 && 
          <InfiniteScroll pageStart={0} loadMore={getNextEvent} hasMore={!loading && moreEvent} initialLoad={false}>
            {events && events.map(event => (
              <EventListItem 
                key={event.id} 
                event={event} 
              />
            ))}
          </InfiniteScroll>
        } 
        
      </Fragment>
    )
  }
}


export default EventList