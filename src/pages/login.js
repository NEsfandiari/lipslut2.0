import React, { Component } from 'react'
import styled from 'styled-components'
import {
  LoginEmailPassword,
  LoginGoogle,
  LoginFacebook,
  LoginForgotPassword,
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
  .forgotten {
    color: black;
    font-size: 0.8rem;
    letter-spacing: 0;
    cursor: pointer;
    :hover {
      color: #00a6f6;
    }
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
    text-align: center;
  }
  @media (max-width: 420px) {
    margin-top: 1rem;
    padding: 2rem;
  }
`

class Login extends Component {
  state = {
    errorMessage: null,
    forgotten: false,
  }
  componentDidMount() {
    this.props.resetSidebar()
  }
  handleError = errorMessage => {
    this.setState({ errorMessage: errorMessage })
  }

  handleForgottenPassword = () => {
    this.setState({ forgotten: !this.state.forgotten })
  }

  render() {
    const displayError = {
      display: typeof this.state.errorMessage !== 'string' ? 'none' : 'inherit',
    }
    return (
      <Container>
        <h2>{this.state.forgotten ? 'Forgot your password?' : 'Hey again!'}</h2>
        <p className="errorMessage animated fadeInRight" style={displayError}>
          {this.state.errorMessage}
        </p>
        {this.state.forgotten ? (
          <LoginForgotPassword handleError={this.handleError} />
        ) : (
          <LoginEmailPassword handleError={this.handleError} />
        )}
        <p>or</p>
        <LoginGoogle handleError={this.handleError} />
        <LoginFacebook handleError={this.handleError} />
        <NavLink
          to="/signup"
          fontSize=".8rem"
          hovercolor="#00a6f6"
          letterSpacing="0"
        >
          Don't have an account? <u>Create One!</u>
        </NavLink>
        <p className="forgotten">
          <u onClick={this.handleForgottenPassword}>
            {this.state.forgotten
              ? 'I remembered my password!'
              : 'Forgot your password?'}
          </u>
        </p>
      </Container>
    )
  }
}

export default lightBlueLayout(Login)
