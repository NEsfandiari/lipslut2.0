import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.select`
  outline: none;
  border-radius: 6px;
  padding-left: 1rem;
  border-style: solid;
  border-color: #f0f0f0;
  border-width: 2px;
  background: white;
  height: 1.8rem;
  width: 8rem;
`

class FiftyStateDropdownInput extends Component {
  render() {
    const { handleChange, state } = this.props
    return (
      <Container name="state" onChange={handleChange} required>
        <option selected={state === '' ? 'selected' : ''} disabled>
          State
        </option>
        <option selected={state === 'AL' ? 'selected' : ''} value="AL">
          Alabama
        </option>
        <option selected={state === 'AK' ? 'selected' : ''} value="AK">
          Alaska
        </option>
        <option selected={state === 'AZ' ? 'selected' : ''} value="AZ">
          Arizona
        </option>
        <option selected={state === 'AR' ? 'selected' : ''} value="AR">
          Arkansas
        </option>
        <option selected={state === 'CA' ? 'selected' : ''} value="CA">
          California
        </option>
        <option selected={state === 'CO' ? 'selected' : ''} value="CO">
          Colorado
        </option>
        <option selected={state === 'CT' ? 'selected' : ''} value="CT">
          Connecticut
        </option>
        <option selected={state === 'DE' ? 'selected' : ''} value="DE">
          Delaware
        </option>
        <option selected={state === 'DC' ? 'selected' : ''} value="DC">
          District Of Columbia
        </option>
        <option selected={state === 'FL' ? 'selected' : ''} value="FL">
          Florida
        </option>
        <option selected={state === 'GA' ? 'selected' : ''} value="GA">
          Georgia
        </option>
        <option selected={state === 'HI' ? 'selected' : ''} value="HI">
          Hawaii
        </option>
        <option selected={state === 'ID' ? 'selected' : ''} value="ID">
          Idaho
        </option>
        <option selected={state === 'IL' ? 'selected' : ''} value="IL">
          Illinois
        </option>
        <option selected={state === 'IN' ? 'selected' : ''} value="IN">
          Indiana
        </option>
        <option selected={state === 'IA' ? 'selected' : ''} value="IA">
          Iowa
        </option>
        <option selected={state === 'KS' ? 'selected' : ''} value="KS">
          Kansas
        </option>
        <option selected={state === 'KY' ? 'selected' : ''} value="KY">
          Kentucky
        </option>
        <option selected={state === 'LA' ? 'selected' : ''} value="LA">
          Louisiana
        </option>
        <option selected={state === 'ME' ? 'selected' : ''} value="ME">
          Maine
        </option>
        <option selected={state === 'MD' ? 'selected' : ''} value="MD">
          Maryland
        </option>
        <option selected={state === 'MA' ? 'selected' : ''} value="MA">
          Massachusetts
        </option>
        <option selected={state === 'MI' ? 'selected' : ''} value="MI">
          Michigan
        </option>
        <option selected={state === 'MN' ? 'selected' : ''} value="MN">
          Minnesota
        </option>
        <option selected={state === 'MS' ? 'selected' : ''} value="MS">
          Mississippi
        </option>
        <option selected={state === 'MO' ? 'selected' : ''} value="MO">
          Missouri
        </option>
        <option selected={state === 'MT' ? 'selected' : ''} value="MT">
          Montana
        </option>
        <option selected={state === 'NE' ? 'selected' : ''} value="NE">
          Nebraska
        </option>
        <option selected={state === 'NV' ? 'selected' : ''} value="NV">
          Nevada
        </option>
        <option selected={state === 'NH' ? 'selected' : ''} value="NH">
          New Hampshire
        </option>
        <option selected={state === 'NJ' ? 'selected' : ''} value="NJ">
          New Jersey
        </option>
        <option selected={state === 'NM' ? 'selected' : ''} value="NM">
          New Mexico
        </option>
        <option selected={state === 'NY' ? 'selected' : ''} value="NY">
          New York
        </option>
        <option selected={state === 'NC' ? 'selected' : ''} value="NC">
          North Carolina
        </option>
        <option selected={state === 'ND' ? 'selected' : ''} value="ND">
          North Dakota
        </option>
        <option selected={state === 'OH' ? 'selected' : ''} value="OH">
          Ohio
        </option>
        <option selected={state === 'OK' ? 'selected' : ''} value="OK">
          Oklahoma
        </option>
        <option selected={state === 'OR' ? 'selected' : ''} value="OR">
          Oregon
        </option>
        <option selected={state === 'PA' ? 'selected' : ''} value="PA">
          Pennsylvania
        </option>
        <option selected={state === 'RI' ? 'selected' : ''} value="RI">
          Rhode Island
        </option>
        <option selected={state === 'SC' ? 'selected' : ''} value="SC">
          South Carolina
        </option>
        <option selected={state === 'SD' ? 'selected' : ''} value="SD">
          South Dakota
        </option>
        <option selected={state === 'TN' ? 'selected' : ''} value="TN">
          Tennessee
        </option>
        <option selected={state === 'TX' ? 'selected' : ''} value="TX">
          Texas
        </option>
        <option selected={state === 'UT' ? 'selected' : ''} value="UT">
          Utah
        </option>
        <option selected={state === 'VT' ? 'selected' : ''} value="VT">
          Vermont
        </option>
        <option selected={state === 'VA' ? 'selected' : ''} value="VA">
          Virginia
        </option>
        <option selected={state === 'WA' ? 'selected' : ''} value="WA">
          Washington
        </option>
        <option selected={state === 'WV' ? 'selected' : ''} value="WV">
          West Virginia
        </option>
        <option selected={state === 'WI' ? 'selected' : ''} value="WI">
          Wisconsin
        </option>
        <option selected={state === 'WY' ? 'selected' : ''} value="WY">
          Wyoming
        </option>
      </Container>
    )
  }
}

export default FiftyStateDropdownInput
