import React, { Component } from 'react'
import styled from 'styled-components'
import { IoIosCloseEmpty } from 'react-icons/lib/io'
import { ShoppingBagIcon } from '../atoms'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-top: 1rem;
  margin-bottom: 2rem;
  svg {
    cursor: pointer;
  }
  h3 {
    margin: 0;
  }
  #bag {
    cursor: default;
  }
  svg:hover {
    color: dimgray;
  }
`

class CartSidebarHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { cart, handleSidebar } = this.props
    return (
      <Container>
        <IoIosCloseEmpty onClick={handleSidebar} size={'2rem'} class="close" />
        <h3>Your Bag</h3>
        <ShoppingBagIcon id="bag" cart={cart} click={handleSidebar} />
      </Container>
    )
  }
}

export default CartSidebarHeader
