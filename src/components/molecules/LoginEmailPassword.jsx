import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import { StyledInput, StyledButton } from '../atoms'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    const login = this
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => navigateTo('/'))
      .catch(function(error) {
        let errorMessage = error.message
        login.props.handleError(errorMessage)
      })
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
          LOG IN
        </StyledButton>
      </Container>
    )
  }
}

export default LoginEmailPassword
