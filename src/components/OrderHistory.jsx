import React, { Component } from 'react'
import styled from 'styled-components'
import { Order } from './molecules'

const Container = styled.div`
  flex-basis: 66%;
  .orders {
    height: 55vh;
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
    if (this.props.curUser) {
      if (this.props.curUser.orderHistory.length > 0) {
        const { curUser } = this.props
        orders = curUser.orderHistory.map((order, i) => (
          <Order order={order} id={i} key={i} />
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
