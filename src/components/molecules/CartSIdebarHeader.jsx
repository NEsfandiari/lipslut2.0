import React, { Component } from 'react'
import styled from 'styled-components'
import { IoIosClose } from 'react-icons/io'
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
    const { handleSidebar } = this.props
    return (
      <Container>
        <IoIosClose onClick={handleSidebar} size={'2rem'} className="close" />
        <h3>Your Bag</h3>
        <ShoppingBagIcon id="bag" click={handleSidebar} />
      </Container>
    )
  }
}

export default CartSidebarHeader
