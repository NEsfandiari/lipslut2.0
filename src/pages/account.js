import React, { Component } from 'react'
import styled from 'styled-components'
import { SummaryItem } from '../components/molecules'
import { Card } from '../components/atoms'
import 'animate.css'

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
        <Card className="history animated fadeInUp">
          <h3>Order History</h3>
          <div className="orders">{items}</div>
        </Card>
        <Card className="shipping animated fadeInUp">
          <h3>Shipping Information</h3>
        </Card>
      </Container>
    )
  }
}

export default Account
