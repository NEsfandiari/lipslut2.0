import React, { Component } from 'react'
import styled from 'styled-components'
import SummaryItem from './SummaryItem'
import moment from 'moment'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  .headers {
    display: flex;
    justify-content: space-around;
    background-color: #faf9f7;
    align-items: center;
    min-height: 3.5rem;
    p {
      font-size: 0.7rem;
      font-weight: 600;
      margin: 0;
      height: 1.2rem;
      line-height: 0.9rem;
    }
    a {
      font-size: 0.7rem;
      font-weight: 600;
      text-decoration: underline;
      text-align: center;
      :visited {
        color: blue;
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
  @media (max-width: 420px) {
    p {
      font-size: 0.55rem;
    }
    width: 110%;
  }
`

class Order extends Component {
  render() {
    const order = this.props.order
    const items = order.lineItems.edges.map((item, i) => (
      <SummaryItem item={item.node} id={i} key={i} />
    ))
    return (
      <Container>
        <div className="headers">
          <div className="header">
            <p>Order Placed:</p>
            <p>{moment().format('MMMM Do YYYY', order.processedAt)}</p>
          </div>
          <div className="header">
            <p>Total:</p>
            <p>${order.totalPrice}</p>
          </div>
          <div className="header">
            <p>Order Confirmation #:</p>
            <a href={order.statusUrl}>{order.orderNumber}</a>
          </div>
        </div>
        <div className="items">{items}</div>
      </Container>
    )
  }
}

export default Order
