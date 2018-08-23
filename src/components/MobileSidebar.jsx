import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { FaClose, FaUser } from 'react-icons/lib/fa'
import { LinkButton, StyledHr, NavLink, ShoppingBagIcon } from './atoms'
import 'animate.css'

const Container = styled.div`
  /* display: ${({ mobileDisplayFix }) => mobileDisplayFix || 'none'}; */
  display: none;
  position: fixed;
  top: 0;
  right: 0.0001rem;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  background-color: #f9f7f1;
  display: flex;
  flex-direction: column;
  a {
    font-size: 1.9rem;
    margin-bottom: 0.5rem;
  }
  .header {
    display: flex;
    justify-content: space-between;
  }
  .links {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 32vh;
  }
  @media (min-width: 420px) {
    display: none;
  }
`

class MobileSidebar extends Component {
  cartClick = () => {
    this.props.handleMobileSidebar()
    this.props.handleSidebar()
  }
  render() {
    const { handleMobileSidebar, display, logOut, curUser, cart } = this.props
    const animation = 'animated ' + (display ? 'slideInLeft' : 'slideOutLeft')
    const mobileDisplayFix = this.props.mobileDisplayFix ? 'inital' : 'none'
    return (
      <Container
        display={display}
        className={animation}
        mobileDisplayFix={mobileDisplayFix}
      >
        <div className="header">
          <FaClose onClick={handleMobileSidebar} size={'2rem'} />
          {curUser ? (
            <Link to="/account" onClick={handleMobileSidebar}>
              <FaUser color="#FF0088" size="2.35rem" />
            </Link>
          ) : null}
          <ShoppingBagIcon click={this.cartClick} cart={cart} />
        </div>
        <div className="links">
          {!curUser ? (
            <NavLink onClick={handleMobileSidebar} to="/login">
              LOG IN
            </NavLink>
          ) : (
            <NavLink to="" onClick={logOut}>
              LOG OUT
            </NavLink>
          )}
          <NavLink onClick={handleMobileSidebar} to="/Fck-Trump">
            F*CK TRUMP
          </NavLink>
          <NavLink onClick={handleMobileSidebar} to="/Fck-Hollywood">
            F*CK HOLLYWOOD
          </NavLink>
          <NavLink onClick={handleMobileSidebar} to="/Lipslut-Hat">
            MORE
          </NavLink>
        </div>
      </Container>
    )
  }
}

export default MobileSidebar
