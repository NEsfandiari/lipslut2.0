import React, { Component } from 'react'
import styled from 'styled-components'
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/lib/fa'

const Container = styled.div`
  svg {
    margin: 0.4rem;
    transition: 0.3s ease;
  }
  svg:hover {
    opacity: 1 !important;
  }
`

class FooterSocialIcons extends Component {
  state = {
    hover: 1,
  }
  hoverEnter = () => {
    this.setState({
      hover: 0.5,
    })
  }
  hoverExit = () => {
    this.setState({
      hover: 1,
    })
  }
  render() {
    const opacity = this.state.hover
    return (
      <Container>
        <a
          href="https://www.instagram.com/hello.lipslut/"
          target="_blank"
          rel="noopener"
          title="Lipslut Instagram Account"
        >
          <FaInstagram
            size="2.2rem"
            color="#FB4883"
            style={{ opacity: opacity }}
            onMouseEnter={this.hoverEnter}
            onMouseLeave={this.hoverExit}
          />
        </a>
        <a
          href="https://twitter.com/Hello_Lipslut"
          target="_blank"
          rel="noopener"
          title="Lipslut Twitter Account"
        >
          <FaTwitter
            size="2.2rem"
            color="#39A9F2"
            style={{ opacity: opacity }}
            onMouseEnter={this.hoverEnter}
            onMouseLeave={this.hoverExit}
          />
        </a>
        <a
          href="https://www.facebook.com/Lipslut/"
          target="_blank"
          rel="noopener"
          title="Lipslut Facebook Account"
        >
          <FaFacebook
            size="2.2rem"
            color="#3B539A"
            style={{ opacity: opacity }}
            onMouseEnter={this.hoverEnter}
            onMouseLeave={this.hoverExit}
          />
        </a>
      </Container>
    )
  }
}

export default FooterSocialIcons
