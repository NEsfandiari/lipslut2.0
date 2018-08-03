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
    let {
      email,
      address_city,
      address_line1,
      address_line2,
      address_state,
      firstName,
      lastName,
      zip,
      phone,
    } = ''
    if (curUser) {
      email = this.props.curUser.data.email || ''
      address_city = this.props.curUser.data.billing.address_city || ''
      address_line1 = this.props.curUser.data.billing.address_line1 || ''
      address_line2 = this.props.curUser.data.billing.address_line2 || ''
      address_state = this.props.curUser.data.billing.address_state || ''
      zip = this.props.curUser.data.billing.zip || ''
      phone = this.props.curUser.data.billing.phone || ''
      firstName = this.props.curUser.data.name.split(' ')[0] || ''
      lastName = this.props.curUser.data.name.split(' ')[1] || ''
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
            email={email}
            address_city={address_city}
            address_line1={address_line1}
            address_line2={address_line2}
            address_state={address_state}
            firstName={firstName}
            lastName={lastName}
            zip={zip}
            phone={phone}
          />
        </Elements>
      </StripeProvider>
    )
  }
}

export default Checkout
