import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import { Item, Label, List, Segment , Image} from 'semantic-ui-react'

const EventDetailedSidebar = ({attendees}) => {
  const isHost = false
  return (
    <Fragment>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendees && attendees.length}
        {attendees && attendees.length === 1 ? ' Person ' : ' People '} Going
      </Segment>
      <Segment attached>
          <List relaxed divided>
          {attendees.length > 0 && attendees.map(attendee => ( 
            <Item key={attendee.id} style={{ position: 'relative' }}>
              {isHost && <Label
                style={{ position: 'absolute' }}
                color='orange'
                ribbon='right'
              >
                Host
              </Label>}

                <Image size='tiny' src={attendee.photoURL}/>
                <Item.Content verticalAlign='middle'>
                  <Item.Header as='h3'>
                    <Link to={`profile/${attendee.id}`}>
                      {attendee.displayName}
                    </Link>
                  </Item.Header>
                </Item.Content>

              
            </Item>
            ))}
          </List>
        

        
      </Segment>
    </Fragment>
  )
}

export default EventDetailedSidebar
