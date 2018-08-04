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
import 'animate.css'

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
    margin-top: 0.4rem;
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
  .errorMessage {
    width: 100%;
    text-align: center;
    padding: .5rem;
    border-radius: 4px
    background-color: #FFA62C;
    color: white;
    font-size: .8rem;
  }
`

class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    newsletter: '',
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
    const { firebase } = this.context
    const signup = this
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        const userInfo = user.user
        if (this.state.newsletter === 'on') {
          firebase
            .store()
            .collection('emails')
            .add({ email: this.state.email })
        }
        firebase
          .store()
          .collection('users')
          .doc(userInfo.uid)
          .update({
            name: this.state.firstName + ' ' + this.state.lastName,
            email: this.state.email,
          })
      })
      .then(() => navigateTo('/'))
      .catch(function(error) {
        const errorMessage = error.message
        signup.setState({ errorMessage: errorMessage })
      })
  }
  handleGoogle = e => {
    const { firebase } = this.context
    const { auth } = this.context.firebase
    const signup = this
    auth()
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(user => {
        const userInfo = user.user
        if (this.state.newsletter === 'on') {
          firebase
            .store()
            .collection('emails')
            .add({ email: userInfo.email })
            .then(() => {
              firebase
                .store()
                .collection('users')
                .doc(userInfo.uid)
                .update({
                  name: userInfo.displayName,
                  email: userInfo.email,
                })
            })
        }
        firebase
          .store()
          .collection('users')
          .doc(userInfo.uid)
          .update({
            name: userInfo.displayName,
            email: userInfo.email,
          })
      })
      .then(() => navigateTo('/'))
      .catch(error => {
        const errorMessage = error.message
        signup.setState({ errorMessage: errorMessage })
      })
  }
  render() {
    const displayError = {
      display: typeof this.state.errorMessage !== 'string' ? 'none' : 'inherit',
    }
    return (
      <Container>
        <Card height="35rem">
          <form onSubmit={this.handleSubmit}>
            <h2>Create Account</h2>
            <p
              className="errorMessage animated fadeInRight"
              style={displayError}
            >
              {this.state.errorMessage}
            </p>
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

Signup.childContextTypes = {
  firebase: PropTypes.object,
}
