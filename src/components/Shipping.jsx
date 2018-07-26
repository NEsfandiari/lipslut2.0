import React, { Component } from 'react'
import styled from 'styled-components'
import { Card } from './atoms'

const Container = styled.div`
  border-radius: 6px;
  label {
    font-size: 0.8rem;
  }
  input {
    width: 17rem;
    margin-bottom: 0.5rem;
  }
  #checkbox {
    width: 3rem;
  }
  .address {
  }
  .half {
    display: flex;
    justify-content: space-between;
    input {
      width: 8rem;
    }
  }
`

class Shipping extends Component {
  state = {}
  render() {
    return (
      <Container>
        <Card>
          <h3>Shipping</h3>
          <input type="text" placeholder="Email" />
          <div>
            <input type="checkbox" id="checkbox" />
            <label> I'd like to hear from Lipslut</label>
          </div>
          <div className="address">
            <p>Address</p>
            <div className="half">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
            </div>
            <input type="text" placeholder="Address" />
            <input type="text" placeholder="Apt/Floor/Suite" />
            <div className="half">
              <input type="text" placeholder="City" />
              <input type="text" placeholder="Zip Code" />
            </div>
            <div className="half">
              <input type="text" placeholder="State" />
              <input type="text" placeholder="Phone" />
            </div>
          </div>
        </Card>
      </Container>
    )
  }
}

export default Shipping
