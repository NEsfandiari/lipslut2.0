import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledButton, StyledInput } from './atoms'

const Container = styled.form`
  @media (max-width: 420px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  input {
    text-align: center;
    padding-left: 0;
  }
`

class HomePageEmailForm extends Component {
  state = {
    email: '',
    status: 'JOIN US',
  }
  static contextTypes = {
    firebase: PropTypes.object,
  }
  handleSubmit = e => {
    e.preventDefault()
    const { firebase } = this.context
    firebase.addEmail(this.state.email)
    this.setState({ status: 'WELCOME!', email: '' })
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
          aria-label="Email Form"
          width="13rem"
          height="3rem"
          borderRadius="3px"
          marginBottom="0"
          type="email"
          placeholder="Email Address"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <StyledButton>{this.state.status}</StyledButton>
      </Container>
    )
  }
}

export default HomePageEmailForm
