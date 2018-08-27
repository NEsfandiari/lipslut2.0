import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledButton } from '../atoms'
import { FaFacebookSquare } from 'react-icons/lib/fa'

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
class SignupFacebook extends Component {
  static contextTypes = {
    firebase: PropTypes.object,
  }

  handleFacebook = e => {
    const { firebase } = this.context
    firebase.SignupFacebook(this, 'facebook')
  }

  render() {
    return (
      <Container>
        <StyledButton
          onClick={this.handleFacebook}
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
          SIGN UP WITH <FaFacebookSquare color="#3B539A" size="1.3rem" />
        </StyledButton>
      </Container>
    )
  }
}

export default SignupFacebook
