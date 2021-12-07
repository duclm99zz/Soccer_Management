import React, {Component} from 'react';
import {Grid} from "semantic-ui-react";
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedSidebar from './UserDetailedSidebar';
import {connect} from 'react-redux'
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedPhoto from './UserDetailedPhoto';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';


const maptState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos ? state.firestore.ordered.photos : [],
})

const query = ({auth}) => {
  return [
    {
      collection: 'Users',
      doc: auth.uid,
      subcollections: [{collection: 'photos'}],
      storeAs: 'photos'
    }
  ]
}

class UserDetailedPage extends Component {

  render() {
  const {profile, photos } = this.props
  console.log(photos)
  return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedDescription profile={profile} />
        <UserDetailedSidebar />
        <UserDetailedPhoto photos={photos}/>
        <UserDetailedEvents />
      </Grid>

  );
  }
}

export default compose(
  connect(maptState),
  firestoreConnect(auth => query(auth))
)(UserDetailedPage);