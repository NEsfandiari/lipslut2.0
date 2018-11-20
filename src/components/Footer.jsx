import React, { Component } from 'react'
import Styled from 'styled-components'
import { FooterSocialIcons, FooterEmailForm } from './molecules'
import { NavLink } from './atoms'

const Container = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    padding: 2rem 7rem;
    background-color: #75CAEB;
    color: white;
    .left-side{
      padding-top: 2rem;
      flex-basis: 40%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .label{
        margin: 0;
      }
    }
    .middle{
      flex-basis: 20%;
      display: flex;
      justify-content: center;

    }
    .right-side{
      flex-basis: 20%;
      display: flex;
      justify-content: space-around;
      div{
        display: flex;
        flex-direction: column;
        width: 9rem;
      }
    }
    .divider{
      flex-basis: 33%;
      height: 16rem;
      width: 2px;
      border-left: 1.5px solid black;
    }
    @media (max-width: 420px) {
      padding: 3rem;
      .divider{
        display: none;
      }
      .left-side{
        padding: 1rem;
      }
      flex-direction: column;
    }
`

class Footer extends Component {
  render() {
    return (
      <Container>
        <div className="left-side">
          <h3>Join Us</h3>
          <p>
            Be in the know with what we do next—products, promos, pop-ups, and
            everything Lipslut.{' '}
          </p>
          <p className="label">Email</p>
          <FooterEmailForm />
          <FooterSocialIcons />
        </div>
        <div className="middle">
          <div className="divider" />
        </div>
        <div className="right-side">
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
        </div>
      </Container>
    )
  }
}

export default Footer
