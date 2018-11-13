import React, { Component } from 'react'
import styled from 'styled-components'
import { Order } from './molecules'

const Container = styled.div`
  flex-basis: 75%;
  display: flex;
  flex-direction: column;
  .orders {
    height: 25rem;
    overflow: auto;
  }
  background-color: white;
  border-radius: 3px;
  margin: 2rem;
  padding: 2rem;
  h3 {
    margin-bottom: 2rem;
  }
  p {
    text-align: center;
  }
  @media (max-width: 420px) {
    width: 90%;
    margin: 0;
    padding: 1rem;
    margin-top: 1rem;
    align-items: center;
  }
`

class OrderHistory extends Component {
  componentDidMount() {
    if (this.props.curUser) {
      this.props.signIn(this.props.curUser)
    }
  }
  render() {
    let orders
    const { curUser } = this.props
    if (curUser) {
      if (curUser.orderHistory.edges.length > 0) {
        orders = curUser.orderHistory.edges.map((order, i) => (
          <Order order={order.node} id={i} key={i} />
        ))
      } else {
        orders = <p>You have not placed an order yet.</p>
      }
    }
    return (
      <Container>
        <h3>Order History</h3>
        <div className="orders">{orders}</div>
      </Container>
    )
  }
}

export default OrderHistory
