import React, { Component } from 'react'
import { CheckoutForm } from '../components'
import { Elements, StripeProvider } from 'react-stripe-elements'

class Checkout extends Component {
  state = { stripe: null }
  componentDidMount() {
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
    const { cart, addItem, clearCart, curUser } = this.props
    const {
      address_city,
      address_line1,
      address_line2,
      address_state,
      zip,
      phone,
      card,
    } = curUser.data.billing
    const { email, name } = curUser.data
    const firstName = name.split(' ')[0]
    const lastName = name.split(' ')[1]
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <CheckoutForm
            cart={cart}
            addItem={addItem}
            clearCart={clearCart}
            subtotal={subtotal}
            tax={tax}
            email={email || ''}
            address_city={address_city || ''}
            address_line1={address_line1 || ''}
            address_line2={address_line2 || ''}
            address_state={address_state || ''}
            firstName={firstName || ''}
            lastName={lastName || ''}
            zip={zip || ''}
            phone={phone || ''}
            curUser={curUser || ''}
          />
        </Elements>
      </StripeProvider>
    )
  }
}

export default Checkout
