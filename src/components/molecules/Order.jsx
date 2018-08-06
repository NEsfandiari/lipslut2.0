import React, { Component } from 'react'
import styled from 'styled-components'
import SummaryItem from './SummaryItem'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  .headers {
    display: flex;
    justify-content: space-around;
    background-color: #faf9f7;
    min-height: 2.7rem;
    p {
      font-size: 0.7rem;
      font-weight: 600;
      margin: 0;
      height: 1.2rem;
    }
    p:first-child {
      font-weight: 300;
    }
    border-radius: 3px;
  }
  .header {
    display: flex;
    flex-direction: column;
  }
  .items {
    display: flex;
    flex-direction: column;
    padding-left: 0.5rem;
  }
`

class Order extends Component {
  state = {}
  render() {
    const order = this.props.order
    const items = order.cart.map((item, i) => (
      <SummaryItem item={item} id={i} key={i} />
    ))
    return (
      <Container>
        <div className="headers">
          <div className="header">
            <p>Order Placed:</p>
            <p>{order.placed}</p>
          </div>
          <div className="header">
            <p>Total:</p>
            <p>${order.total}</p>
          </div>
          <div className="header">
            <p>Tracking #:</p>
            <p>{order.orderNumber}</p>
          </div>
        </div>
        <div className="items">{items}</div>
      </Container>
    )
  }
}

export default Order
