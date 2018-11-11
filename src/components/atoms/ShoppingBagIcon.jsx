import React, { Component } from 'react'
import styled from 'styled-components'
import { TiShoppingBag } from 'react-icons/lib/ti'

const Container = styled.div`
  cursor: pointer;
  max-height: 2.5rem;
  display: flex;
  align-items: center;
  p {
    position: relative;
    cursor: pointer;
    margin: 0;
    padding: 0;
    right: 0.8rem;
    top: -0.5rem;
    width: 1.1rem;
    height: 1.1rem;
    color: white;
    line-height: 1.2rem;
    font-size: 0.65rem !important;
    border-radius: 1000px;
    background-color: #ff0086;
    text-align: center;
  }
`

class ShoppingBagIcon extends Component {
  render() {
    const { click, cart } = this.props
    return (
      <Container>
        <TiShoppingBag size="2.2rem" onClick={click} />
        <p onClick={click}>{cart.length}</p>
      </Container>
    )
  }
}

export default ShoppingBagIcon
