import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink, Link , withRouter } from 'react-router-dom'
import {Menu, Container, Button} from 'semantic-ui-react'
import SignInMenu from '../Menu/SignInMenu'
import SignOutMenu from '../Menu/SignOutMenu'
import {openModal} from '../../modals/modalAction'
import { logout } from '../../auth/authAction'
const actions = {
  openModal,
  logout
}
const mapState = (state) => ({
  auth: state.auth
})
class NavBar extends Component {
  
  handleSignIn = () => {
    this.props.openModal('LoginModal')
  }
  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }
  handleSignOut = () => {
    this.props.logout()
    this.props.history.push('/')
  }
  render() {
    const { auth } = this.props
    const authenticated = auth.authenticated
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to='/' header>
            <img src="assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} exact to='/events' name="Events" />
          <Menu.Item as={NavLink} exact to='/people' name="People" />
          <Menu.Item as={NavLink} exact to='/test' name="Test" />
          <Menu.Item >
            <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
          </Menu.Item>
          {authenticated ? <SignInMenu signOut = {this.handleSignOut} currentUser={auth.currentUser} /> : <SignOutMenu signIn = {this.handleSignIn} register={this.handleRegister} />}
        </Container>
      </Menu>
    )
  } 
}

export default withRouter(connect(mapState, actions)(NavBar))
