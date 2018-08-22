import React, { Component } from 'react'
import styled from 'styled-components'
import { FaShoppingBag } from 'react-icons/lib/fa'

const Container = styled.div`
  cursor: pointer;
  max-height: 3.3rem;
  p {
    position: relative;
    bottom: 1.5rem;
    left: 0.8rem;
    cursor: pointer;
    margin: 0;
    width: 0.5rem;
  }
`

class ShoppingBagIcon extends Component {
  render() {
    const { click, cart } = this.props
    return (
      <Container>
        <FaShoppingBag color="#FF0088" size="2.2rem" onClick={click} />
        <p onClick={click}>{cart.length}</p>
      </Container>
    )
  }
}

export default ShoppingBagIcon
