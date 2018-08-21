import React, { Component } from 'react'
import { CheckoutForm } from '../components'
import { Elements, StripeProvider } from 'react-stripe-elements'

class Checkout extends Component {
  state = { stripe: null }
  componentDidMount() {
    this.props.resetSidebar()
    // Stripe Setup
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY),
      })
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        this.setState({
          stripe: window.Stripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY),
        })
      })
    }
  }

  render() {
    const subtotal = parseFloat(
      this.props.cart
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price * currentValue.quantity
        }, 0)
        .toFixed(2)
    )
    const tax = parseFloat((subtotal * 0.15).toFixed(2))
    const { cart, addItem, clearCart, curUser, signIn } = this.props
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <CheckoutForm
            cart={cart}
            addItem={addItem}
            clearCart={clearCart}
            subtotal={subtotal}
            tax={tax}
            curUser={curUser}
            signIn={signIn}
          />
        </Elements>
      </StripeProvider>
    )
  }
}

export default Checkout
