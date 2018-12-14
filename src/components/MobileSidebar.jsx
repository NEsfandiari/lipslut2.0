import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { IoIosClose } from 'react-icons/io'
import { NavLink, ShoppingBagIcon, MobileDropdown } from './atoms'
import 'animate.css'

const Container = styled.div`"
  display: ${({ mobileDisplayFix }) => {
    console.log('mdf', mobileDisplayFix || 'none')
    return mobileDisplayFix || 'none'
  }} !important;
  position: fixed;
  top: 0;
  right: 0.0001rem;
  z-index: 4;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  background-color: #f9f7f1;
  display: flex;
  flex-direction: column;
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
    align-items: center;
  }
  .userIcon,
  .xIcon {
    display: flex;
    align-items: center;
    margin: 0;
  }
  .links {
    display: flex;
    flex-direction: column;
    max-height: 80vh;
    margin-top: 0.5rem;
    overflow: auto;
    a {
      margin: 0.5rem;
      font-size: 0.9rem;
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
    const {
      handleMobileSidebar,
      display,
      logOut,
      curUser,
      navbarData,
    } = this.props

    console.log('mobilesidebar prop', display)

    const animation = 'animated ' + (display ? 'slideInLeft' : 'slideOutLeft')
    const mobileDisplayFix = this.props.mobileDisplayFix ? 'initial' : 'none'

    const navbarItemsLeft = navbarData.navbarItems.data.leftNav
    const userIcon = navbarData.profileIcon.fluid.src
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

    return (
      <Container
        display={display}
        className={animation}
        mobileDisplayFix={mobileDisplayFix}
      >
        <div className="header">
          <IoIosClose
            onClick={handleMobileSidebar}
            size={'2rem'}
            className="xIcon"
          />
          {curUser ? (
            <Link
              to="/account"
              onClick={handleMobileSidebar}
              className="userIcon"
            >
              <img
                src={userIcon}
                alt="user icon"
                style={{ height: '2rem', margin: 0 }}
              />
            </Link>
          ) : null}
          <ShoppingBagIcon click={this.cartClick} />
        </div>
        <div className="links">
          {!curUser ? (
            <NavLink onClick={handleMobileSidebar} to="/login">
              Log In
            </NavLink>
          ) : (
            <NavLink to="" onClick={logOut}>
              Log Out
            </NavLink>
          )}
          {navItemsLeft}
        </div>
      </Container>
    )
  }
}

export default MobileSidebar
