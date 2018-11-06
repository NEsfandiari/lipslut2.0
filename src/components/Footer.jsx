import React, { Component } from 'react'
import Styled from 'styled-components'
import { FooterSocialIcons, FooterEmailForm } from './molecules'
import { NavLink } from './atoms'

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .top-footer, .bottom-footer{
      display: flex;
      justify-content: space-between;
      width: 90%
    }

    .top-footer{
      padding: 1rem;
    }
    .bottom-footer{
      height: 6rem;
      background-color: #75CAEB;
      width: 100vw;
      color: white;
      padding: 1rem;
    }
    .copyright{
        color: white;
    }
    .top-links{
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: 6rem;
      flex-basis: 50%;
    }
    .bottom-links{
      display: flex;
      justify-content: center;
      margin-right: 5rem;
    }
    .corporate-info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 5rem;
      flex-basis: 50%;
      p{
        margin: 0;
      }
    }
`

class Footer extends Component {
  render() {
    return (
      <Container>
        <div className="top-footer">
          <div className="left-side">
            <FooterEmailForm />
            <FooterSocialIcons />
          </div>
          <div className="top-links">
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/faq">FAQ + Help</NavLink>
            <NavLink to="/faq">Returns</NavLink>
            <NavLink to="/faq">Our Story</NavLink>
            <NavLink to="/faq">Careers</NavLink>
            <NavLink to="/about">Press</NavLink>
            <NavLink to="/about">team@lipslut.com</NavLink>
          </div>
        </div>
        <div className="bottom-footer">
          <div className="corporate-info">
            <p>Lipslut LLC.</p>
            <p className="copyright">
              &copy; 2019 LIPSLUT&trade;. All Rights Reserved
            </p>
          </div>
          <div className="bottom-links">
            <NavLink to="/privacy-policy" color="white" hoverColor="black">
              Privacy Policy
            </NavLink>
            <NavLink to="/terms-conditions" color="white" hoverColor="black">
              Terms + Conditions
            </NavLink>
          </div>
        </div>
      </Container>
    )
  }
}

export default Footer
