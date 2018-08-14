import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import { StyledInput, StyledButton } from '../atoms'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  .name {
    display: flex;
    justify-content: space-between;
    width: 17rem;
  }
  .checkbox {
    margin-top: 0.4rem;
    display: flex;
    justify-content: center;
    width: 17rem;
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
            type="text"
            width="8rem"
            placeholder="First Name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <StyledInput
            type="text"
            width="8rem"
            placeholder="Last Name"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
        </div>
        <StyledInput
          type="email"
          placeholder="Email"
          name="email"
          onChange={this.handleChange}
          value={this.state.email}
        />
        <StyledInput
          placeholder="Password"
          name="password"
          onChange={this.handleChange}
          value={this.state.password}
        />
        <StyledButton width="17rem" height="2rem" margin="0">
          SIGN UP
        </StyledButton>
        <div className="checkbox">
          <StyledInput
            width="2rem"
            type="checkbox"
            onClick={this.handleChange}
            value={this.state.newsletter}
            name="newsletter"
          />
          <label> I'd like to hear from Lipslut</label>
        </div>
      </Container>
    )
  }
}

export default SignupEmailPassword
