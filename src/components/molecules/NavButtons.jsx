import React, { Component } from 'react'
import { FaUserSecret, FaBars } from 'react-icons/lib/fa'
import { NavLink, ShoppingBagIcon, DropdownMenu } from '../atoms'
import Link from 'gatsby-link'
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
  div {
    padding: 0.5rem;
  }
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
      div:first-child {
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
      cart,
      curUser,
      logOut,
    } = this.props
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
    const labLinks = [
      { text: 'BATCH—001: "02"', page: 'BATCH—001:-"02"' },
      { text: 'BATCH—001: "04"', page: 'BATCH—001:-"04"' },
      { text: 'BATCH—001: "05"', page: 'BATCH—001:-"05"' },
    ]
    const moreLinks = [
      { text: 'Lipslut Hat', page: 'Lipslut-Hat' },
      {
        text: 'Leftylibglobalistsantifacommiesocialisthollyweirdopigs',
        page: 'Leftylibglobalistsantifacommiesocialisthollyweirdopigs/',
      },
    ]
    const userLinks = !curUser
      ? [{ text: 'Sign Up', page: 'signup' }, { text: 'Log In', page: 'login' }]
      : [
          { text: 'Account', page: 'account' },
          { text: 'Log Out', page: '', onClick: logOut },
        ]
    return (
      <Container>
        <div className="leftNav">
          <FaBars
            className="hamburger"
            onClick={handleMobileSidebar}
            size="1.5rem"
          />
          <DropdownMenu links={campaignLinks} dropdownText={'Campaigns'} />
          <DropdownMenu links={labLinks} dropdownText={'Lipslut Lab'} />
          <DropdownMenu links={moreLinks} dropdownText={'More'} />
          <NavLink to="about">About</NavLink>
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
        <div className="rightNav">
          <DropdownMenu
            links={userLinks}
            dropdownText={<FaUserSecret size="2.2rem" />}
          />
          <ShoppingBagIcon click={handleSidebar} cart={cart} />
        </div>
      </Container>
    )
  }
}

export default NavButtons
