import { differenceInYears } from 'date-fns'
import React from 'react'
import { Grid, Header, Item, Segment } from 'semantic-ui-react'

const UserDetailedHeader = ({profile}) => {
  let age = 0
  if(profile.dateOfBirth) {
    age = differenceInYears(Date.now() , profile.dateOfBirth.toDate())
  } else {
    age ='unkown age'
  }

  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image avatar size='small' src={profile.photoURL}/>
            <Item.Content verticalAlign='bottom'>
              <Header as='h1'>{profile.displayName}</Header>
              <br/>
              <Header as='h3'>{age}, {profile.occupation}</Header>
              <br/>
              <Header as='h3'>{profile.city}</Header>
            </Item.Content>
          </Item>
        </Item.Group>

      </Segment>
    </Grid.Column>
  )
}

export default UserDetailedHeader
