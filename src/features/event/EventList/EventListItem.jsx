import { format } from 'date-fns'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, List, Segment, Label } from 'semantic-ui-react'
import { objectToArray } from '../../../app/common/utils/helpers'
import EventListAttendee from './EventListAttendee'

class EventListItem extends Component {
  render() {
    const  {event} = this.props

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='mini' circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header >
                  <Link to={`/events/${event.id}`}> 
                    {event.title}
                  </Link>
                  
                </Item.Header>
                
                <Item.Description  >
                  Hosted by <Link to={`/profile/${event.hostUid}`}> {event.hostedBy}</Link> 
                </Item.Description>
                {event.cancelled && 
                    <Label 
                      style={{top: '-1px'}}
                      ribbon='right'
                      
                      color='pink'
                      content='This event has been cancelled'
                    />
                  
                }
                
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(event.date.toDate(), 'EEEE do LLLL')} at{' '} {format(event.date.toDate(), 'h:mm a')} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees && objectToArray(event.attendees).map((attendee) => (
              <EventListAttendee key={attendee.id} attendee = {attendee} />
            ))}

          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          {/* <Button onClick={() => deleteEvent(event.id)} as="a" color="red" floated="right" content="Delete" /> */}
          <Button as={Link} to={`/events/${event.id}`} color="teal" floated="right" content="View" />
        </Segment>
      </Segment.Group>
    )
  }
}


export default EventListItem