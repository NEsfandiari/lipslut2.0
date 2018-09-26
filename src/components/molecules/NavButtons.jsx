import React, { Component } from 'react'
import { FaUser, FaBars } from 'react-icons/lib/fa'
import { NavLink, ShoppingBagIcon, DropdownMenu } from '../atoms'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1220px;
  min-width: 1220px;
  padding-top: 0.5rem;
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
    flex-basis: 45%;
    align-items: center;
  }
  .logo {
    flex-basis: 10%;
    display: flex;
    justify-content: center;
  }
  .rightNav {
    flex-basis: 45%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  @media (max-width: 420px) {
    width: 100%;
    padding: 1rem;
    min-width: 0px;
    position: sticky;
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
      a {
        display: none;
      }
      .hamburger {
        display: initial;
      }
    }
    .logo {
      flex-basis: 60%;
    }
    .rightNav {
      flex-basis: 20%;
    }
    .logout,
    .login {
      display: none;
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
    const links = [
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
      <Container>
        <div className="leftNav">
          <FaBars
            className="hamburger"
            onClick={handleMobileSidebar}
            size="1.5rem"
          />
          <NavLink to="/Fck-Trump">F*CK TRUMP</NavLink>
          <NavLink to="/Fck-Hollywood">F*CK HOLLYWOOD</NavLink>
          <DropdownMenu links={labLinks} dropdownText={'LIPSLUT LAB'} />
          <DropdownMenu links={links} dropdownText={'MORE'} />
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
          {!curUser ? (
            <NavLink className="login" to="/signup">
              SIGN UP
            </NavLink>
          ) : (
            <NavLink className="logout" to="" onClick={logOut}>
              LOG OUT
            </NavLink>
          )}
          {curUser ? (
            <Link to="/account">
              <FaUser color="#FF0088" size="2.2rem" />
            </Link>
          ) : null}
          <ShoppingBagIcon click={handleSidebar} cart={cart} />
        </div>
      </Container>
    )
  }
}

export default NavButtons
