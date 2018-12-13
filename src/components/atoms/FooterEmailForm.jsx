import React, { Component } from 'react'
import styled from 'styled-components'
import { StyledButton, StyledInput } from './'

const Container = styled.form`
  display: flex;
  align-items: center;

  input {
    padding-left: 0;
  }
  .button {
    transition: 0.3s ease;
  }
`

class FooterEmailForm extends Component {
  state = {
    email: '',
    color: '#FF009A',
  }
  handleSubmit = e => {
    e.preventDefault()
    this.setState({ email: '' })
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleHoverIn = e => {
    this.setState({
      color: 'white',
    })
  }
  handleHoverOut = e => {
    this.setState({
      color: '#FF009A',
    })
  }
  render() {
    return (
      <Container onSubmit={this.handleSubmit} netlify name="email">
        <StyledInput
          id="emailForm"
          aria-label="Email Form"
          width="13rem"
          height="2.5rem"
          borderRadius="3px"
          marginBottom="0"
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <StyledButton
          margin="1rem"
          height="2.5rem"
          width="7rem"
          onMouseEnter={this.handleHoverIn}
          onMouseLeave={this.handleHoverOut}
          className="button"
        >
          Sign Up
        </StyledButton>
      </Container>
    )
  }
}

export default FooterEmailForm
