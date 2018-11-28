import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { FaUser } from 'react-icons/fa'
import { IoIosClose } from 'react-icons/io'
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
    const { handleMobileSidebar, display, logOut, curUser } = this.props
    const animation = 'animated ' + (display ? 'slideInLeft' : 'slideOutLeft')
    const mobileDisplayFix = this.props.mobileDisplayFix ? 'inital' : 'none'

    const navbarItemsLeft = this.props.navbarItems.contentfulHomePage
      .navbarItems.data.leftNav

    const navItemsLeft = navbarItemsLeft.map(item => {
      if (item.dropdownLinks) {
        return (
          <MobileDropdown
            handleMobileSidebar={handleMobileSidebar}
            dropdownText={item.navButton}
            links={item.dropdownLinks}
            key={item.navButton}
          />
        )
      }
    })

    // ******************************************

    return (
      <Container
        display={display}
        className={animation}
        mobileDisplayFix={mobileDisplayFix}
      >
        <div className="header">
          <IoIosClose onClick={handleMobileSidebar} size={'2rem'} />
          {curUser ? (
            <Link to="/account" onClick={handleMobileSidebar}>
              <FaUser color="#FF0088" size="2.35rem" />
            </Link>
          ) : null}
          <ShoppingBagIcon click={this.cartClick} />
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
          {navItemsLeft}
        </div>
      </Container>
    )
  }
}

export default MobileSidebar
