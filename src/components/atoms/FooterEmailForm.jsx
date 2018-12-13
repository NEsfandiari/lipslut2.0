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
    status: 'Sign Up',
  }
  handleSubmit = e => {
    e.preventDefault()
    let email = this.state.email

    // Netlify Form Encoding for Email Subscriberes
    const encode = data => {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&')
    }
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'email', email }),
    })
    this.setState({ email: '', status: 'Added!' })
  }
  handleChange = e => {
    this.setState({
      email: e.target.value,
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
      <Container
        onSubmit={this.handleSubmit}
        name="email"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <StyledInput
          id="emailForm"
          aria-label="Email Form"
          width="13rem"
          height="2.5rem"
          borderRadius="3px"
          marginBottom="0"
          type="email"
          name="form-name"
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
          {this.state.status}
        </StyledButton>
      </Container>
    )
  }
}

export default FooterEmailForm
