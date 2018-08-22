import React, { Component } from 'react'
import Styled from 'styled-components'
import { NavButtons } from './molecules'
import CartSidebar from './CartSidebar.jsx'
import MobileSidebar from './MobileSidebar.jsx'
import 'futura-font/styles.css'

const NavContainer = Styled.div`
  display: flex;
  justify-content: center;
  padding-top: .6rem;
  .hamburger{
    display: none;
  }
`
class Navbar extends Component {
  state = {
    mobileSidebar: false,
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
    } = this.props
    return (
      <div>
        <MobileSidebar
          display={this.state.mobileSidebar}
          handleMobileSidebar={this.handleMobileSidebar}
        />
        <NavContainer>
          <NavButtons handleMobileSideba={this.handleMobileSidebar} />
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
