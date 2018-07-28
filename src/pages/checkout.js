import React, { Component } from 'react'
import { CheckoutForm } from '../components'
import { Elements, StripeProvider } from 'react-stripe-elements'

class Checkout extends Component {
  render() {
    return (
      <StripeProvider apiKey={process.env.GATSBY_STRIPE_PUBLISHABLE_KEY}>
        <Elements>
          <CheckoutForm cart={this.props.cart} addItem={this.props.addItem} />
        </Elements>
      </StripeProvider>
    )
  }
}

export default Checkout
