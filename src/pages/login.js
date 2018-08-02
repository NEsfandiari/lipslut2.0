import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import {
  StyledInput,
  StyledButton,
  GoogleIcon,
  NavLink,
  Card,
} from '../components/atoms'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .google {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin-left: 0.5rem;
    }
  }
  .errorMessage {
  }
`

class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
  }
  static contextTypes = {
    firebase: PropTypes.object,
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { auth, store } = this.context.firebase
    auth()
      .SignInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message
        this.setState({ errorMessage: errorMessage })
        console.log(errorCode)
      })
      .then(() => navigateTo('/'))
  }
  handleGoogle = e => {
    const { auth, store } = this.context.firebase
    auth()
      .signInWithPopup(new auth.GoogleAuthProvider())
      .catch(error => {
        var errorMessage = error.message
        this.setState({ errorMessage: errorMessage })
        console.error(error)
        // TODO: notify the user of the error
        return error
      })
      .then(() => navigateTo('/'))
  }

  render() {
    const displayError = {
      display: typeof this.state.errorMessage !== 'string' ? 'none' : 'inherit',
    }
    return (
      <Container>
        <Card>
          <form onSubmit={this.handleSubmit}>
            <h2>Welcome Back!</h2>
            <p className="errorMessage" style={displayError}>
              {this.state.errorMessage}
            </p>
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
          </form>
          <p>or</p>
          <StyledButton
            onClick={this.handleGoogle}
            width="17rem"
            height="2.5rem"
            color="black"
            backgroundColor="white"
            borderColor="#FF0086"
            borderWidth="2px"
            margin=".5rem"
            hoverColor="#F9F7F1"
            letterSpacing="0"
            className="google"
          >
            LOG IN WITH <GoogleIcon />
          </StyledButton>
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