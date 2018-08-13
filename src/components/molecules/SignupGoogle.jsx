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

class SignupEmailPassword extends Component {
  static contextTypes = {
    firebase: PropTypes.object,
  }
  handleGoogle = e => {
    // TODO move to seperate file structure
    const { firebase } = this.context
    const { auth } = this.context.firebase
    const signup = this
    auth()
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(user => {
        const userInfo = user.user
        firebase
          .store()
          .collection('users')
          .doc(userInfo.uid)
          .set({
            name: userInfo.displayName,
            email: userInfo.email,
            billing: {
              email: '',
              address_city: '',
              address_line1: '',
              address_line2: '',
              address_state: '',
              firstName: '',
              lastName: '',
              zip: '',
              phone: '',
              card: '',
            },
            orderHistory: [],
          })
      })
      .then(() => navigateTo('/'))
      .catch(error => {
        const errorMessage = error.message
        signup.props.handleError(errorMessage)
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
