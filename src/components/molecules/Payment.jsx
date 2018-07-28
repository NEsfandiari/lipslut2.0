import React, { Component } from 'react'
import { Card, StyledButton } from '../atoms'
import { CardElement } from 'react-stripe-elements'

class Payment extends Component {
  render() {
    return (
      <Card>
        <h3>Payment</h3>
        <CardElement />
        <StyledButton width="17rem">{this.props.orderMessage}</StyledButton>
      </Card>
    )
  }
}

export default Payment
