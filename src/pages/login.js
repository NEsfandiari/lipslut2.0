import React, { Component } from 'react'
import styled from 'styled-components'
import {
  LoginEmailPassword,
  LoginGoogle,
  LoginFacebook,
} from '../components/molecules'
import { NavLink } from '../components/atoms'
import lightBlueLayout from '../layouts/lightBlue.jsx'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  a {
    text-decoration-line: default;
  }
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
    padding: 0rem;
  }
`

class Login extends Component {
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
        <h2>Hey again!</h2>
        <p className="errorMessage animated fadeInRight" style={displayError}>
          {this.state.errorMessage}
        </p>
        <LoginEmailPassword handleError={this.handleError} />
        <p>or</p>
        <LoginGoogle handleError={this.handleError} />
        <LoginFacebook handleError={this.handleError} />
        <NavLink
          to="/signup"
          fontSize=".8rem"
          hoverColor="#00a6f6"
          letterSpacing="0"
        >
          Don't have an account? Create One!
        </NavLink>
        <NavLink
          to="/signup"
          fontSize=".8rem"
          hoverColor="#00a6f6"
          letterSpacing="0"
        >
          Forgot your password?
        </NavLink>
      </Container>
    )
  }
}

export default lightBlueLayout(Login)
