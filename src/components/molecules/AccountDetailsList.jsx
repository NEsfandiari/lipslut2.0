import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  max-height: 50vh;
  overflow: auto;
  p {
    font-size: 0.9rem;
  }
  .labels {
    font-weight: 600;
    font-size: 1rem;
  }
`

class AccountDetailsForm extends Component {
  state = {}
  render() {
    const {
      firstName,
      lastName,
      email,
      address,
      apartment,
      city,
      zip,
      phone,
      curUser,
    } = this.props
    const apartmentDisplay = curUser.billing.address_line2 ? 'inherit' : 'none'
    return (
      <Container>
        <p>
          <span className="labels">Name:</span> {firstName + ' ' + lastName}
        </p>
        <p>
          <span className="labels">Email:</span> {email}
        </p>
        <p>
          <span className="labels">Address:</span> {address}
        </p>
        <p>
          <span className="labels">City:</span> {city}
        </p>
        <p style={{ display: apartmentDisplay }}>
          <span className="labels">Apt/Suite:</span> {apartment}
        </p>
        <p>
          <span className="labels">Zip:</span> {zip}
        </p>
        <p>
          <span className="labels">Phone:</span> {phone}
        </p>
      </Container>
    )
  }
}

export default AccountDetailsForm
