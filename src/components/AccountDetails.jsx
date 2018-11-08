import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Card, StyledButton, StyledHr, NavLink } from './atoms'
import { AccountDetailsList, AccountDetailsForm } from './molecules'

const Container = styled.div`
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  margin: 2rem;
  width: 25rem;
  h3 {
    margin-bottom: 2rem;
  }
  background-color: white;
  border-radius: 3px;
  padding: 2rem;
`

class AccountDetails extends Component {
  state = {
    editing: false,
    firstName: this.props.curUser.name.split(' ')[0] || '',
    lastName: this.props.curUser.name.split(' ')[1] || '',
    email: this.props.curUser.email || '',
    address: this.props.curUser.billing.address_line1 || '',
    apartment: this.props.curUser.billing.address_line2 || '',
    city: this.props.curUser.billing.address_city || '',
    zip: this.props.curUser.billing.zip || '',
    phone: this.props.curUser.billing.phone || '',
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
    const {
      firstName,
      lastName,
      email,
      address,
      apartment,
      city,
      zip,
      phone,
    } = this.state
    firebase.updateAccount(
      this.props.curUser,
      firstName,
      lastName,
      email,
      address,
      apartment,
      city,
      zip,
      phone
    )
    this.props.signIn(this.props.curUser)
    this.setState({ editing: false })
  }
  render() {
    const curUser = this.props.curUser
    const {
      firstName,
      lastName,
      email,
      address,
      apartment,
      city,
      zip,
      phone,
    } = this.state
    return (
      <Container>
        <h3>Account Details</h3>
        {!this.state.editing ? (
          <AccountDetailsList
            curUser={curUser}
            firstName={firstName}
            lastName={lastName}
            email={email}
            address={address}
            apartment={apartment}
            city={city}
            zip={zip}
            phone={phone}
          />
        ) : (
          <AccountDetailsForm
            curUser={curUser}
            handleChange={this.handleChange}
            firstName={firstName}
            lastName={lastName}
            email={email}
            address={address}
            apartment={apartment}
            city={city}
            zip={zip}
            phone={phone}
          />
        )}
        {!this.state.editing ? (
          <StyledButton width="17rem" margin="0rem" onClick={this.showEdit}>
            EDIT
          </StyledButton>
        ) : (
          <StyledButton width="17rem" margin="0rem" onClick={this.handleUpdate}>
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
