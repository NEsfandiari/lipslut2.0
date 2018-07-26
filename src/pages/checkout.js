import React, { Component } from 'react'
import styled from 'styled-components'
import uuid from 'uuid/v4'
import { Shipping, Summary, Payment } from '../components'
import { Elements, injectStripe } from 'react-stripe-elements'

const ContainerForm = styled.form`
    display: flex;
    justify-content: space-between
    width: 100%;
    margin-top: 2rem;
`
injectStripe(ContainerForm)

class Checkout extends Component {
  state = {}
  handleSubmit = e => {
    e.preventDefault()
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({ name: 'Jenny Rosen' }).then(({ token }) => {
      console.log('Received Stripe token:', token)
    })
  }

  openStripeCheckout(e) {
    e.preventDefault()
    this.setState({ disabled: true, buttonText: 'WAITING...' })
    this.stripeHandler.open({
      name: 'Demo Product',
      amount: amount,
      description: 'A product well worth your time',
      token: token => {
        fetch(
          location.hostname === 'localhost'
            ? 'http://localhost:9000/purchase'
            : `${process.env.GATSBY_LAMBDA_ENDPOINT}purchase`,
          {
            method: 'POST',
            body: JSON.stringify({
              token,
              amount,
              idempotency_key: uuid(),
            }),
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
          }
        )
          .then(res => {
            console.log('Transaction processed successfully')
            this.resetButton()
            this.setState({ paymentMessage: 'Payment Successful!' })
            return res
          })
          .catch(error => {
            console.error('Error:', error)
            this.setState({ paymentMessage: 'Payment Failed' })
          })
      },
    })
  }
  render() {
    return (
      <Elements>
        <ContainerForm onSubmit={this.handleSubmit}>
          <Shipping />
          <Payment />
          <Summary cart={this.props.cart} addItem={this.props.addItem} />
        </ContainerForm>
      </Elements>
    )
  }
}

export default Checkout
