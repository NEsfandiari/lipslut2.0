import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledButton, NavLink } from './atoms'
import { AccountDetailsList, AccountDetailsForm } from './molecules'

const Container = styled.div`
  flex-basis: 25%;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  width: 25rem;
  h3 {
    margin-bottom: 2rem;
  }
  background-color: white;
  border-radius: 3px;
  padding: 2rem;
  max-height: 25rem;
  @media (max-width: 420px) {
    width: 90%;
    margin: 0;
    padding: 1rem;
    align-items: center;
  }
`

class AccountDetails extends Component {
  state = {
    editing: false,
    firstName: this.props.curUser.firstName || '',
    lastName: this.props.curUser.lastName || '',
    email: this.props.curUser.email || '',
    phone: this.props.curUser.phone || '',
  }

  static contextTypes = {
    firebase: PropTypes.object,
  }

  showEdit = e => {
    this.setState({ editing: true })
  }
  cancel = e => {
    this.setState({ editing: false })
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleUpdate = e => {
    const firebase = this.context.firebase
    const { firstName, lastName, email, phone } = this.state
    firebase.updateAccount(
      this.props.curUser,
      firstName,
      lastName,
      email,
      phone
    )
    this.props.signIn(this.props.curUser)
    this.setState({ editing: false })
  }
  render() {
    const curUser = this.props.curUser
    const { firstName, lastName, email, phone } = this.state
    return (
      <Container>
        <h3>Account Details</h3>
        {!this.state.editing ? (
          <AccountDetailsList
            curUser={curUser}
            firstName={firstName}
            lastName={lastName}
            email={email}
            phone={phone}
          />
        ) : (
          <AccountDetailsForm
            curUser={curUser}
            handleChange={this.handleChange}
            firstName={firstName}
            lastName={lastName}
            email={email}
            phone={phone}
          />
        )}
        {!this.state.editing ? (
          <StyledButton width="16rem" margin="0rem" onClick={this.showEdit}>
            EDIT
          </StyledButton>
        ) : (
          <StyledButton width="16rem" margin="0rem" onClick={this.handleUpdate}>
            UPDATE
          </StyledButton>
        )}
        {this.state.editing ? (
          <NavLink to="/account" onClick={this.cancel}>
            CANCEL
          </NavLink>
        ) : null}
      </Container>
    )
  }
}

export default AccountDetails
