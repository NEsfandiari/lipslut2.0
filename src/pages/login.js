import React, { Component } from 'react'
import styled from 'styled-components'
import {
  LoginEmailPassword,
  LoginGoogle,
  LoginFacebook,
} from '../components/molecules'
import { NavLink, Card } from '../components/atoms'
import 'animate.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  
  p{
    margin-bottom: .5rem;
  }
  .errorMessage {
    width: 100%;
    text-align: center;
    padding: .5rem;
    border-radius: 4px
    background-color: #FFA62C;
    color: white;
    font-size: .8rem;
  }
  @media (max-width: 420px) {
    margin-top: 1rem;
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
      <Container className="animated fadeInUp">
        <Card height="31rem">
          <h2>Welcome Back!</h2>
          <p className="errorMessage animated fadeInRight" style={displayError}>
            {this.state.errorMessage}
          </p>
          <LoginEmailPassword handleError={this.handleError} />
          <p>or</p>
          <LoginGoogle handleError={this.handleError} />
          <LoginFacebook handleError={this.handleError} />
          <p>
            Don't have an account?{' '}
            <NavLink
              to="/signup"
              fontSize=".8rem"
              hoverColor="#00a6f6"
              letterSpacing="0"
            >
              Sign Up
            </NavLink>
          </p>
        </Card>
      </Container>
    )
  }
}

export default Login
