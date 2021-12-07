import { format } from 'date-fns';
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react'

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};


const EventDetailedHeader = ({event, isHost, isGoing, goingToEvent, cancelGoingEvent}) => {

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image style={eventImageStyle} src={`/assets/${event.category}.jpg`} fluid />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'pink' }}
                />
                <p>{event.date && format(event.date.toDate(),'EEEE do LLLL')}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {!isHost &&
          <Fragment> 
            {isGoing ? 
              <Button color='instagram' onClick={() => cancelGoingEvent(event)}>Cancel My Place</Button>
              : <Button onClick={() => goingToEvent(event)} color="teal">JOIN THIS EVENT</Button>
            }
            
            
          </Fragment>
        }
        {isHost && 
          <Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right">
            Manage Event
          </Button>
        }
        
      </Segment>
    </Segment.Group>
  )
}

export default EventDetailedHeader
