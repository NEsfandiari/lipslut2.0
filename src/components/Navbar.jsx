import React from 'react'
import Link from 'gatsby-link'
import { NavLink } from './atoms'
import Styled from 'styled-components'
import { FaShoppingCart } from 'react-icons/lib/fa'
import 'futura-font/styles.css'

const Container = Styled.div`
  display: flex;
  justify-content: center;
  padding-top: .6rem;
  .nav{
    display: flex;
    justify-content: space-between;
    align-items: center;

  .nav div{
    padding: 1rem;
  }
  .links{
    display: flex;
    font-family: 'futura';
    flex-basis: 30%;
  }
  .logo{
    flex-basis: 40%;
    display: flex;
    justify-content: center;
  }
  .cart{
    flex-basis: 30%;
    display: flex;
    justify-content: flex-end;
    svg{
      font-size: 1.5rem
    }
  }
    width: 85vw;
  }
`

const Navbar = () => (
  <Container>
    <div className="nav">
      <div className="links">
        <NavLink to="/fck-trump">F*CK TRUMP</NavLink>
        <NavLink to="/fck-hollywood">F*CK HOLLYWOOD</NavLink>
        <NavLink to="">MORE</NavLink>
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
      <div className="cart">
        <FaShoppingCart />
      </div>
    </div>
  </Container>
)

export default Navbar
