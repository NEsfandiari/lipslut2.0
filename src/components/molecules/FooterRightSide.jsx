import React, { Component } from 'react'
import styled from 'styled-components'
import { NavLink } from '../atoms'

const Container = styled.div`
  flex-basis: 40%;
  display: flex;
  justify-content: space-around;
  div {
    display: flex;
    flex-direction: column;
    width: 9rem;
  }
`

class FooterLeftSide extends Component {
  render() {
    return (
      <Container>
        <div>
          <NavLink color="white" hovercolor="black" to="/account">
            My Account
          </NavLink>
          <NavLink color="white" hovercolor="black" to="/contact">
            Contact Us
          </NavLink>
          <NavLink color="white" hovercolor="black" to="/faq">
            Careers
          </NavLink>
          <NavLink color="white" hovercolor="black" to="/faq">
            FAQ + Help
          </NavLink>
        </div>
        <div>
          <NavLink color="white" hovercolor="black" to="/about">
            Our Story
          </NavLink>
          <NavLink color="white" hovercolor="black" to="/">
            Press
          </NavLink>
          <NavLink color="white" hovercolor="black" to="/terms-conditions">
            Terms Of Use
          </NavLink>
          <NavLink color="white" hovercolor="black" to="/privacy-policy">
            Privacy
          </NavLink>
        </div>
      </Container>
    )
  }
}

export default FooterLeftSide
