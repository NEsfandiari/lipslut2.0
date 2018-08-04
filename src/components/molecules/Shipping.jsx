import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, StyledInput } from '../atoms'
import 'animate.css'

const Container = styled.div`
  border-radius: 6px;
  label {
    font-size: 0.8rem;
  }
  select {
    outline: none;
    border-radius: 6px;
    padding-left: 1rem;
    border-style: solid;
    border-color: #f0f0f0;
    border-width: 2px;
    background: white;
    height: 1.8rem;
    width: 8rem;
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

class Shipping extends Component {
  render() {
    const {
      handleChange,
      email,
      address_city,
      address_line1,
      address_line2,
      address_state,
      zip,
      phone,
      firstName,
      lastName,
    } = this.props
    return (
      <Container>
        <Card className="animated fadeInLeft">
          <h3>Shipping</h3>
          <div className="email">
            <StyledInput
              type="text"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              required
              defaultValue={email}
            />
            <div>
              <StyledInput
                type="checkbox"
                id="checkbox"
                onChange={handleChange}
                name="newsletter"
              />
              <label> I'd like to hear from Lipslut</label>
            </div>
          </div>
          <div className="address">
            <p>Address</p>
            <div className="half">
              <StyledInput
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
                required
                defaultValue={firstName}
              />
              <StyledInput
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
                required
                defaultValue={lastName}
              />
            </div>
            <StyledInput
              type="text"
              placeholder="Address"
              onChange={handleChange}
              name="address"
              required
              defaultValue={address_line1}
            />
            <StyledInput
              type="text"
              placeholder="Apt/Floor/Suite"
              onChange={handleChange}
              name="apartment"
              defaultValue={address_line2}
            />
            <div className="half">
              <StyledInput
                type="text"
                placeholder="City"
                onChange={handleChange}
                name="city"
                required
                defaultValue={address_city}
              />
              <StyledInput
                type="text"
                placeholder="Zip Code"
                onChange={handleChange}
                name="zip"
                required
                defaultValue={zip}
              />
            </div>
            <div className="half">
              <StyledInput
                type="tel"
                placeholder="Phone"
                onChange={handleChange}
                placeholder="Phone #"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                required
                name="phone"
                defaultValue={phone}
              />
              <select name="state" onChange={handleChange} required>
                <option
                  selected={address_state === '' ? 'selected' : ''}
                  disabled
                >
                  State
                </option>
                <option
                  selected={address_state === 'AL' ? 'selected' : ''}
                  value="AL"
                >
                  Alabama
                </option>
                <option
                  selected={address_state === 'AK' ? 'selected' : ''}
                  value="AK"
                >
                  Alaska
                </option>
                <option
                  selected={address_state === 'AZ' ? 'selected' : ''}
                  value="AZ"
                >
                  Arizona
                </option>
                <option
                  selected={address_state === 'AR' ? 'selected' : ''}
                  value="AR"
                >
                  Arkansas
                </option>
                <option
                  selected={address_state === 'CA' ? 'selected' : ''}
                  value="CA"
                >
                  California
                </option>
                <option
                  selected={address_state === 'CO' ? 'selected' : ''}
                  value="CO"
                >
                  Colorado
                </option>
                <option
                  selected={address_state === 'CT' ? 'selected' : ''}
                  value="CT"
                >
                  Connecticut
                </option>
                <option
                  selected={address_state === 'DE' ? 'selected' : ''}
                  value="DE"
                >
                  Delaware
                </option>
                <option
                  selected={address_state === 'DC' ? 'selected' : ''}
                  value="DC"
                >
                  District Of Columbia
                </option>
                <option
                  selected={address_state === 'FL' ? 'selected' : ''}
                  value="FL"
                >
                  Florida
                </option>
                <option
                  selected={address_state === 'GA' ? 'selected' : ''}
                  value="GA"
                >
                  Georgia
                </option>
                <option
                  selected={address_state === 'HI' ? 'selected' : ''}
                  value="HI"
                >
                  Hawaii
                </option>
                <option
                  selected={address_state === 'ID' ? 'selected' : ''}
                  value="ID"
                >
                  Idaho
                </option>
                <option
                  selected={address_state === 'IL' ? 'selected' : ''}
                  value="IL"
                >
                  Illinois
                </option>
                <option
                  selected={address_state === 'IN' ? 'selected' : ''}
                  value="IN"
                >
                  Indiana
                </option>
                <option
                  selected={address_state === 'IA' ? 'selected' : ''}
                  value="IA"
                >
                  Iowa
                </option>
                <option
                  selected={address_state === 'KS' ? 'selected' : ''}
                  value="KS"
                >
                  Kansas
                </option>
                <option
                  selected={address_state === 'KY' ? 'selected' : ''}
                  value="KY"
                >
                  Kentucky
                </option>
                <option
                  selected={address_state === 'LA' ? 'selected' : ''}
                  value="LA"
                >
                  Louisiana
                </option>
                <option
                  selected={address_state === 'ME' ? 'selected' : ''}
                  value="ME"
                >
                  Maine
                </option>
                <option
                  selected={address_state === 'MD' ? 'selected' : ''}
                  value="MD"
                >
                  Maryland
                </option>
                <option
                  selected={address_state === 'MA' ? 'selected' : ''}
                  value="MA"
                >
                  Massachusetts
                </option>
                <option
                  selected={address_state === 'MI' ? 'selected' : ''}
                  value="MI"
                >
                  Michigan
                </option>
                <option
                  selected={address_state === 'MN' ? 'selected' : ''}
                  value="MN"
                >
                  Minnesota
                </option>
                <option
                  selected={address_state === 'MS' ? 'selected' : ''}
                  value="MS"
                >
                  Mississippi
                </option>
                <option
                  selected={address_state === 'MO' ? 'selected' : ''}
                  value="MO"
                >
                  Missouri
                </option>
                <option
                  selected={address_state === 'MT' ? 'selected' : ''}
                  value="MT"
                >
                  Montana
                </option>
                <option
                  selected={address_state === 'NE' ? 'selected' : ''}
                  value="NE"
                >
                  Nebraska
                </option>
                <option
                  selected={address_state === 'NV' ? 'selected' : ''}
                  value="NV"
                >
                  Nevada
                </option>
                <option
                  selected={address_state === 'NH' ? 'selected' : ''}
                  value="NH"
                >
                  New Hampshire
                </option>
                <option
                  selected={address_state === 'NJ' ? 'selected' : ''}
                  value="NJ"
                >
                  New Jersey
                </option>
                <option
                  selected={address_state === 'NM' ? 'selected' : ''}
                  value="NM"
                >
                  New Mexico
                </option>
                <option
                  selected={address_state === 'NY' ? 'selected' : ''}
                  value="NY"
                >
                  New York
                </option>
                <option
                  selected={address_state === 'NC' ? 'selected' : ''}
                  value="NC"
                >
                  North Carolina
                </option>
                <option
                  selected={address_state === 'ND' ? 'selected' : ''}
                  value="ND"
                >
                  North Dakota
                </option>
                <option
                  selected={address_state === 'OH' ? 'selected' : ''}
                  value="OH"
                >
                  Ohio
                </option>
                <option
                  selected={address_state === 'OK' ? 'selected' : ''}
                  value="OK"
                >
                  Oklahoma
                </option>
                <option
                  selected={address_state === 'OR' ? 'selected' : ''}
                  value="OR"
                >
                  Oregon
                </option>
                <option
                  selected={address_state === 'PA' ? 'selected' : ''}
                  value="PA"
                >
                  Pennsylvania
                </option>
                <option
                  selected={address_state === 'RI' ? 'selected' : ''}
                  value="RI"
                >
                  Rhode Island
                </option>
                <option
                  selected={address_state === 'SC' ? 'selected' : ''}
                  value="SC"
                >
                  South Carolina
                </option>
                <option
                  selected={address_state === 'SD' ? 'selected' : ''}
                  value="SD"
                >
                  South Dakota
                </option>
                <option
                  selected={address_state === 'TN' ? 'selected' : ''}
                  value="TN"
                >
                  Tennessee
                </option>
                <option
                  selected={address_state === 'TX' ? 'selected' : ''}
                  value="TX"
                >
                  Texas
                </option>
                <option
                  selected={address_state === 'UT' ? 'selected' : ''}
                  value="UT"
                >
                  Utah
                </option>
                <option
                  selected={address_state === 'VT' ? 'selected' : ''}
                  value="VT"
                >
                  Vermont
                </option>
                <option
                  selected={address_state === 'VA' ? 'selected' : ''}
                  value="VA"
                >
                  Virginia
                </option>
                <option
                  selected={address_state === 'WA' ? 'selected' : ''}
                  value="WA"
                >
                  Washington
                </option>
                <option
                  selected={address_state === 'WV' ? 'selected' : ''}
                  value="WV"
                >
                  West Virginia
                </option>
                <option
                  selected={address_state === 'WI' ? 'selected' : ''}
                  value="WI"
                >
                  Wisconsin
                </option>
                <option
                  selected={address_state === 'WY' ? 'selected' : ''}
                  value="WY"
                >
                  Wyoming
                </option>
              </select>
            </div>
          </div>
        </Card>
      </Container>
    )
  }
}

export default Shipping
