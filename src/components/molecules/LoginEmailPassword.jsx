import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import { StyledInput, StyledButton } from '../atoms'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
`

class LoginEmailPassword extends Component {
  state = {
    email: '',
    password: '',
  }
  static contextTypes = {
    firebase: PropTypes.object,
  }
  handleSubmit = e => {
    e.preventDefault()
    const { firebase } = this.context
    const { email, password } = this.state
    firebase.login(this, 'emailPassword', email, password)
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  render() {
    return (
      <Container onSubmit={this.handleSubmit}>
        <StyledInput
          aria-label="Email Address"
          placeholder="Email"
          name="email"
          onChange={this.handleChange}
          value={this.state.email}
          width="22rem"
        />
        <StyledInput
          aria-label="Email Address"
          placeholder="Password"
          name="password"
          onChange={this.handleChange}
          value={this.state.password}
          width="22rem"
        />
        <StyledButton width="22rem" height="2.2rem" margin="2rem">
          LOG IN
        </StyledButton>
      </Container>
    )
  }
}

export default LoginEmailPassword
