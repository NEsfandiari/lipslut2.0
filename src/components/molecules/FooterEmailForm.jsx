import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledButton, StyledInput } from '../atoms'
import { MdChevronRight } from 'react-icons/lib/md'

// TODO: Switch Form to Formspree

const Container = styled.form`
  @media (max-width: 420px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  input {
    text-align: center;
    padding-left: 0;
    border: 2px solid black;
  }
  .button {
    position: relative;
    right: 0.5%;
    padding-top: 0.35rem;
    transition: 0.3s ease;
  }
  svg {
    margin-bottom: 0.3rem;
  }
`

class FooterEmailForm extends Component {
  state = {
    email: '',
    color: '#FF009A',
  }
  static contextTypes = {
    firebase: PropTypes.object,
  }
  handleSubmit = e => {
    e.preventDefault()
    const { firebase } = this.context
    firebase.addEmail(this.state.email)
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
      <Container onSubmit={this.handleSubmit}>
        <StyledInput
          aria-label="Email Form"
          width="13rem"
          height="3rem"
          borderRadius="3px"
          marginBottom="0"
          type="email"
          placeholder="Enter email and join us!"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <StyledButton
          margin="0rem"
          backgroundColor="white"
          borderColor="#FF009A"
          borderWidth="2px"
          width="5rem"
          onMouseEnter={this.handleHoverIn}
          onMouseLeave={this.handleHoverOut}
          className="button"
        >
          <MdChevronRight
            color={this.state.color}
            size="2rem"
            className="chevron"
          />
        </StyledButton>
      </Container>
    )
  }
}

export default FooterEmailForm
