import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Segment } from 'semantic-ui-react'

const UserDetailedSidebar = ({isCurrentUser}) => {
  return (
    <Grid.Column width={4}>
        <Segment>
          {isCurrentUser ? 
            <Button as={Link} to={`/settings`} color='teal' fluid basic content='Edit Profile'/>
            : <Button  color='blue' fluid basic content='Follow user'/>
          }
        </Segment>
    </Grid.Column>
  )
}

export default UserDetailedSidebar
