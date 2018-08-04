import React, { Component } from 'react'
import { Card, StyledButton } from '../atoms'
import { CardElement } from 'react-stripe-elements'

class Payment extends Component {
  render() {
    const buttonUsability =
      this.props.orderStatus !== 'PLACE ORDER' ? 'disabled' : null
    return (
      <Card className="animated fadeInRight">
        <h3>Payment</h3>
        <CardElement />
        <StyledButton width="17rem" disabled={buttonUsability}>
          {this.props.orderStatus}
        </StyledButton>
      </Card>
    )
  }
}

export default Payment
