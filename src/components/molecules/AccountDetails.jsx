import React, { Component } from 'react'
import styled from 'styled-components'
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
  }
  showEdit = e => {
    this.setState({ editing: true })
  }
  handleUpdate = e => {}
  cancel = e => {
    this.setState({ editing: false })
  }
  handleChange(e) {
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
                <span className="labels">Name:</span> {curUser.name}
              </p>
              <p>
                <span className="labels">Email:</span> {curUser.email}
              </p>
              <p>
                <span className="labels">Address:</span>{' '}
                {curUser.billing.address_line1}
              </p>
              <p>
                <span className="labels">City:</span>{' '}
                {curUser.billing.address_city}
              </p>
              <p style={{ display: apartmentDisplay }}>
                <span className="labels">Apt/Suite:</span>{' '}
                {curUser.billing.address_line2}
              </p>
              <p>
                <span className="labels">Zip:</span> {curUser.billing.zip}
              </p>
              <p>
                <span className="labels">Phone:</span> {curUser.billing.phone}
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
                  defaultValue={curUser.name.split(' ')[0]}
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
                  defaultValue={curUser.name.split(' ')[1]}
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
                  defaultValue={curUser.email}
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
                  defaultValue={curUser.billing.address_line1}
                />
              </div>
              <div className="field" style={{ display: apartmentDisplay }}>
                <label htmlFor="">Apt/Suite</label>
                <StyledInput
                  type="text"
                  placeholder="Apt/Floor/Suite"
                  onChange={this.handleChange}
                  name="apartment"
                  defaultValue={curUser.billing.address_line2}
                />
              </div>
              <div className="field">
                <label htmlFor="">City</label>
                <StyledInput
                  type="text"
                  placeholder="City"
                  onChange={this.handleChange}
                  name="apartment"
                  defaultValue={curUser.billing.address_city}
                />
              </div>
              <div className="field">
                <label htmlFor="">Zip</label>
                <StyledInput
                  type="text"
                  placeholder="Zip"
                  onChange={this.handleChange}
                  name="apartment"
                  defaultValue={curUser.billing.zip}
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
                  defaultValue={curUser.billing.phone}
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
