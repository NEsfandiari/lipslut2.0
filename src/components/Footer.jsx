import React, { Component } from 'react'
import Styled from 'styled-components'
import { FooterSocialIcons, FooterEmailForm } from './molecules'
import { NavLink } from './atoms'

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    /* TODO: Break Up into Seperate Top/Bottom Componenets */
    .top-footer{
      display: flex;
      justify-content: space-between;
      width: 80vw;
      padding: 1rem;
      @media (max-width: 420px) {
        width: 100%;
        padding: 0rem;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        a{
            font-size: .8rem;
          }
      }
    }
    .bottom-footer{
      width: 100vw;
      height: 6rem;
      background-color: #75CAEB;
      color: white;
      padding: 1rem;
      display flex;
      text-decoration: underline;
      display: flex;
      justify-content: center;
      @media (max-width: 420px) {
          display: none;
          padding: .5rem;
          position: relative;
          right: 4.5%;
      }
      .bottom-footer-container{
        display: flex;
        justify-content: space-between;
        width: 90%;

       
      }
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
      @media (max-width: 420px) {
        width: 20rem;
      }
    }
    .bottom-links{
      display: flex;
      justify-content: flex-end;
    }
    .corporate-info{
      display: flex;
      flex-direction: column;
      justify-content: center;
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
            <NavLink to="/about">Our Story</NavLink>
            <NavLink to="/faq">Careers</NavLink>
            <NavLink to="/">Press</NavLink>
            <NavLink to="/about">team@lipslut.com</NavLink>
          </div>
        </div>
        <div className="bottom-footer">
          <div className="bottom-footer-container">
            <div className="corporate-info">
              <p>Lipslut LLC.</p>
              <p className="copyright">
                &copy; 2019 LIPSLUT&trade;. All Rights Reserved
              </p>
            </div>
            <div className="bottom-links">
              <NavLink to="/terms-conditions" color="white" hovercolor="black">
                Terms + Conditions
              </NavLink>
              <NavLink to="/privacy-policy" color="white" hovercolor="black">
                Privacy Policy
              </NavLink>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default Footer
