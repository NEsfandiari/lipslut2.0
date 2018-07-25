import React, { Component } from 'react'
import Link from 'gatsby-link'
import Styled from 'styled-components'
import 'futura-font/styles.css'
import { FaShoppingBag } from 'react-icons/lib/fa'
import { NavLink } from './atoms'
import { CartSidebar } from './molecules'

const NavContainer = Styled.div`
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
      font-size: 1.5rem;
      cursor: pointer;
    }
    p{
      position: relative;
      top: 1rem;
      right: 1.3rem;
      cursor: pointer;
      font-size: 1.3rem
    }
  }
    width: 85vw;
  }
`
class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebar: false,
    }
    this.handleSidebar = this.handleSidebar.bind(this)
  }
  handleSidebar() {
    this.setState({
      sidebar: !this.state.sidebar,
    })
  }
  render() {
    const { cart, editCart } = this.props
    return (
      <div>
        <NavContainer>
          <div className="nav">
            <div className="links">
              <NavLink to="/fck-trump">F*CK TRUMP</NavLink>
              <NavLink to="/fck-hollywood">F*CK HOLLYWOOD</NavLink>
              <NavLink to="/hat">MORE</NavLink>
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
            <div className="cart" onClick={this.handleSidebar}>
              <FaShoppingBag color="#FF0088" size="2.2rem" />
              <p>{cart.length}</p>
            </div>
          </div>
        </NavContainer>
        <CartSidebar
          display={this.state.sidebar}
          handleSidebar={this.handleSidebar}
          cart={this.props.cart}
          editCart={editCart}
        />
      </div>
    )
  }
}

export default Navbar
