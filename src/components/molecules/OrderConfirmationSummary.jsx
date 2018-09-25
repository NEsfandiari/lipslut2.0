import React, { Component } from 'react'
import styled from 'styled-components'
import { Card } from '../atoms'
import SummaryItem from './SummaryItem'
import SummaryFinancials from './SummaryFinancials'
import 'animate.css'

const Container = styled.div`
  border-radius: 6px;
  margin: 1rem;
  .items {
    width: 100%;
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
          <SummaryFinancials
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
