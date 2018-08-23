import React, { Component } from 'react'
import styled from 'styled-components'
import { NavLink, Card } from '../components/atoms'
import { SignupEmailPassword, SignupGoogle } from '../components/molecules'
import 'animate.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
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
        <Card height="35rem">
          <h2>Create Account</h2>
          <p className="errorMessage animated fadeInRight" style={displayError}>
            {this.state.errorMessage}
          </p>
          <SignupEmailPassword handleError={this.handleError} />
          <p>or</p>
          <SignupGoogle handleError={this.handleError} />
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
