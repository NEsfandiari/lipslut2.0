import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, StyledButton } from './atoms'
import { SummaryItem, Financials } from '../components/molecules'

const Container = styled.div`
  border-radius: 6px;

  .items {
    display: flex;
    flex-direction: column;
  }

  .financials {
  }
`

class Summary extends Component {
  state = {}
  render() {
    const { cart, addItem } = this.props
    const items = cart.map((item, i) => (
      <SummaryItem
        item={item}
        handleAdjust={this.handleAdjust}
        id={i}
        key={i}
      />
    ))
    const subtotal = this.props.cart
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.quantity
      }, 0)
      .toFixed(2)
    const tax = (subtotal * 0.15).toFixed(2)
    return (
      <Container>
        <Card>
          <h3>Summary</h3>
          <div className="items">{items}</div>
          <Financials subtotal={subtotal} tax={tax} />
          <StyledButton width="14rem">Place Order</StyledButton>
        </Card>
      </Container>
    )
  }
}

export default Summary
