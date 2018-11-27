import React, { Component } from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'
import { NavButtons, BannerPromo } from './molecules'
import CartSidebar from './CartSidebar.jsx'
import MobileSidebar from './MobileSidebar.jsx'
import { CartConsumer } from '../containers/CartContext'
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
    console.log('hey navbar.jsx: ', this.props)

    const {
      curUser,
      sidebar,
      displayFix,
      handleSidebar,
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
          mobileDisplayFix={mobileDisplayFix}
        />
        <NavContainer navbarItems={this.props.navbarItems}>
          <BannerPromo handleBannerMargin={handleBannerMargin} />
          <NavButtons
            curUser={curUser}
            handleMobileSidebar={this.handleMobileSidebar}
            handleSidebar={handleSidebar}
            logOut={this.logOut}
            navbarItems={this.props.navbarItems}
          />
        </NavContainer>
        <CartConsumer>
          {cartContext => (
            <CartSidebar
              cart={cartContext.cart}
              handleCart={cartContext.handleCart}
              curUser={curUser}
              display={sidebar}
              handleSidebar={handleSidebar}
              displayFix={displayFix}
            />
          )}
        </CartConsumer>
      </div>
    )
  }
}

export default Navbar
