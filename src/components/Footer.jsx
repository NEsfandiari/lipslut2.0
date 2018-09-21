import React, { Component } from 'react'
import Styled from 'styled-components'
import 'futura-font/styles.css'

import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/lib/fa'
import { NavLink } from './atoms'

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'futura';
    div{
        margin: 1.5rem;
    }
    svg{
        margin: .5rem;
        transition: 0.3s ease;
    }
    svg:hover{
        opacity: 1 !important;
    }
    .copyright{
        color: #C4C4C4
    }
    .links{
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
`

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: 1,
    }
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
        <div className="social">
          <a
            href="https://www.instagram.com/hello.lipslut/"
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
        </div>
        <div className="links">
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/about">ABOUT</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
          <NavLink to="/privacy-policy">PRIVACY POLICY</NavLink>
          <NavLink to="/terms-conditions">TERMS {'&'} CONDITIONS</NavLink>
        </div>
        <p className="copyright">&copy; 2018 LIPSLUT&trade;</p>
      </Container>
    )
  }
}

export default Footer
