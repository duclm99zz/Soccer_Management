import React, {Component} from 'react';
import {Grid} from "semantic-ui-react";
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedSidebar from './UserDetailedSidebar';
import {connect} from 'react-redux'
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedPhoto from './UserDetailedPhoto';
import { compose } from 'redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import {userDetailedQuery} from '../userQuery'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { getUserEvents } from '../userAction';


const maptState = (state, ownProps) => {
  
  let userUid = null
  let profile = {}

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile
  } else {
    profile =  !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0]
    userUid = ownProps.match.params.id
  }

  return {
    auth: state.firebase.auth,
    profile,
    userUid,
    events: state.events,
    eventsLoading: state.async.loading,
    photos: state.firestore.ordered.photos ? state.firestore.ordered.photos : [],
    requesting: state.firestore.status.requesting
  }
}

const actions = {
  getUserEvents
}



class UserDetailedPage extends Component {
  async componentDidMount () {
    let events = await this.props.getUserEvents(this.props.userUid)
    console.log(events)
  }
  handleChangeTab = (e, data) => {
    this.props.getUserEvents(this.props.userUid, data.activeIndex)
  }
  render() {
  const {profile, photos, auth, match, requesting, events, eventsLoading} = this.props
  const isCurrentUser = auth.uid === match.params.id
  const loading = Object.values(requesting).some(a => a === true)
  if (loading) return <LoadingComponent />
  return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedDescription profile={profile} />
        <UserDetailedSidebar isCurrentUser={isCurrentUser}/>
        <UserDetailedPhoto photos={photos}/>
        <UserDetailedEvents changeTab={this.handleChangeTab} events={events} eventsLoading={eventsLoading} />
      </Grid>

  );
  }
}

export default compose(
  connect(maptState, actions),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);