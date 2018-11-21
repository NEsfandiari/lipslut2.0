import React, { Component } from 'react'
import styled from 'styled-components'
import SidebarItem from './SidebarItem'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

class CartSidebarBody extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { handleCart, cart, handleAdjust } = this.props
    const items = cart.map((item, i) => (
      <SidebarItem
        item={item}
        handleAdjust={handleAdjust}
        handleCart={handleCart}
        id={i}
        key={i}
      />
    ))
    return (
      <div style={{ overflow: 'auto' }}>
        <Container>
          {cart.length > 0 ? (
            items
          ) : (
            <p>
              nothing here.....yet
              <br />
              shop now!
            </p>
          )}
        </Container>
      </div>
    )
  }
}

export default CartSidebarBody
