import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import { CheckoutShipping, CheckoutSummary, CheckoutPayment } from './molecules'
import { injectStripe } from 'react-stripe-elements'
import axios from 'axios'
import uuid from 'uuid/v4'

const ContainerForm = styled.form`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 2rem;
  @media (max-width: 1200px) {
    align-items: center;
    flex-direction: column;
    margin-top: 1rem;
  }
`
class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.curUser ? props.curUser.email : '',
      city: props.curUser ? props.curUser.billing.address_city : '',
      address: props.curUser ? props.curUser.billing.address_line1 : '',
      apartment: props.curUser ? props.curUser.billing.address_line2 : '',
      state: props.curUser ? props.curUser.billing.address_state : '',
      zip: props.curUser ? props.curUser.billing.zip : '',
      phone: props.curUser ? props.curUser.billing.phone : '',
      firstName: props.curUser ? props.curUser.name.split(' ')[0] : '',
      lastName: props.curUser ? props.curUser.name.split(' ')[1] : '',
      newsletter: props.curUser ? props.curUser.newsletter : false,
      shipping: 4.95,
      orderStatus: 'PLACE ORDER',
      profileLoad: props.curUser ? true : false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static contextTypes = {
    firebase: PropTypes.object,
  }

  componentDidUpdate() {
    // SetState to user data if user lands on this page
    if (!this.state.profileLoad && this.props.curUser) {
      this.setState({
        profileLoad: true,
        email: this.props.curUser.email,
        city: this.props.curUser.billing.address_city,
        address: this.props.curUser.billing.address_line1,
        apartment: this.props.curUser.billing.address_line2,
        state: this.props.curUser.billing.address_state,
        zip: this.props.curUser.billing.zip,
        phone: this.props.curUser.billing.phone,
        firstName: this.props.curUser.name.split(' ')[0],
        lastName: this.props.curUser.name.split(' ')[1],
        newsletter: this.props.curUser.newsletter,
      })
    }
  }

  handleChange(e) {
    if (e.target.type == 'checkbox') {
      this.setState({
        [e.target.name]: e.target.checked,
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({ orderStatus: 'PROCESSING...' })
    let previousCustomer = null
    if (this.props.curUser && this.props.curUser.billing.card) {
      previousCustomer = this.props.curUser.billing.card
    }
    const items = this.props.cart.map(item => {
      return { type: 'sku', parent: item.sku, quantity: item.quantity }
    })
    // Create Stripe Token from Stripe React elements
    this.props.stripe
      .createToken({
        name: this.state.firstName + ' ' + this.state.lastName,
        address_city: this.state.city,
        address_state: this.state.state,
        address_line1: this.state.address,
        address_line2: this.state.apartment,
        email: this.state.email,
      })
      // Post to lambda Function
      .then(({ token }) => {
        axios
          .post(
            location.hostname === 'localhost'
              ? 'http://localhost:9000/purchase'
              : `${process.env.GATSBY_LAMBDA_ENDPOINT}purchase`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token,
                idempotency_key: uuid(),
                previousCustomer,
                items,
              }),
            }
          )
          .then(res => {
            const { firebase } = this.context
            const { curUser, cart, subtotal, tax } = this.props
            const {
              city,
              address,
              state,
              apartment,
              zip,
              phone,
              newsletter,
              shipping,
            } = this.state
            const total = parseFloat(tax + subtotal + shipping).toFixed(2)
            // Store Stripe Information in the Firebase Database
            if (curUser) {
              try {
                firebase.updatePayment(
                  res,
                  curUser,
                  cart,
                  total,
                  city,
                  state,
                  address,
                  apartment,
                  zip,
                  phone,
                  newsletter
                )
              } catch (err) {
                console.error('FAILED TO SAVE ACCOUNT INFO')
              }
            }
            navigateTo('/order-confirmation')
          })
      })
      .catch(error => {
        console.error(error)
        this.setState({ orderStatus: 'TRANSACTION DECLINED' })
      })
  }

  render() {
    const { cart, addItem, subtotal, tax, stripe } = this.props
    const {
      shipping,
      orderStatus,
      email,
      city,
      address,
      apartment,
      state,
      zip,
      phone,
      firstName,
      lastName,
      newsletter,
    } = this.state
    return (
      <ContainerForm onSubmit={this.handleSubmit}>
        <CheckoutShipping
          handleChange={this.handleChange}
          email={email}
          city={city}
          address={address}
          apartment={apartment}
          state={state}
          firstName={firstName}
          lastName={lastName}
          zip={zip}
          phone={phone}
          newsletter={newsletter}
        />
        <CheckoutSummary
          cart={cart}
          addItem={addItem}
          subtotal={subtotal}
          tax={tax}
          shipping={shipping}
        />
        <CheckoutPayment stripe={stripe} orderStatus={orderStatus} />
      </ContainerForm>
    )
  }
}

export default injectStripe(CheckoutForm)
