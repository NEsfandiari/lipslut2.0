import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, StyledInput, FiftyStateDropdownInput } from '../atoms'
import 'animate.css'
const Container = styled.div`
  border-radius: 6px;
  margin: 1rem;
  label {
    font-size: 0.8rem;
  }
  #checkbox {
    width: 2rem;
  }
  .address {
    margin-top: 0.5rem;
    p {
      margin-bottom: 0.5rem;
    }
  }
  .half {
    display: flex;
    justify-content: space-between;
    input:first-child {
      margin-right: 1rem;
    }
    input {
      width: 50%;
    }
  }
  @media (max-width: 1200px) {
    input {
      width: 75vw;
    }
    select {
      flex-basis: 50%;
    }
  }
`

class CheckoutShipping extends Component {
  render() {
    const {
      handleChange,
      email,
      city,
      address,
      apartment,
      state,
      zip,
      phone,
      firstName,
      lastName,
      newsletter,
    } = this.props
    return (
      <Container>
        <Card className="animated fadeInUp">
          <h3>Shipping</h3>
          <div className="email">
            <StyledInput
              aria-label="Email"
              type="text"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              required
              value={email}
            />
            <div>
              <StyledInput
                aria-label="Newsletter"
                type="checkbox"
                id="checkbox"
                onClick={handleChange}
                name="newsletter"
                checked={newsletter}
              />
              <label> I'd like to hear from Lipslut</label>
            </div>
          </div>
          <div className="address">
            <p>Address</p>
            <div className="half">
              <StyledInput
                type="text"
                aria-label="First Name"
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
                required
                value={firstName}
              />
              <StyledInput
                aria-label="Last Name"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
                required
                value={lastName}
              />
            </div>
            <StyledInput
              type="text"
              aria-label="Address"
              placeholder="Address"
              onChange={handleChange}
              name="address"
              required
              value={address}
            />
            <StyledInput
              type="text"
              aria-label="Address Line 2"
              placeholder="Apt/Floor/Suite"
              onChange={handleChange}
              name="apartment"
              value={apartment}
            />
            <div className="half">
              <StyledInput
                type="text"
                aria-label="City"
                placeholder="City"
                onChange={handleChange}
                name="city"
                required
                value={city}
              />
              <StyledInput
                type="text"
                aria-label="Zip"
                placeholder="Zip Code"
                onChange={handleChange}
                name="zip"
                required
                value={zip}
              />
            </div>
            <div className="half">
              <StyledInput
                type="tel"
                aria-label="Telephone Number"
                placeholder="Phone"
                onChange={handleChange}
                placeholder="Phone #"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                required
                name="phone"
                value={phone}
              />
              <FiftyStateDropdownInput
                handleChange={handleChange}
                state={state}
              />
            </div>
          </div>
        </Card>
      </Container>
    )
  }
}

export default CheckoutShipping
