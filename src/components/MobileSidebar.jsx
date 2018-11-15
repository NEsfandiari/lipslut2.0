import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { FaClose, FaUser } from 'react-icons/fa'
import { NavLink, ShoppingBagIcon, MobileDropdown } from './atoms'
import 'animate.css'

const Container = styled.div`
  display: ${({ mobileDisplayFix }) => mobileDisplayFix || 'none'} !important;
  position: fixed;
  top: 0;
  right: 0.0001rem;
  z-index: 3;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  background-color: #f9f7f1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  svg:hover {
    cursor: pointer;
    color: dimgray;
  }
  a {
    font-size: 1.2rem;
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
    height: 100%;
    a {
      margin: 0.5rem;
    }
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
    const campaignLinks = [
      {
        text: 'F*ck Trump',
        page: 'Fck-Trump',
      },
      {
        text: 'F*ck Kavanaugh',
        page: 'Fck-Kavanaugh',
      },
      {
        text: 'F*ck Hollywood',
        page: 'Fck-Hollywood',
      },
    ]
    const morelinks = [
      { text: 'Lipslut Hat', page: 'Lipslut-Hat' },
      {
        text: 'Leftylibglobalistsantifacommiesocialisthollyweirdopigs',
        page: 'Leftylibglobalistsantifacommiesocialisthollyweirdopigs/',
      },
    ]
    const labLinks = [
      { text: 'BATCH—001: "02"', page: 'BATCH—001:-"02"' },
      { text: 'BATCH—001: "04"', page: 'BATCH—001:-"04"' },
      { text: 'BATCH—001: "05"', page: 'BATCH—001:-"05"' },
    ]
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
          <MobileDropdown
            handleMobileSidebar={handleMobileSidebar}
            dropdownText="CAMPAIGNS"
            links={campaignLinks}
          />
          <MobileDropdown
            handleMobileSidebar={handleMobileSidebar}
            dropdownText="LIPSLUT LAB"
            links={labLinks}
          />
          <MobileDropdown
            handleMobileSidebar={handleMobileSidebar}
            dropdownText="MORE"
            links={morelinks}
          />
        </div>
      </Container>
    )
  }
}

export default MobileSidebar
