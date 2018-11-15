import React, { Component } from 'react'
import styled from 'styled-components'
import { NavLink } from '../components/atoms'
import {
  SignupEmailPassword,
  SignupGoogle,
  SignupFacebook,
} from '../components/molecules'

import lightBlueLayout from '../layouts/lightBlue.jsx'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  animation: fadein 1s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .errorMessage {
    width: 100%;
    text-align: center;
    padding: 0.5rem;
    border-radius: 4px;
    background-color: #ffa62c;
    color: white;
    font-size: 0.8rem;
  }
  @media (max-width: 420px) {
    margin-top: 1rem;
  }
`

class Signup extends Component {
  state = {
    errorMessage: null,
  }
  componentDidMount() {
    this.props.resetSidebar()
  }
  handleError = errorMessage => {
    this.setState({ errorMessage: errorMessage })
  }
  render() {
    const displayError = {
      display: typeof this.state.errorMessage !== 'string' ? 'none' : 'inherit',
    }
    return (
      <Container>
        <h2>Create Account</h2>
        <p className="errorMessage animated fadeInRight" style={displayError}>
          {this.state.errorMessage}
        </p>
        <SignupEmailPassword handleError={this.handleError} />
        <p>or</p>
        <SignupGoogle handleError={this.handleError} />
        <SignupFacebook handleError={this.handleError} />

        <NavLink
          to="/login"
          fontSize=".8rem"
          hoverColor="#00a6f6"
          letterSpacing="0"
        >
          Already have an account? <u>Log In!</u>
        </NavLink>
      </Container>
    )
  }
}

export default lightBlueLayout(Signup)
