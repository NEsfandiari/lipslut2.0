import React, { Component } from 'react'
import styled from 'styled-components'
import { Order } from './molecules'

const Container = styled.div`
  flex-basis: 66%;
  width: 66vw;
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
