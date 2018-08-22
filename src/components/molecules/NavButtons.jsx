import React, { Component } from 'react'
import { FaShoppingBag, FaUser, FaBars } from 'react-icons/lib/fa'
import { NavLink, ShoppingBagIcon } from '../atoms'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1220px;
  margin: 0;
  div {
    padding: 0.5rem;
  }
  a {
    margin-right: 0.7rem;
  }
  .leftNav {
    display: flex;
    flex-basis: 33%;
    align-items: center;
  }
  .logo {
    flex-basis: 33%;
    display: flex;
    justify-content: center;
  }
  .rightNav {
    flex-basis: 33%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  @media (max-width: 420px) {
    width: 100%;
    padding: 1rem;
    img {
      width: 8rem;
    }
    div {
      padding: 0rem;
    }
    .leftNav {
      flex-basis: 25%;
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
    .rightNav a {
      display: none;
      flex-basis: 20%;
      padding-top: 0.5rem;
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
    return (
      <Container>
        <div className="leftNav">
          <FaBars className="hamburger" onClick={handleMobileSidebar} />
          <NavLink to="/Fck-Trump">F*CK TRUMP</NavLink>
          <NavLink to="/Fck-Hollywood">F*CK HOLLYWOOD</NavLink>
          <NavLink to="/Lipslut-Hat">MORE</NavLink>
        </div>
        <div className="logo">
          <Link to="/">
            <img
              style={{
                margin: '0 auto',
                maxWidth: 175,
              }}
              src="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0f8b654192028235394491/1531257223005/?format=1500w"
            />
          </Link>
        </div>
        <div className="rightNav">
          {!curUser ? (
            <NavLink to="/login">LOG IN</NavLink>
          ) : (
            <NavLink to="" onClick={logOut}>
              LOG OUT
            </NavLink>
          )}
          {curUser ? (
            <Link to="/account">
              <FaUser color="#FF0088" size="2.35rem" />
            </Link>
          ) : null}
          <ShoppingBagIcon click={handleSidebar} cart={cart} />
        </div>
      </Container>
    )
  }
}

export default NavButtons
