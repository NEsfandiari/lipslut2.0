import React, { Component } from 'react'
import styled from 'styled-components'
import { StyledInput } from '../atoms'

const Container = styled.form`
  max-height: 50vh;
  overflow: auto;
  p {
    font-size: 0.9rem;
  }
  .field {
    display: flex;
    flex-direction: column;
  }
`

class AccountDetailsForm extends Component {
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
      handleChange,
      curUser,
    } = this.props
    const apartmentDisplay = curUser.billing.address_line2 ? 'inherit' : 'none'

    return (
      <Container>
        <div className="field">
          <label htmlFor="">First Name</label>
          <StyledInput
            type="text"
            placeholder="First Name"
            onChange={handleChange}
            name="firstName"
            required
            value={firstName}
          />
        </div>
        <div className="field">
          <label htmlFor="">Last Name</label>
          <StyledInput
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            name="lastName"
            required
            value={lastName}
          />
        </div>
        <div className="field">
          <label htmlFor="">Email</label>
          <StyledInput
            type="text"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            required
            value={email}
          />
        </div>
        <div className="field">
          <label htmlFor="">Address</label>
          <StyledInput
            type="text"
            placeholder="Address"
            onChange={handleChange}
            name="address"
            required
            value={address}
          />
        </div>
        <div className="field" style={{ display: apartmentDisplay }}>
          <label htmlFor="">Apt/Suite</label>
          <StyledInput
            type="text"
            placeholder="Apt/Floor/Suite"
            onChange={handleChange}
            name="apartment"
            required
            value={apartment}
          />
        </div>
        <div className="field">
          <label htmlFor="">City</label>
          <StyledInput
            type="text"
            placeholder="City"
            onChange={handleChange}
            required
            name="city"
            value={city}
          />
        </div>
        <div className="field">
          <label htmlFor="">Zip</label>
          <StyledInput
            type="text"
            placeholder="Zip"
            onChange={handleChange}
            required
            name="zip"
            value={zip}
          />
        </div>
        <div className="field">
          <label htmlFor="">Phone</label>
          <StyledInput
            type="tel"
            placeholder="Phone"
            onChange={handleChange}
            placeholder="Phone #"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            required
            name="phone"
            value={phone}
          />
        </div>
      </Container>
    )
  }
}

export default AccountDetailsForm
