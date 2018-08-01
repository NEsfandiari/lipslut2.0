import React, { Component } from 'react'
import Link from 'gatsby-link'
import Styled from 'styled-components'
import 'futura-font/styles.css'
import { FaShoppingBag } from 'react-icons/lib/fa'
import { NavLink } from './atoms'
import CartSidebar from './CartSidebar'
import Auth from '../auth'

const auth = new Auth()

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
  .leftNav{
    display: flex;
    font-family: 'futura';
    flex-basis: 30%;
  }
  .logo{
    flex-basis: 40%;
    display: flex;
    justify-content: center;
  }
  .rightNav{
    flex-basis: 30%;
    display: flex;
    justify-content: flex-end;
    svg{
      font-size: 1.5rem;
      cursor: pointer;
    }
    a{
      margin-right: .5rem;
    }
    p{
      position: relative;
      top: .8rem;
      right: 1.5rem;
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
      authenticated: false,
    }
  }
  login() {
    auth.login()

    this.setState({
      authenticated: auth.isAuthenticated(),
    })
  }

  logout() {
    auth.logout()

    this.setState({
      authenticated: auth.isAuthenticated(),
    })
  }

  componentDidMount() {
    this.setState({
      authenticated: auth.isAuthenticated(),
    })
  }

  render() {
    const {
      cart,
      editItem,
      removeItem,
      sidebar,
      styleFix,
      handleSidebar,
    } = this.props
    return (
      <div>
        <NavContainer>
          <div className="nav">
            <div className="leftNav">
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
              {!this.state.authenticated ? (
                <NavLink to="" onClick={this.login.bind(this)}>
                  LOG IN
                </NavLink>
              ) : (
                <NavLink to="" onClick={this.logout.bind(this)}>
                  LOG OUT
                </NavLink>
              )}
              {auth.getUserName() ? (
                <NavLink to="/account"> ACCOUNT </NavLink>
              ) : null}
              <FaShoppingBag
                color="#FF0088"
                size="2.2rem"
                onClick={handleSidebar}
              />
              <p onClick={handleSidebar}>{cart.length}</p>
            </div>
          </div>
        </NavContainer>
        <CartSidebar
          display={sidebar}
          handleSidebar={handleSidebar}
          cart={cart}
          editItem={editItem}
          removeItem={removeItem}
          styleFix={styleFix}
        />
      </div>
    )
  }
}

export default Navbar
