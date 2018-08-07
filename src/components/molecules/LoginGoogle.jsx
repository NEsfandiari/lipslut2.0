import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import { StyledButton, GoogleIcon } from '../atoms'

const Container = styled.div`
  .google {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin-left: 0.5rem;
    }
  }
`
class LoginGoogle extends Component {
  static contextTypes = {
    firebase: PropTypes.object,
  }

  handleGoogle = e => {
    const { auth } = this.context.firebase
    const login = this
    auth()
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(() => navigateTo('/'))
      .catch(error => {
        let errorMessage = error.message
        login.props.handleError(errorMessage)
      })
  }

  render() {
    return (
      <Container>
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
      </Container>
    )
  }
}

export default LoginGoogle
