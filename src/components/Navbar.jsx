import React, { Component } from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'
import { NavButtons } from './molecules'
import CartSidebar from './CartSidebar.jsx'
import MobileSidebar from './MobileSidebar.jsx'
import 'futura-font/styles.css'

const NavContainer = Styled.div`
  display: flex;
  justify-content: center;
  padding: .5rem;
  .hamburger{
    display: none;
  }
`
class Navbar extends Component {
  state = {
    mobileSidebar: false,
  }

  static contextTypes = {
    firebase: PropTypes.object,
  }

  logOut = e => {
    const firebase = this.context.firebase
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log('sign out worked')
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  handleMobileSidebar = () => {
    this.setState({ mobileSidebar: !this.state.mobileSidebar })
  }

  render() {
    const {
      cart,
      editItem,
      removeItem,
      sidebar,
      styleFix,
      handleSidebar,
      curUser,
    } = this.props
    return (
      <div>
        <MobileSidebar
          display={this.state.mobileSidebar}
          handleMobileSidebar={this.handleMobileSidebar}
          logOut={this.logOut}
          curUser={curUser}
          handleSidebar={handleSidebar}
          cart={cart}
        />
        <NavContainer>
          <NavButtons
            handleMobileSidebar={this.handleMobileSidebar}
            handleSidebar={handleSidebar}
            cart={cart}
            curUser={curUser}
            logOut={this.logOut}
          />
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
