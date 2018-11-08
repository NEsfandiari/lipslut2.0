import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import { StyledInput, StyledButton } from '../atoms'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 14rem;
  .name {
    display: flex;
    justify-content: space-between;
    width: 22rem;
  }
  .radio {
    margin-top: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 17rem;
    input {
      margin: 0;
      height: 1.5rem;
    }
  }
`

class SignupEmailPassword extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    newsletter: false,
  }
  static contextTypes = {
    firebase: PropTypes.object,
  }
  handleChange = e => {
    if (e.target.type == 'checkbox') {
      this.setState({
        [e.target.name]: e.target.checked,
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    const { firebase } = this.context
    const { firstName, lastName, email, password, newsletter } = this.state
    firebase.signupEmailPassword(
      this,
      firstName,
      lastName,
      email,
      password,
      newsletter
    )
  }
  render() {
    return (
      <Container onSubmit={this.handleSubmit}>
        <div className="name">
          <StyledInput
            aria-label="First Name"
            type="text"
            width="10.5rem"
            placeholder="First Name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <StyledInput
            aria-label="Last Name"
            type="text"
            width="10.5rem"
            placeholder="Last Name"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
        </div>
        <StyledInput
          type="email"
          aria-label="Email Address"
          placeholder="Email"
          name="email"
          onChange={this.handleChange}
          value={this.state.email}
          width="22rem"
        />
        <StyledInput
          placeholder="Password"
          aria-label="Password"
          name="password"
          onChange={this.handleChange}
          value={this.state.password}
          width="22rem"
        />
        <StyledButton width="22rem" height="2.2rem" margin="0">
          SIGN UP
        </StyledButton>
        <div className="radio">
          <StyledInput
            aria-label="Newsletter"
            width="2rem"
            type="radio"
            onClick={this.handleChange}
            value={this.state.newsletter}
            name="newsletter"
            id="newsletter"
          />
          <label for="newsletter"> I'd like to hear from Lipslut</label>
        </div>
      </Container>
    )
  }
}

export default SignupEmailPassword
