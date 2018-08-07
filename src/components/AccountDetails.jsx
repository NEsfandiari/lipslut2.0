import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Card, StyledButton, StyledHr, NavLink } from './atoms'
import { AccountDetailsList, AccountDetailsForm } from './molecules'

const Container = styled.div`
  h3 {
    margin-bottom: 0;
  }
`

class AccountDetails extends Component {
  state = {
    editing: false,
    firstName: this.props.curUser.data.name.split(' ')[0] || '',
    lastName: this.props.curUser.data.name.split(' ')[1] || '',
    email: this.props.curUser.data.email || '',
    address: this.props.curUser.data.billing.address_line1 || '',
    apartment: this.props.curUser.data.billing.address_line2 || '',
    city: this.props.curUser.data.billing.address_city || '',
    zip: this.props.curUser.data.billing.zip || '',
    phone: this.props.curUser.data.billing.phone || '',
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
    firebase
      .store()
      .collection('users')
      .doc(this.props.curUser.id)
      .update({
        billing: {
          card: this.props.curUser.data.billing.card,
          address_city: this.state.city,
          address_state: this.props.curUser.data.billing.address_state,
          address_line1: this.state.address,
          address_line2: this.state.apartment,
          zip: this.state.zip,
          phone: this.state.phone,
        },
        email: this.state.email,
        name: this.state.firstName + ' ' + this.state.lastName,
      })
    this.setState({ editing: false })
  }
  render() {
    const curUser = this.props.curUser.data
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
        <Card className="shipping animated fadeInUp" height="32rem">
          <h3>Account Details</h3>
          <StyledHr margin="1rem" />
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
          <StyledHr margin="0" />
          {!this.state.editing ? (
            <StyledButton width="17rem" onClick={this.showEdit}>
              Edit
            </StyledButton>
          ) : (
            <StyledButton width="17rem" onClick={this.handleUpdate}>
              Update
            </StyledButton>
          )}
          {this.state.editing ? (
            <NavLink to="/account" onClick={this.cancel}>
              Cancel
            </NavLink>
          ) : null}
        </Card>
      </Container>
    )
  }
}

export default AccountDetails
