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
    let address_city,
      address_line1,
      address_line2,
      address_state,
      zip,
      phone,
      card,
      email,
      firstName,
      lastName
    if (curUser) {
      address_city = curUser.data.billing.address_city
      address_line1 = curUser.data.billing.address_line1
      address_line2 = curUser.data.billing.address_line2
      address_state = curUser.data.billing.address_state
      zip = curUser.data.billing.zip
      phone = curUser.data.billing.phone
      card = curUser.data.billing.card
      email = curUser.data.email
      firstName = curUser.data.name.split(' ')[0]
      lastName = curUser.data.name.split(' ')[1]
    }
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
