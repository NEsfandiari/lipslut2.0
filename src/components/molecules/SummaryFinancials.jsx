import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  .number {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 2rem;
  }
`

const SummaryFinancials = ({ subtotal, tax, shipping }) => (
  <Container>
    <div className="number">
      <p>Subtotal</p>
      <p>${subtotal}</p>
    </div>
    <div className="number">
      <p>Tax</p>
      <p>${tax}</p>
    </div>
    <div className="number">
      <p>Shipping</p>
      <p>${shipping}</p>
    </div>
  </Container>
)

export default SummaryFinancials
