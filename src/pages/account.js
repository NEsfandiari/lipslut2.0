import React, { Component } from 'react'
import styled from 'styled-components'
import { SummaryItem } from '../components/molecules'
import { Card } from '../components/atoms'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;
  .orders {
    display: flex;
    flex-direction: column;
    max-height: 50vh;
    overflow: auto;
    flex-basis: 75%;
  }
`

class Account extends Component {
  state = {}
  render() {
    let items
    if (this.props.curUser.data.orderHistory.length > 0) {
      const { curUser } = this.props
      items = curUser.data.orderHistory.map((item, i) => (
        <SummaryItem item={item} id={i} key={i} />
      ))
    } else {
      items = 'You have not placed an order yet.'
    }
    return (
      <Container>
        <Card classname="history">
          <h3>Order History</h3>
          <div className="orders">{items}</div>
        </Card>
        <Card classname="shipping">
          <h3>Shipping Information</h3>
        </Card>
      </Container>
    )
  }
}

export default Account
