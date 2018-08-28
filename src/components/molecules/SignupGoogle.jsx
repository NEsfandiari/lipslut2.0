import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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

class SignupEmailPassword extends Component {
  static contextTypes = {
    firebase: PropTypes.object,
  }
  handleGoogle = e => {
    // TODO move to seperate file structure
    const { firebase } = this.context
    firebase.signupGoogle(this)
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
          hoverColor="#F9F7F1"
          margin=".5rem"
          className="google"
        >
          SIGN UP WITH <GoogleIcon />
        </StyledButton>
      </Container>
    )
  }
}

export default SignupEmailPassword
