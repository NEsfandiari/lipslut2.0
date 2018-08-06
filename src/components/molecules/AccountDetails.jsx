import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Card, StyledButton, StyledHr, StyledInput, NavLink } from '../atoms'

const Container = styled.div`
  .details {
    max-height: 50vh;
    overflow: auto;
  }
  .details p {
    font-size: 0.9rem;
  }
  .labels {
    font-weight: 600;
    font-size: 1rem;
  }
  h3 {
    margin-bottom: 0;
  }
  .field {
    display: flex;
    flex-direction: column;
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
  cancel = e => {
    this.setState({ editing: false })
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  render() {
    const curUser = this.props.curUser.data
    const apartmentDisplay = curUser.billing.address_line2 ? 'inherit' : 'none'
    return (
      <Container>
        <Card className="shipping animated fadeInUp" height="32rem">
          <h3>Account Details</h3>
          <StyledHr margin="1rem" />
          {!this.state.editing ? (
            <div className="details">
              <p>
                <span className="labels">Name:</span>{' '}
                {this.state.firstName + ' ' + this.state.lastName}
              </p>
              <p>
                <span className="labels">Email:</span> {this.state.email}
              </p>
              <p>
                <span className="labels">Address:</span> {this.state.address}
              </p>
              <p>
                <span className="labels">City:</span> {this.state.city}
              </p>
              <p style={{ display: apartmentDisplay }}>
                <span className="labels">Apt/Suite:</span>{' '}
                {this.state.apartment}
              </p>
              <p>
                <span className="labels">Zip:</span> {this.state.zip}
              </p>
              <p>
                <span className="labels">Phone:</span> {this.state.phone}
              </p>
            </div>
          ) : (
            <form action="" className="details">
              <div className="field">
                <label htmlFor="">First Name</label>
                <StyledInput
                  type="text"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  name="firstName"
                  required
                  value={this.state.firstName}
                />
              </div>
              <div className="field">
                <label htmlFor="">Last Name</label>
                <StyledInput
                  type="text"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  name="lastName"
                  required
                  value={this.state.lastName}
                />
              </div>
              <div className="field">
                <label htmlFor="">Email</label>
                <StyledInput
                  type="text"
                  placeholder="Email"
                  onChange={this.handleChange}
                  name="email"
                  required
                  value={this.state.email}
                />
              </div>
              <div className="field">
                <label htmlFor="">Address</label>
                <StyledInput
                  type="text"
                  placeholder="Address"
                  onChange={this.handleChange}
                  name="address"
                  required
                  value={this.state.address}
                />
              </div>
              <div className="field" style={{ display: apartmentDisplay }}>
                <label htmlFor="">Apt/Suite</label>
                <StyledInput
                  type="text"
                  placeholder="Apt/Floor/Suite"
                  onChange={this.handleChange}
                  name="apartment"
                  value={this.state.apartment}
                />
              </div>
              <div className="field">
                <label htmlFor="">City</label>
                <StyledInput
                  type="text"
                  placeholder="City"
                  onChange={this.handleChange}
                  name="city"
                  value={this.state.city}
                />
              </div>
              <div className="field">
                <label htmlFor="">Zip</label>
                <StyledInput
                  type="text"
                  placeholder="Zip"
                  onChange={this.handleChange}
                  name="zip"
                  value={this.state.zip}
                />
              </div>
              <div className="field">
                <label htmlFor="">Phone</label>
                <StyledInput
                  type="tel"
                  placeholder="Phone"
                  onChange={this.handleChange}
                  placeholder="Phone #"
                  pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                  required
                  name="phone"
                  value={this.state.phone}
                />
              </div>
            </form>
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
