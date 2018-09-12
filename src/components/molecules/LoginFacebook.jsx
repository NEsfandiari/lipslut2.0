import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledButton } from '../atoms'
import { FaFacebookSquare } from 'react-icons/lib/fa'

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
class LoginFacebook extends Component {
  static contextTypes = {
    firebase: PropTypes.object,
  }

  handleFacebook = e => {
    // TODO: query db to check if user email exists so we save user info
    const { firebase } = this.context
    firebase.login(this, 'facebook')
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
          hoverColor="#E9F6FF"
          letterSpacing="0"
          className="facebook"
        >
          LOG IN WITH <FaFacebookSquare color="#3B539A" size="1.3rem" />
        </StyledButton>
      </Container>
    )
  }
}

export default LoginFacebook
