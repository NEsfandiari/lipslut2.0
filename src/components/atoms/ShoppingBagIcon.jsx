import React, { Component } from 'react'
import styled from 'styled-components'
import { FaShoppingBag } from 'react-icons/lib/fa'

const Container = styled.div`
  cursor: pointer;
  max-height: 2.5rem;
  display: flex;
  align-items: center;
  p {
    position: relative;
    cursor: pointer;
    margin: 0;
    right: 1.25rem;
    top: 0.3rem;
    width: 0.5rem;
  }
`

class ShoppingBagIcon extends Component {
  render() {
    const { click, cart } = this.props
    return (
      <Container>
        <FaShoppingBag color="#FF0088" size="2rem" onClick={click} />
        <p onClick={click}>{cart.length}</p>
      </Container>
    )
  }
}

export default ShoppingBagIcon
