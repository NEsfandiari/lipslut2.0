import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, StyledHr } from './atoms'
import { Order } from './molecules'

const Container = styled.div`
  .orders {
    max-height: 50vh;
    overflow: auto;
  }
  h3 {
    margin-bottom: 0;
  }
`

class OrderHistory extends Component {
  componentDidMount() {
    this.props.signIn(this.props.curUser)
  }
  render() {
    let orders
    if (this.props.curUser) {
      if (this.props.curUser.data.orderHistory.length > 0) {
        const { curUser } = this.props
        orders = curUser.data.orderHistory.map((order, i) => (
          <Order order={order} id={i} key={i} />
        ))
      } else {
        orders = <p>You have not placed an order yet.</p>
      }
    }
    return (
      <Container>
        <Card className="history animated fadeInUp" height="32rem">
          <h3>Order History</h3>
          <StyledHr margin="1rem" />
          <div className="orders">{orders}</div>
        </Card>
      </Container>
    )
  }
}

export default OrderHistory
