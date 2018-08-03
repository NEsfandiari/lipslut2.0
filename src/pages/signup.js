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
  .name {
    display: flex;
    justify-content: space-between;
    width: 17rem;
  }
  .checkbox {
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    width: 17rem;
  }
  .google {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin-left: 0.5rem;
    }
  }
`

class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    newsletter: '',
    errorMessage: '',
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
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        var errorMessage = error.message
        this.setState({ errorMessage: errorMessage })
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
      })
      .then(() => navigateTo('/'))
  }
  render() {
    return (
      <Container>
        <Card height="31rem">
          <form onSubmit={this.handleSubmit}>
            <h2>Create Account</h2>
            <div className="name">
              <StyledInput
                type="text"
                width="8rem"
                placeholder="First Name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              <StyledInput
                type="text"
                width="8rem"
                placeholder="Last Name"
                name="lastName"
                onChange={this.handleChange}
                value={this.state.lastName}
              />
            </div>
            <StyledInput
              type="email"
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
              SIGN UP
            </StyledButton>
            <div className="checkbox">
              <StyledInput
                width="2rem"
                type="checkbox"
                id="checkbox"
                onChange={this.handleChange}
                value={this.state.checkbox}
                name="newsletter"
              />
              <label> I'd like to hear from Lipslut</label>
            </div>
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
            hoverColor="#F9F7F1"
            margin=".5rem"
            className="google"
          >
            SIGN UP WITH <GoogleIcon />
          </StyledButton>
          <p>
            Already have an account?{' '}
            <NavLink
              to="/login"
              fontSize=".8rem"
              hoverColor="#00a6f6"
              letterSpacing="0"
            >
              Log In
            </NavLink>
          </p>
        </Card>
      </Container>
    )
  }
}

export default Signup
