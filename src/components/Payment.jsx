import React, { Component } from 'react'
import styled from 'styled-components'
import { Card } from './atoms'
import { CardElement } from 'react-stripe-elements'

class Payment extends Component {
  state = {}
  render() {
    return (
      <Card>
        <h3>Payment</h3>
        <CardElement />
      </Card>
    )
  }
}

export default Payment
