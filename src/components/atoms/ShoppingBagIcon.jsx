import React, { Component } from 'react'
import styled from 'styled-components'
import { TiShoppingBag } from 'react-icons/ti'

const Container = styled.div`
  cursor: pointer;
  display: flex;
  margin-bottom: 0.2rem;
  p {
    position: relative;
    cursor: pointer;
    margin: 0;
    padding: 0;
    right: 0.8rem;
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
        <TiShoppingBag size="2.4rem" onClick={click} />
        <p onClick={click}>{cart.length}</p>
      </Container>
    )
  }
}

export default ShoppingBagIcon
