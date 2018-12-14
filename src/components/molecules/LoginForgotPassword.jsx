import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledInput, StyledButton } from '../atoms'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  font-size: 0.9rem;
  animation: fadein 0.3s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

class LoginForgotPassword extends Component {
  state = {
    email: '',
    status: 'Send Email',
  }
  static contextTypes = {
    firebase: PropTypes.object,
  }
  handleSubmit = e => {
    e.preventDefault()
    const { firebase } = this.context
    this.setState({ status: 'Sent!', email: '' })
    firebase.forgottenPassword(this, this.state.email)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  render() {
    return (
      <Container onSubmit={this.handleSubmit}>
        <p>
          Enter your email address and we will email you a link to reset your
          password.
        </p>
        <StyledInput
          aria-label="Email Address"
          placeholder="Email"
          name="email"
          onChange={this.handleChange}
          value={this.state.email}
          width="20rem"
        />
        <StyledButton width="20rem" height="2.2rem" margin="2rem">
          {this.state.status}
        </StyledButton>
      </Container>
    )
  }
}

export default LoginForgotPassword
