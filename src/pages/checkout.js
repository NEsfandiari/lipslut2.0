import React, { Component } from 'react'
import { CheckoutForm } from '../components'
import { Elements, StripeProvider } from 'react-stripe-elements'
import axios from 'axios'

class Checkout extends Component {
  state = {
    stripe: null,
    shopifyPaymentsId: '',
    shopifyCheckoutToken: '',
  }
  componentDidMount() {
    this.props.resetSidebar()
    // Shopify Checkout Setup
    const items = this.props.cart.map(item => {
      return {
        variantId: parseInt(item.sku),
        quantity: item.quantity,
      }
    })
    axios
      .post(
        location.hostname === 'localhost'
          ? 'http://localhost:9000/createCheckout'
          : `${process.env.GATSBY_LAMBDA_ENDPOINT}createCheckout`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items,
          }),
        }
      )
      .then(res => {
        const data = res.data.data.checkout
        this.setState({
          shopifyPaymentsId: data.shopify_payments_account_id,
          shopifyCheckoutToken: data.token,
        })
      })
      .catch(err => {
        console.log(err)
      })
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
            checkoutToken={this.state.shopifyCheckoutToken}
          />
        </Elements>
      </StripeProvider>
    )
  }
}

export default Checkout
