import React, { Component } from 'react'
import { FaRegUser, FaBars, FaRegQuestionCircle } from 'react-icons/fa'
import { NavLink, ShoppingBagIcon, DropdownMenu } from '../atoms'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  padding-top: 0.3rem;
  background-color: white;
  margin: 0;
  a {
    margin-right: 0.7rem;
  }
  .hamburger {
    display: none;
  }
  .leftNav {
    display: flex;
    align-items: center;
    flex-basis: 45%;
    padding-left: 1rem;
  }
  .logo {
    display: flex;
    justify-content: center;
    flex-basis: 10%;
  }
  .rightNav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-basis: 45%;
  }
  @media (max-width: 420px) {
    width: 100%;
    padding: 1rem;
    padding-right: 0rem;
    min-width: 0px;
    position: sticky;
    background-color: #f7f7f7;
    top: 0;
    img {
      width: 9rem;
    }
    div {
      padding: 0rem;
    }
    svg {
      height: 2rem;
    }
    .leftNav {
      flex-basis: 20%;
      width: 100%;
      padding-left: 0rem;
      a {
        display: none;
      }
      .hamburger {
        display: initial;
      }
    }
    .logo {
      flex-basis: 55%;
    }
    .rightNav {
      flex-basis: 25%;
      div:nth-child(1) {
        display: none;
      }
      div:nth-child(2) {
        display: none;
      }
    }
  }
`

class NavButtons extends Component {
  render() {
    const {
      handleMobileSidebar,
      handleSidebar,
      curUser,
      logOut,
      navbarItems,
    } = this.props

    // breaking up navbar item data *************
    const navbarItemsLeft =
      navbarItems.contentfulHomePage.navbarItems.data.leftNav

    const navbarItemsRight =
      navbarItems.contentfulHomePage.navbarItems.data.rightNav

    // left of logo data
    const navItemsLeft = navbarItemsLeft.map(item => {
      if (item.dropdown) {
        return (
          <DropdownMenu
            links={item.dropdownLinks}
            dropdownText={item.navButton}
            key={item.navButton}
          />
        )
      } else
        return (
          <NavLink to={item.navButton.toLowerCase()} key={item.navButton}>
            {item.navButton}
          </NavLink>
        )
    })

    // right of logo data
    const userLinksNoUser = navbarItemsRight.find(
      element => element.navButton === 'userLinksNoUser'
    )

    const userLinksUser = navbarItemsRight.find(
      element => element.navButton === 'userLinksUser'
    )

    const userLinks = !curUser ? userLinksNoUser : userLinksUser

    const helpLinks = navbarItemsRight.find(
      element => element.navButton === 'helpLinks'
    )

    return (
      <Container>
        <div className="leftNav">
          <FaBars
            className="hamburger"
            onClick={handleMobileSidebar}
            size="1.5rem"
          />
          {navItemsLeft}
        </div>
        <div className="logo">
          <Link to="/">
            <img
              style={{
                margin: '0 auto',
                maxWidth: 175,
              }}
              src="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0f8b654192028235394491/1531257223005/?format=1500w"
              alt="Lipslut Logo"
            />
          </Link>
        </div>

        {/* These DropdownMenus are for the right side of the navbar, and are never going to change, so are semi hardcoded. */}
        <div className="rightNav">
          <DropdownMenu
            links={helpLinks.dropdownLinks}
            dropdownText={<FaRegQuestionCircle size="1.9rem" />}
          />
          <DropdownMenu
            links={userLinks.dropdownLinks}
            logOut={logOut}
            dropdownText={<FaRegUser size="1.9rem" />}
          />
          <ShoppingBagIcon click={handleSidebar} />
        </div>
      </Container>
    )
  }
}

export default NavButtons
