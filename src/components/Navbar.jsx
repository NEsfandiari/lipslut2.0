import React, { Component } from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'
import { NavButtons, BannerPromo } from './molecules'
import CartSidebar from './CartSidebar.jsx'
import MobileSidebar from './MobileSidebar.jsx'
import StyledHr from './atoms/StyledHr'
import 'futura-font/styles.css'

const NavContainer = Styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
`
class Navbar extends Component {
  state = {
    mobileSidebar: false,
    mobileDisplayFix: false,
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
    this.setState({
      mobileSidebar: !this.state.mobileSidebar,
      mobileDisplayFix: true,
    })
  }

  render() {
    const {
      cart,
      editItem,
      removeItem,
      sidebar,
      displayFix,
      handleSidebar,
      curUser,
      clearCart,
      handleBannerMargin,
    } = this.props
    const { mobileSidebar, mobileDisplayFix } = this.state
    return (
      <div>
        <MobileSidebar
          display={mobileSidebar}
          handleMobileSidebar={this.handleMobileSidebar}
          logOut={this.logOut}
          curUser={curUser}
          handleSidebar={handleSidebar}
          cart={cart}
          mobileDisplayFix={mobileDisplayFix}
        />
        <NavContainer>
          <BannerPromo handleBannerMargin={handleBannerMargin} />
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
          displayFix={displayFix}
          clearCart={clearCart}
          curUser={curUser}
        />
      </div>
    )
  }
}

export default Navbar
