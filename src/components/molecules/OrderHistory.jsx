import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, StyledHr } from '../atoms'
import SummaryItem from './SummaryItem'

const Container = styled.div`
  .orders {
    display: flex;
    flex-direction: column;
    max-height: 50vh;
    overflow: auto;
    flex-basis: 75%;
  }
  h3 {
    margin-bottom: 0;
  }
`

class OrderHistory extends Component {
  state = {}
  render() {
    let items
    if (this.props.curUser) {
      if (this.props.curUser.data.orderHistory.length > 0) {
        const { curUser } = this.props
        items = curUser.data.orderHistory.map((item, i) => (
          <SummaryItem item={item} id={i} key={i} />
        ))
      } else {
        items = <p>You have not placed an order yet.</p>
      }
    }
    return (
      <Container>
        <Card className="history animated fadeInUp" height="32rem">
          <h3>Order History</h3>
          <StyledHr margin="1rem" />
          <div className="orders">{items}</div>
        </Card>
      </Container>
    )
  }
}

export default OrderHistory
