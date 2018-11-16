import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledButton, Loading } from '../atoms'
import { FaFacebookSquare } from 'react-icons/fa'

const Container = styled.div`
  .facebook {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin-left: 0.5rem;
    }
  }
`
class SignupFacebook extends Component {
  state = {
    status: 'CONNECT WITH ',
  }
  static contextTypes = {
    firebase: PropTypes.object,
  }

  handleFacebook = e => {
    const { firebase } = this.context
    this.setState({ status: <Loading /> })
    firebase.signupFacebook(this, 'facebook')
  }

  render() {
    return (
      <Container>
        <StyledButton
          onClick={this.handleFacebook}
          width="17rem"
          height="2.5rem"
          color="#3B539A"
          backgroundColor="white"
          borderColor="#3B539A"
          borderWidth="2px"
          margin=".5rem"
          hovercolor="#E9F6FF"
          letterSpacing="0"
          className="facebook"
        >
          {this.state.status} <FaFacebookSquare color="#3B539A" size="1.3rem" />
        </StyledButton>
      </Container>
    )
  }
}

export default SignupFacebook
