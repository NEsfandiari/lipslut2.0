import React, { Component } from 'react'
import styled from 'styled-components'
import { Card } from '../atoms'
import SummaryItem from './SummaryItem'
import Financials from './Financials'

const Container = styled.div`
  border-radius: 6px;
  .items {
    display: flex;
    flex-direction: column;
    max-height: 50vh;
    overflow: auto;
    flex-basis: 75%;
  }
  .financials {
    flex-basis: 25%;
  }
`

class Summary extends Component {
  render() {
    const { cart, subtotal, tax, shipping } = this.props
    const items = cart.map((item, i) => (
      <SummaryItem item={item} id={i} key={i} />
    ))
    return (
      <Container>
        <Card className="animated fadeInUp">
          <h3>Summary</h3>
          <div className="items">{items}</div>
          <Financials
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
            className="financials"
          />
        </Card>
      </Container>
    )
  }
}

export default Summary
