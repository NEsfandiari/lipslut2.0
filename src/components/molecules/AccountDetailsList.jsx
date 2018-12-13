import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  overflow: auto;
  p {
    font-size: 0.75rem;
  }
  .labels {
    font-weight: 600;
    font-size: 0.9rem;
  }
`

class AccountDetailsForm extends Component {
  state = {}
  render() {
    const { firstName, lastName, email, phone } = this.props
    return (
      <Container>
        <p>
          <span className="labels">First Name:</span> {firstName}
        </p>
        <p>
          <span className="labels">Last Name:</span> {lastName}
        </p>
        <p>
          <span className="labels">Email:</span> {email}
        </p>
        <p>
          <span className="labels">Phone:</span> {phone}
        </p>
      </Container>
    )
  }
}

export default AccountDetailsForm
