import React, { Component } from 'react'
import styled from 'styled-components'
import { NavLink, Card } from '../components/atoms'
import {
  SignupEmailPassword,
  SignupGoogle,
  SignupFacebook,
} from '../components/molecules'
import 'animate.css'
import lightBlueLayout from '../layouts/lightBlue.jsx'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding: 4rem;
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
      <Container className="animated fadeInUp">
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
          Already have an account? Log In!
        </NavLink>
      </Container>
    )
  }
}

export default lightBlueLayout(Signup)
