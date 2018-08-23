import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, StyledButton } from '../atoms'
import { CardElement } from 'react-stripe-elements'
import 'animate.css'

const Container = styled.div`
  margin: 1rem;
`

class CheckoutPayment extends Component {
  render() {
    const buttonUsability =
      this.props.orderStatus !== 'PLACE ORDER' ? 'disabled' : null
    return (
      <Container>
        <Card className="animated fadeInUp">
          <h3>Payment</h3>
          <CardElement />
          <StyledButton width="17rem" disabled={buttonUsability}>
            {this.props.orderStatus}
          </StyledButton>
        </Card>
      </Container>
    )
  }
}

export default CheckoutPayment
