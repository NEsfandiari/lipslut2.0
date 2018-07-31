import React, { Component } from 'react'
import styled from 'styled-components'
import { Card } from '../atoms'

const Container = styled.div`
  border-radius: 6px;
  label {
    font-size: 0.8rem;
  }
  input {
    width: 17rem;
    margin-bottom: 0.5rem;
    border-style: solid;
    border-color: #f0f0f0;
    border-width: 2px;
    outline: none;
    border-radius: 6px;
    padding-left: 1rem;
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
    const { handleChange } = this.props
    return (
      <Container>
        <Card>
          <h3>Shipping</h3>
          <div className="email">
            <input
              type="text"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              required
            />
            <div>
              <input
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
              <input
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              onChange={handleChange}
              name="address"
              required
            />
            <input
              type="text"
              placeholder="Apt/Floor/Suite"
              onChange={handleChange}
              name="apartment"
            />
            <div className="half">
              <input
                type="text"
                placeholder="City"
                onChange={handleChange}
                name="city"
                required
              />
              <input
                type="text"
                placeholder="Zip Code"
                onChange={handleChange}
                name="zip"
                required
              />
            </div>
            <div className="half">
              <input
                type="tel"
                placeholder="Phone"
                onChange={handleChange}
                placeholder="Phone #"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                required
                name="phone"
              />
              <select name="state" onChange={handleChange} required>
                <option selected disabled>
                  State
                </option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>
          </div>
        </Card>
      </Container>
    )
  }
}

export default Shipping
